import React from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowLeft, ArrowUpRight, Clapperboard } from 'lucide-react';
import SelectedEdits from './components/SelectedEdits.jsx';
import './index.css';

function EditingRoom() {
  return (
    <div className="relative min-h-screen bg-base text-zinc-100 overflow-x-clip">
      <a href="#main-content" className="skip-link" onClick={() => document.getElementById('main-content')?.focus({ preventScroll: true })}>Skip to content</a>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <header className="relative border-b border-white/10">
        <div className="section-container flex flex-wrap items-center justify-between gap-4 py-6">
          <a href="/#hero" className="font-semibold tracking-tight">Avi<span className="text-blue-300">.</span>Mishra</a>
          <a href="/" className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-blue-200">
            <ArrowLeft size={16} /> Back to portfolio
          </a>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="relative section-container py-16 md:py-24">
        <span className="chip mb-5"><Clapperboard size={14} /> Film & freelance</span>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">In the <span className="text-blue-300">editing room.</span></h1>
        <p className="section-description">A collection of cinematic stories, night rides, and moments shaped in the edit.</p>
        <SelectedEdits />
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-wrap items-center justify-between gap-5">
          <p className="text-zinc-300">Have a story in mind? Let's bring it to life.</p>
          <a href="mailto:aviam2425@gmail.com?subject=Video%20editing%20inquiry" className="btn-primary text-sm">Discuss an edit <ArrowUpRight size={16} /></a>
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><EditingRoom /></React.StrictMode>
);
