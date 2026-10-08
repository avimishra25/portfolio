import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion, useInView } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, Pause, Play } from 'lucide-react';

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef(null);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  // Framer Motion parallax for the profile cutout
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const translateX = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  const springRX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const springRY = useSpring(rotateY, { stiffness: 120, damping: 18 });
  const springTX = useSpring(translateX, { stiffness: 120, damping: 18 });
  const springTY = useSpring(translateY, { stiffness: 120, damping: 18 });

  const containerRef = useRef(null);
  const inView = useInView(containerRef);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion || videoPaused || !inView || !pageVisible) {
      video.pause();
    } else {
      let cancelled = false;
      video.play().catch(() => {
        if (!cancelled) setVideoPaused(true);
      });
      return () => { cancelled = true; video.pause(); };
    }
  }, [reduceMotion, videoPaused, inView, pageVisible]);

  const handleMouseMove = (e) => {
    if (reduceMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[min(900px,100svh)] flex items-center pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden"
    >
      {/* Decorative footage with a still fallback and contrast overlays. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img src="/assets/hero-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        {!reduceMotion && !videoFailed && (
          <video
            ref={videoRef}
            src="/assets/hero-video.mp4"
            poster="/assets/hero-poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/80 via-[#09090b]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/20" />
      </div>
      {!reduceMotion && !videoFailed && (
        <button
          type="button"
          onClick={() => setVideoPaused((paused) => !paused)}
          aria-label={videoPaused ? 'Play background video' : 'Pause background video'}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs text-zinc-200 backdrop-blur hover:bg-black/70 transition"
        >
          {videoPaused ? <Play size={14} /> : <Pause size={14} />}
          {videoPaused ? 'Play background' : 'Pause background'}
        </button>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-8 items-center w-full">
        {/* LEFT: Copy */}
        <div>
          <p className="text-sm font-medium text-blue-300 tracking-[0.18em] uppercase mb-4">Avi Mishra / Software Engineer</p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.7 }}
            className="text-[clamp(2.6rem,5.1vw,4.6rem)] font-semibold tracking-[-0.055em] leading-[1.06] max-w-[650px]"
          >
            Full-stack products.<br /><span className="text-gradient">Intelligent tools.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-6 text-lg text-zinc-300 max-w-lg leading-relaxed"
          >
            I build across the stack — from thoughtful interfaces to the systems and ML behind them.
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
            className="mt-8 flex flex-wrap gap-3"
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
            className="mt-8 flex items-center gap-4 text-zinc-400"
          >
            <span className="text-xs uppercase tracking-widest">Connect</span>
            <span className="h-px flex-1 bg-white/10 max-w-[60px]" />
            <a
              href="https://github.com/avimishra25"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg border border-white/10 hover:border-blue-400/50 hover:text-blue-300 transition"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/avi-mishra2425"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg border border-white/10 hover:border-blue-400/50 hover:text-blue-300 transition"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:aviam2425@gmail.com"
              aria-label="Email"
              className="p-2 rounded-lg border border-white/10 hover:border-blue-400/50 hover:text-blue-300 transition"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        {/* RIGHT: Profile in a circular frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ perspective: 1400 }}
          className="relative flex items-center justify-center py-6 w-full max-w-[420px] mx-auto lg:max-w-none"
        >
          {/* Everything sized to fit — max width capped so nothing overflows */}
          <div className="relative w-full max-w-[400px] lg:max-w-[440px] aspect-square">
            {/* Outer rings — sized to the container so they never bleed out */}
            <div className="absolute inset-0 rounded-full border border-blue-400/15" />
            <div className="absolute inset-4 rounded-full border border-blue-400/10" />
            <motion.div
              animate={{ rotate: reduceMotion ? 0 : 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border border-dashed border-blue-400/20"
            />

            {/* Radial glow inside the frame */}
            <div className="absolute inset-8 rounded-full bg-blue-500/15 blur-2xl" />

            {/* Circular photo frame — clips the cutout cleanly */}
            <motion.div
              style={{
                rotateX: reduceMotion ? 0 : springRX,
                rotateY: reduceMotion ? 0 : springRY,
                x: reduceMotion ? 0 : springTX,
                y: reduceMotion ? 0 : springTY,
                transformStyle: 'preserve-3d',
              }}
              className="absolute inset-6 rounded-full overflow-hidden border border-white/10 bg-gradient-to-b from-blue-600/10 to-slate-900/80"
            >
              <img
                src="/assets/avi-cutout.png"
                alt="Avi Mishra"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                style={{
                  objectPosition: '50% 15%',
                  filter:
                    'drop-shadow(0 0 30px rgba(59, 130, 246,0.35)) drop-shadow(0 0 50px rgba(239, 68, 68,0.2))',
                }}
                draggable="false"
              />
              {/* Inner rim glow */}
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-blue-400/30 shadow-[inset_0_0_60px_rgba(59, 130, 246,0.15)] pointer-events-none" />
            </motion.div>

            {/* Floating accent dots on the ring */}
            <div className="absolute top-4 right-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-glow" />
            <div className="absolute bottom-4 right-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-blue-300" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-white/10 bg-[#11151f] px-5 py-3 text-xs text-zinc-300 shadow-xl">
              Based in Ahmedabad, India <span className="text-blue-300 ml-2">↗</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center text-zinc-500 hover:text-blue-300 transition"
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
