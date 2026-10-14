import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion, useMotionValueEvent } from 'framer-motion';
import { chapters, chapterNumber, chapterProgress } from '../chapters.js';
import { featured, portfolio } from '../projects.js';

// The desk's film strip carries the software work; each cut moves to the next project.
const deskProjects = [...featured, portfolio];
// Three copies keep frames on both sides of the active one; the middle copy is the one shown.
const deskFrames = [...deskProjects, ...deskProjects, ...deskProjects];

function Reel({ rotation, small = false }) {
  return <motion.svg className={small ? 'film-reel film-reel-small' : 'film-reel'} style={{ rotate: rotation }} viewBox="0 0 240 240" aria-hidden="true">
    <circle cx="120" cy="120" r="114" fill="#b5c5c2" stroke="#101a1a" strokeWidth="6" />
    <circle cx="120" cy="120" r="102" fill="#e2e7d8" stroke="#728a86" strokeWidth="2" />
    {[0, 60, 120, 180, 240, 300].map(angle => <g key={angle} transform={`rotate(${angle} 120 120)`}><ellipse cx="120" cy="57" rx="24" ry="32" fill="#142725" stroke="#96aaa0" strokeWidth="4" /><path d="M104 37 Q120 24 136 37" fill="none" stroke="#f4f1db" strokeWidth="3" /></g>)}
    <circle cx="120" cy="120" r="26" fill="#d8aa56" stroke="#142725" strokeWidth="6" /><circle cx="120" cy="120" r="8" fill="#142725" />
    <path d="M116 8h8M232 116v8M116 232h8M8 116v8" stroke="#142725" strokeWidth="4" />
  </motion.svg>;
}

function Scissors({ angle = 14 }) {
  return <svg viewBox="0 0 150 150" className="edit-scissors" aria-hidden="true">
    {[1, -1].map(side => <motion.g key={side} style={{ rotate: typeof angle === 'number' ? angle * side : undefined, transformOrigin: '75px 75px' }} animate={typeof angle === 'number' ? { rotate: angle * side } : undefined} transition={{ type: 'spring', stiffness: 230, damping: 18 }}>
      <path d={side === 1 ? 'M71 78 L22 15 Q9 9 19 26 L77 86Z' : 'M79 78 L128 15 Q141 9 131 26 L73 86Z'} fill="#e5e8df" stroke="#263c38" strokeWidth="3" />
      <path d={side === 1 ? 'M75 75 L100 108' : 'M75 75 L50 108'} stroke="#e6b951" strokeWidth="11" />
      <ellipse cx={side === 1 ? 111 : 39} cy="120" rx="17" ry="23" transform={`rotate(${side * -32} ${side === 1 ? 111 : 39} 120)`} fill="none" stroke="#efbe58" strokeWidth="10" />
    </motion.g>)}
    <circle cx="75" cy="77" r="7" fill="#162622" stroke="#c9d8c8" strokeWidth="3" />
  </svg>;
}

