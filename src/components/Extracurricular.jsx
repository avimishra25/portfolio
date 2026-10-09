import React from 'react';
import { motion } from 'framer-motion';
import { Film, Award, Clapperboard, ArrowUpRight } from 'lucide-react';

export default function Extracurricular() {
  return (
    <section id="beyond" className="section-shell">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}>
          <div className="section-intro">
            <span className="chip mb-4"><Film size={12} /> Beyond the code</span>
            <h2 className="section-heading">A different kind <span className="text-blue-300">of storytelling.</span></h2>
          </div>
          <div className="surface-panel overflow-hidden grid md:grid-cols-[1fr_2fr]">
            <div className="relative border-b md:border-b-0 md:border-r border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent p-7 md:p-9 flex flex-row md:flex-col items-start justify-between gap-5 md:gap-8">
              <Clapperboard aria-hidden="true" size={36} strokeWidth={1.3} className="shrink-0 text-blue-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-blue-300 mb-3">Film & freelance</p>
                <h3 className="text-2xl font-semibold tracking-tight">Video editor.<br />Visual storyteller.</h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">Freelance video editing<br />Editor-in-Chief · VGA, PDEU</p>
                <div className="mt-6">
                  <p className="text-xs font-medium text-zinc-400 mb-3">Editing toolkit</p>
                  <ul className="flex flex-wrap gap-2">
                    {['Adobe Premiere Pro', 'DaVinci Resolve', 'Adobe After Effects'].map(tool => (
                      <li key={tool} className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-zinc-300">{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-7 md:p-9 flex flex-col justify-center">
              <p className="text-lg md:text-xl text-zinc-200 leading-relaxed">Good software and good films share something: every detail should serve the experience.</p>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">Alongside software, I take on freelance video projects — shaping raw footage and AI-generated visuals into stories with a clear rhythm, mood, and purpose.</p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-x-5 gap-y-3 text-sm text-zinc-300">
                {['Cinematic edits', 'Tech video edits', 'AI video generation & editing', 'Podcast intros & episode edits'].map(specialty => (
                  <li key={specialty} className="flex items-start gap-2"><span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400" />{specialty}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/editing-room.html" className="btn-primary text-sm">
                  Explore the editing room <Clapperboard size={16} />
                </a>
                <a href="mailto:aviam2425@gmail.com?subject=Video%20editing%20inquiry" className="btn-ghost text-sm">
                  Discuss an edit <ArrowUpRight size={16} />
                </a>
              </div>
              <p className="mt-5 text-sm text-zinc-400 leading-relaxed">As Editor-in-Chief of PDEU's Video Graphic Association, I led the editorial vision and edited a short film nominated in the IFP 50-Hour Filmmaking Challenge.</p>
              <div className="mt-6 flex items-start gap-3 border-t border-white/10 pt-5 text-sm text-blue-200">
                <Award size={19} className="shrink-0 mt-0.5" />
                <p>IFP 50-Hour Filmmaking Challenge<span className="block mt-1 text-xs text-zinc-400">Nominated short film · Editor</span></p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
