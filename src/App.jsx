import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Navbar from './components/Navbar.jsx';
import Extracurricular from './components/Extracurricular.jsx';

export default function App() {
  return (
    <div className="relative min-h-screen bg-base text-zinc-100 overflow-hidden">
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-40" />
      <Navbar />
      <main className="relative">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Extracurricular />
        <Contact />
      </main>
      <footer className="relative border-t border-white/5 py-8 text-center text-sm text-zinc-500">
        <p>
          © {new Date().getFullYear()} Avi Mishra — Crafted with React, R3F & Framer Motion.
        </p>
      </footer>
    </div>
  );
}
