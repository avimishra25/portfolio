import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Github, Linkedin, Copy, Check } from 'lucide-react';

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState('idle');
  const email = 'aviam2425@gmail.com';

  useEffect(() => {
    if (copyStatus !== 'copied') return;
    const timer = window.setTimeout(() => setCopyStatus('idle'), 3000);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('manual');
    }
  };

  return (
    <section id="contact" className="relative px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="relative max-w-7xl mx-auto overflow-hidden rounded-[2rem] border border-blue-300/15 bg-[#0e1420] p-7 sm:p-12 lg:p-16"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative grid lg:grid-cols-[1.5fr_1fr] items-end gap-10 lg:gap-16">
          <div>
            <p className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-blue-200">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_#6ee7b740]" />
              Open to software engineering roles
            </p>
            <h2 className="text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[1.08] tracking-[-0.05em]">
              Let's build<br />
              <span className="text-gradient">something useful.</span>
            </h2>
            <p className="mt-6 max-w-lg text-zinc-400 leading-relaxed">
              A thoughtful interface, a smarter tool, or a system ready to grow.
              If that sounds like your next project, I'd love to hear about it.
            </p>
          </div>
          <div className="lg:pb-1">
            <a href="mailto:aviam2425@gmail.com" className="btn-primary w-full sm:w-auto lg:w-full justify-between gap-10 !px-6 !py-4">
              Let's talk <ArrowUpRight size={20} />
            </a>
            <button type="button" onClick={copyEmail} className="btn-ghost mt-4 text-sm min-h-11">
              {copyStatus === 'copied' ? <Check size={16} /> : <Copy size={16} />}
              {copyStatus === 'copied' ? 'Email copied' : 'Copy email address'}
            </button>
            <p role="status" className="mt-2 text-xs text-zinc-300">
              {copyStatus === 'copied' ? 'Email address copied to clipboard.' : copyStatus === 'manual' ? 'Automatic copying is unavailable. Select and copy the address below.' : ''}
            </p>
            {copyStatus === 'manual' && (
              <input aria-label="Email address to copy" readOnly value={email} onFocus={event => event.target.select()} ref={node => { if (node) { node.focus(); node.select(); } }} className="mt-2 w-full rounded-lg border border-white/20 bg-black/30 p-3 text-sm text-zinc-100" />
            )}
            <a href="mailto:aviam2425@gmail.com" className="mt-4 flex items-center gap-2 text-sm text-zinc-400 hover:text-blue-200 transition-colors">
              <Mail size={15} /> aviam2425@gmail.com
            </a>
          </div>
        </div>
        <div className="relative mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-5">
          <p className="flex items-center gap-2 text-sm text-zinc-400"><MapPin size={15} /> Ahmedabad, India</p>
          <div className="flex gap-5">
            <a href="https://github.com/avimishra25" target="_blank" rel="noreferrer" className="contact-social inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-blue-200"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a>
            <a href="https://www.linkedin.com/in/avi-mishra2425" target="_blank" rel="noreferrer" className="contact-social inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-blue-200"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} /></a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
