import React from 'react';
import { MotionConfig } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Hero from './components/Hero.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Navbar from './components/Navbar.jsx';
import Extracurricular from './components/Extracurricular.jsx';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-base text-zinc-100 overflow-x-clip">
      <a href="#main-content" className="skip-link" onClick={() => document.getElementById('main-content')?.focus({ preventScroll: true })}>Skip to content</a>
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-20" />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Extracurricular />
        <Contact />
      </main>
      <footer className="relative border-t border-white/10 py-8 text-sm text-zinc-400">
        <div className="section-container flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <p className="font-medium text-zinc-200">Built with curiosity. Edited with care.</p>
            <p className="mt-2 text-xs">© {new Date().getFullYear()} Avi Mishra · Ahmedabad, India</p>
          </div>
          <a href="#hero" className="contact-social inline-flex items-center gap-2 self-start sm:self-auto py-2 text-zinc-300 hover:text-blue-200">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </footer>
    </div>
    </MotionConfig>
  );
}
