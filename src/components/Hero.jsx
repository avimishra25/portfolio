import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import HeroCanvas from './canvas/HeroCanvas.jsx';

export default function Hero() {
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

  const handleMouseMove = (e) => {
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
      className="relative min-h-screen flex items-center pt-24 md:pt-28 overflow-hidden"
    >
      {/* Ambient 3D canvas */}
      <HeroCanvas />

      {/* Radial glow backdrop for the cutout */}
      <div className="pointer-events-none absolute inset-0 bg-hero-radial" />
      <div className="aurora" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* LEFT: Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="chip mb-6"
          >
            <Sparkles size={12} /> Available for Full-Time · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
          >
            Hi, I'm <span className="text-gradient">Avi Mishra</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-4 text-lg md:text-xl text-zinc-300 max-w-xl"
          >
            Software Engineer · Distributed Systems & Full-Stack (MERN)
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-5 text-zinc-400 leading-relaxed max-w-xl"
          >
            Final-year B.Tech CSE student at{' '}
            <span className="text-zinc-200">Pandit Deendayal Energy University</span>. I ship
            multi-service ML-driven platforms, harden production chatbots against prompt
            injection, and design scalable cloud architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#projects" className="btn-primary">
              <Sparkles size={16} /> Explore Projects
            </a>
            <a
              href="/assets/Avi_Mishra_CV.pdf"
              download
              className="btn-ghost"
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
          className="relative flex items-center justify-center py-6"
        >
          {/* Everything sized to fit — max width capped so nothing overflows */}
          <div className="relative w-full max-w-[420px] md:max-w-[480px] aspect-square">
            {/* Outer rings — sized to the container so they never bleed out */}
            <div className="absolute inset-0 rounded-full border border-blue-400/15" />
            <div className="absolute inset-4 rounded-full border border-red-400/10" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border border-dashed border-blue-400/20"
            />

            {/* Radial glow inside the frame */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-600/30 via-red-500/20 to-transparent blur-2xl animate-pulse-glow" />

            {/* Circular photo frame — clips the cutout cleanly */}
            <motion.div
              style={{
                rotateX: springRX,
                rotateY: springRY,
                x: springTX,
                y: springTY,
                transformStyle: 'preserve-3d',
              }}
              className="absolute inset-6 rounded-full overflow-hidden border border-white/10 bg-gradient-to-b from-blue-600/10 to-red-500/5 shadow-glow"
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
            <div className="absolute bottom-4 right-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-red-400 shadow-red" />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-zinc-500 hover:text-blue-300 transition"
      >
        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
