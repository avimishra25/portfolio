import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#beyond', label: 'Beyond Code' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#hero');
  const pendingAnchor = useRef(null);
  const reduceMotion = useReducedMotion();
  const finishNavigation = () => {
    if (!pendingAnchor.current) return;
    const href = pendingAnchor.current;
    pendingAnchor.current = null;
    document.querySelector(href)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
      const marker = Math.max(120, window.innerHeight * 0.3);
      let current = '#hero';
      for (const link of links) {
        if (document.querySelector(link.href)?.getBoundingClientRect().top <= marker) current = link.href;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = '#contact';
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        document.getElementById('menu-toggle')?.focus();
      }
    };
    if (open) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`site-header fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? 'py-3 backdrop-blur-xl bg-base/90 border-b border-white/10' : 'py-5 bg-base/80 backdrop-blur-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white font-black">
            A
            <span className="absolute inset-0 rounded-xl bg-blue-400/40 blur-lg group-hover:blur-xl transition-all -z-10" />
          </span>
          <span className="font-semibold tracking-tight">
            Avi<span className="text-blue-300">.</span>Mishra
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? 'location' : undefined}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${active === l.href ? 'text-blue-200 bg-blue-400/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary ml-3 !py-2 !px-4 text-sm">
            <Sparkles size={16} /> Let's Talk
          </a>
        </nav>

        <button
          className="lg:hidden p-2 rounded-lg border border-white/10"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          id="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence onExitComplete={finishNavigation}>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-base/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(event) => {
                    event.preventDefault();
                    pendingAnchor.current = l.href;
                    window.history.pushState(null, '', l.href);
                    setOpen(false);
                  }}
                  aria-current={active === l.href ? 'location' : undefined}
                  className={`py-2 ${active === l.href ? 'text-blue-300' : 'text-zinc-300 hover:text-blue-300'}`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
