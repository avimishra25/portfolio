import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

const email = 'aviam2425@gmail.com';
const timeFormat = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });

function useLocalTime() {
  const [time, setTime] = useState(() => timeFormat.format(new Date()));
  useEffect(() => {
    const timer = window.setInterval(() => setTime(timeFormat.format(new Date())), 30000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}

// Contact details rendered like a small JSON file; values that are links stay real links.
const fields = [
  { key: 'status', value: 'open to software engineering roles', accent: true },
  { key: 'email', value: email, href: `mailto:${email}` },
  { key: 'github', value: 'avimishra25', href: 'https://github.com/avimishra25' },
  { key: 'linkedin', value: 'avi-mishra2425', href: 'https://www.linkedin.com/in/avi-mishra2425' },
  { key: 'resume', value: 'Avi_Mishra_CV.pdf', href: '/assets/Avi_Mishra_CV.pdf' },
  { key: 'location', value: 'Ahmedabad, India' },
];

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [copyStatus, setCopyStatus] = useState('idle');
  const localTime = useLocalTime();

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

  const rows = [...fields, { key: 'localTime', value: `${localTime} IST` }];

  return (
    <section id="contact" className="section-shell">
      <div className="section-container">
        <motion.div
          className="contact-layout"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-pitch">
            <p className="studio-label mb-4">06 / CONTACT</p>
            <h2 className="contact-heading">Let's build<br /><span className="text-gradient">something useful.</span></h2>
            <p className="contact-text">
              A thoughtful interface, a smarter tool, or a system ready to grow.
              If that sounds like your next project, I'd love to hear about it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${email}`} className="btn-primary">Email me <ArrowUpRight size={18} /></a>
              <button type="button" onClick={copyEmail} className="btn-ghost text-sm min-h-11">
                {copyStatus === 'copied' ? <Check size={16} /> : <Copy size={16} />}
                {copyStatus === 'copied' ? 'Email copied' : 'Copy email'}
              </button>
            </div>
            <p role="status" className="mt-3 text-xs text-zinc-300">
              {copyStatus === 'copied' ? 'Email address copied to clipboard.' : copyStatus === 'manual' ? 'Automatic copying is unavailable. Select and copy the address below.' : ''}
            </p>
            {copyStatus === 'manual' && (
              <input aria-label="Email address to copy" readOnly value={email} onFocus={event => event.target.select()} ref={node => { if (node) { node.focus(); node.select(); } }} className="mt-2 w-full max-w-sm rounded-lg border border-white/20 bg-black/30 p-3 text-sm text-zinc-100" />
            )}
          </div>

          <div className="contact-file">
            <div className="contact-file-tab"><span>contact.json</span><span><i className="record-dot" aria-hidden="true" />available</span></div>
            <div className="contact-json">
              <span aria-hidden="true" className="json-brace">{'{'}</span>
              <dl>
                {rows.map(({ key, value, href, accent }, index) => (
                  <div key={key} className="json-row">
                    <dt><span aria-hidden="true">"</span>{key}<span aria-hidden="true">":</span></dt>
                    <dd className={accent ? 'json-accent' : ''}>
                      <span aria-hidden="true">"</span>
                      {href ? <a href={href} target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined} rel="noreferrer">{value}</a> : value}
                      <span aria-hidden="true">"{index < rows.length - 1 ? ',' : ''}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <span aria-hidden="true" className="json-brace">{'}'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
