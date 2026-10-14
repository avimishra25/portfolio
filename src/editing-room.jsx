import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import '@fontsource-variable/inter';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SelectedEdits from './components/SelectedEdits.jsx';
import './index.css';

function EditingRoom() {
  return (
    <div className="relative min-h-screen bg-base text-zinc-100 overflow-x-clip">
      <a href="#main-content" className="skip-link" onClick={() => document.getElementById('main-content')?.focus({ preventScroll: true })}>Skip to content</a>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <header className="relative border-b border-white/10">
        <div className="section-container flex flex-wrap items-center justify-between gap-4 py-5">
          <a href="/#hero" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white font-black">A</span>
            <span className="font-semibold tracking-tight">Avi<span className="text-amber-300">.</span>Mishra</span>
          </a>
          <span className="studio-label hidden md:block">ENGINEERING / VISUAL STORYTELLING</span>
          <a href="/#beyond" className="btn-ghost !py-2 text-sm">
            <ArrowLeft size={16} /> Back to portfolio
          </a>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="relative section-container py-16 md:py-24">
        <div className="section-intro studio-section-heading">
          <div>
            <p className="studio-label mb-4">EDITING ROOM / FILM &amp; FREELANCE</p>
            <h1 className="section-heading">In the editing room.<br /><span className="text-gradient">Every cut, on purpose.</span></h1>
          </div>
          <p className="section-description">Cinematic stories, night rides,<br />and moments shaped in the edit.</p>
        </div>
        <SelectedEdits />
        <div className="edits-cta">
          <div>
            <p className="studio-label">NEXT SCENE</p>
            <p className="edits-cta-text">Have a story in mind? Let's bring it to life.</p>
          </div>
          <a href="mailto:aviam2425@gmail.com?subject=Video%20editing%20inquiry" className="btn-primary text-sm">Discuss an edit <ArrowUpRight size={16} /></a>
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><EditingRoom /><Analytics /></React.StrictMode>
);