export function EditingDesk() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [cut, setCut] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotation = useTransform(scrollYProgress, [0, 1], [-90, 480]);
  const reverse = useTransform(scrollYProgress, [0, 1], [90, -480]);
  const drift = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const framesRef = useRef(null);
  const frameOffset = useSpring(0, { stiffness: 120, damping: 22 });
  const filmX = useTransform([drift, frameOffset], ([scroll, offset]) => offset + (reduced ? 0 : scroll));
  const smoothRotation = useSpring(rotation, { stiffness: 70, damping: 24 });
  const active = cut % deskProjects.length;

  // Slide the strip so the active project's frame sits left of the scissors.
  useEffect(() => {
    const frames = framesRef.current;
    if (!frames) return;
    const place = () => {
      const [first, second] = frames.children;
      const step = second.offsetLeft - first.offsetLeft;
      const target = frames.parentElement.offsetWidth * 0.36 - first.offsetWidth / 2 - (deskProjects.length + active) * step;
      if (reduced) frameOffset.jump(target); else frameOffset.set(target);
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(frames.parentElement);
    return () => observer.disconnect();
  }, [active, reduced, frameOffset]);
  return <div className="editing-desk" ref={ref}>
    <div className="desk-grid" aria-hidden="true" />
    <div className="desk-heading"><span>AVI’S EDITING TABLE</span><span>NOW CUTTING / {deskProjects[active].short}</span></div>
    <div className="desk-reel-one"><Reel rotation={reduced ? 0 : smoothRotation} /></div>
    <div className="desk-reel-two"><Reel rotation={reduced ? 0 : reverse} small /></div>
    <svg className="loose-film" viewBox="0 0 560 500" aria-hidden="true"><path d="M170 160 C400 15 580 160 425 230 S205 285 405 400" fill="none" stroke="#0c1e1b" strokeWidth="33" /><path d="M170 160 C400 15 580 160 425 230 S205 285 405 400" fill="none" stroke="#e9c773" strokeWidth="24" strokeDasharray="2 12" /></svg>
    <motion.div className="desk-film" animate={reduced ? {} : { rotate: cut % 2 ? -3 : -6 }}>
      <div className="film-perfs" />
      <motion.div className="desk-frames" ref={framesRef} style={{ x: filmX }}>
        {deskFrames.map((project, index) => <div className={`film-frame${index === deskProjects.length + active ? ' active' : ''}`} key={`${project.title}-${index}`}><img src={project.preview} alt="" /><span>{String(index % deskProjects.length + 1).padStart(2, '0')} / {project.short}</span></div>)}
      </motion.div><div className="film-perfs" />
    </motion.div>
    <div className="desk-cut-tool"><Scissors angle={reduced ? 0 : cut % 2 ? -7 : 18} /></div>
    <motion.div className="cut-offcut" key={cut} initial={false} animate={reduced || !cut ? { y: 0, rotate: 8, opacity: 1 } : { y: [0, 65, 0], rotate: [8, 28, 8], opacity: [1, 0, 1] }} transition={{ duration: .65 }} aria-hidden="true"><span>TAKE {String(cut + 1).padStart(2, '0')}</span></motion.div>
    <div className="desk-note" aria-hidden="true">Every frame<br />has a purpose.</div>
    <button type="button" className="make-cut" onClick={() => setCut(value => value + 1)}>Make a cut <span aria-hidden="true">✂</span></button>
    <span className="sr-only" role="status">{cut ? `Cut to ${deskProjects[active].title}.` : ''}</span>
    <div className="desk-bottom" aria-hidden="true"><span>SCROLL TO WIND THE REEL</span><span aria-hidden="true">↓</span></div>
  </div>;
}

export function EditBreak({ chapter }) {
  const reduced = useReducedMotion();
  const index = chapters.findIndex(({ id }) => id === chapter);
  const number = chapterNumber(index);
  const title = chapters[index].label.toUpperCase();
  return <div className="edit-break" aria-hidden="true"><div className="edit-break-line" /><motion.div className="clapper" initial={false} whileInView={reduced ? {} : { rotate: [0, -3, 0] }} viewport={{ once: true, amount: 1 }} transition={{ duration: .7 }}><motion.div className="clapper-arm" initial={reduced ? false : { rotate: -18 }} whileInView={{ rotate: 0 }} viewport={{ once: true }} transition={{ duration: .4, delay: .1 }} /><span>SCENE {number} / {title}</span></motion.div><div className="edit-break-line" /></div>;
}

export default function EditJourney() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 1080]);
  const [chapter, setChapter] = useState(0);
  const trackRef = useRef(null);
  const playheadY = useMotionValue(0);
  const smoothPlayheadY = useSpring(playheadY, { stiffness: 260, damping: 32 });

  // Pin the playhead to the current chapter's frame, sliding toward the next frame as the
  // section scrolls by, so it always agrees with the highlighted chapter.
  const update = () => {
    const { index, fraction } = chapterProgress();
    setChapter(index);
    const frames = trackRef.current?.querySelectorAll(':scope > a');
    if (!frames?.length) return;
    const center = (frame) => frame.offsetTop + frame.offsetHeight / 2;
    const from = center(frames[index]);
    const to = frames[index + 1] ? center(frames[index + 1]) : from;
    playheadY.set(from + (to - from) * fraction);
  };
  useMotionValueEvent(scrollYProgress, 'change', update);
  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return <aside className="edit-journey" aria-label="Film reel chapter navigation">
    <div className="journey-reel"><Reel rotation={reduced ? 0 : rotation} small /></div>
    <div className="journey-track" ref={trackRef}><div className="journey-holes" />{chapters.map(({ id, label }, index) => <a key={id} href={`#${id}`} className={index === chapter ? 'current' : ''} aria-label={`Go to ${label}`} aria-current={index === chapter ? 'location' : undefined}><span>{label}</span><b>{chapterNumber(index)}</b></a>)}<motion.div className="journey-playhead" style={{ top: reduced ? playheadY : smoothPlayheadY }} aria-hidden="true" /></div>
    <span className="journey-caption">THE FINAL CUT</span>
  </aside>;
}
