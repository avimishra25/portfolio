import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Section navigation lives in the film-reel rail (EditJourney): down the right edge on wide
// screens, along the bottom on phones and tablets. The header keeps identity and actions.
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`site-header fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? 'py-3 backdrop-blur-xl bg-base/90 border-b border-white/10' : 'py-5 bg-base/80 backdrop-blur-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-3">
        <a href="#hero" className="flex items-center gap-2 group shrink-0">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white font-black">
            A
            <span className="absolute inset-0 rounded-xl bg-amber-400/40 blur-lg group-hover:blur-xl transition-all -z-10" />
          </span>
          <span className="font-semibold tracking-tight">
            Avi<span className="text-amber-300">.</span>Mishra
          </span>
        </a>

        <span className="studio-label hidden md:block">ENGINEERING / VISUAL STORYTELLING</span>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="/assets/Avi_Mishra_CV.pdf" target="_blank" rel="noreferrer" className="btn-ghost !px-3 sm:!px-5 !py-2 text-xs sm:text-sm">Resume ↗</a>
          <a href="#contact" className="btn-primary !px-3 sm:!px-5 !py-2 text-xs sm:text-sm">Let’s talk</a>
        </div>
      </div>
    </motion.header>
  );
}
