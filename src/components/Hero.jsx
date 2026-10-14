import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react';

import { EditingDesk } from './EditJourney.jsx';

// Keep in sync with the title-wipe / title-playhead keyframes in index.css.
const SWEEP_DELAY = 300;
const SWEEP_DURATION = 2200;
const FPS = 24;
const END_FRAME = 4 * FPS + 12;

const toTimecode = (frame) => {
  const seconds = Math.floor(frame / FPS);
  const pad = (value) => String(value).padStart(2, '0');
  return `00:00:${pad(seconds)}:${pad(frame % FPS)}`;
};

// The name laid out like a clip on an editing timeline: a playhead sweeps across and reveals it.
function TitleReel() {
  const reduceMotion = useReducedMotion();
  const timecodeRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;
    const start = performance.now() + SWEEP_DELAY;
    const tick = (now) => {
      const progress = Math.min(1, Math.max(0, (now - start) / SWEEP_DURATION));
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - (-2 * progress + 2) ** 2 / 2;
      if (timecodeRef.current) timecodeRef.current.textContent = toTimecode(Math.round(eased * END_FRAME));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <div className="title-reel">
      <div className="title-topline" aria-hidden="true">
        <span><i className="title-rec" />Software engineer / Ahmedabad, IN</span>
        <span>TC <b ref={timecodeRef}>{toTimecode(END_FRAME)}</b></span>
      </div>
      <div className="title-stage">
        <div className="title-content">
          <h1 className="title-name">Avi Mishra</h1>
          <div className="title-tracks" aria-hidden="true">
            <div className="title-ruler" />
            <div className="title-track">
              <span className="track-label">V1</span>
              <span className="track-clip track-clip-main">engineering.mp4</span>
              <span className="track-clip">full-stack · applied AI</span>
            </div>
            <div className="title-track">
              <span className="track-label">A1</span>
              <span className="track-clip track-clip-audio">editing.wav · Premiere · Resolve</span>
            </div>
          </div>
        </div>
        <span className="title-playhead" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="hero-section relative lg:min-h-[min(900px,100svh)] flex items-center overflow-hidden"
    >
      {/* A still, dim editing-suite backdrop so the desk carries the motion. */}
      <div className="hero-backdrop" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-5 lg:gap-8 items-center w-full">
        <div className="lg:col-span-2">
          <TitleReel />
        </div>

        {/* LEFT: Copy */}
        <div className="hero-copy">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.7 }}
            className="hero-tagline"
          >
            Software engineer.<br /><span className="text-gradient">Editor’s eye.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-6 text-lg text-zinc-300 max-w-lg leading-relaxed"
          >
            I build full-stack apps and applied AI tools, with the same care for detail I bring to the editing room.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-lg"
          >
            Final-year B.Tech CSE student at{' '}
            <span className="text-zinc-300">Pandit Deendayal Energy University</span>, focused on MERN, applied ML, and distributed systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="hero-actions mt-8 flex flex-wrap gap-3"
          >
            <a href="#projects" className="btn-primary">
              View Projects <ArrowUpRight size={18} />
            </a>
            <a
              href="/assets/Avi_Mishra_CV.pdf"
              download
              className="btn-ghost !border-white/25 !bg-white/[0.06]"
            >
              <Download size={16} /> Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="hero-socials mt-8 flex items-center gap-4 text-zinc-400"
          >
            <span className="text-xs uppercase tracking-widest">Connect</span>
            <span className="h-px flex-1 bg-white/10 max-w-[60px]" />
            <a
              href="https://github.com/avimishra25"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg border border-white/10 hover:border-amber-400/50 hover:text-amber-300 transition"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/avi-mishra2425"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg border border-white/10 hover:border-amber-400/50 hover:text-amber-300 transition"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:aviam2425@gmail.com"
              aria-label="Email"
              className="p-2 rounded-lg border border-white/10 hover:border-amber-400/50 hover:text-amber-300 transition"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        <EditingDesk />
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center text-zinc-400 hover:text-amber-300 transition"
      >
        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
        <motion.span
          animate={{ y: reduceMotion ? 0 : [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
