import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Check, AlertCircle, Loader2 } from 'lucide-react';

// 1) Go to https://web3forms.com/ and enter your email (aviam2425@gmail.com)
// 2) Copy the access key they email you and paste it below.
// 3) That's it — no signup, no backend needed. Submissions arrive in your inbox.
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please tell me your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'A valid email helps me reply';
    if (form.message.trim().length < 10) e.message = 'A little more detail, please (10+ chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio contact from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          botcheck: '', // honeypot
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error('Web3Forms error:', data);
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const field =
    'w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-400/60 focus:shadow-glow transition-all disabled:opacity-60';

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="chip mb-4"><Mail size={12} /> Get in touch</span>
          <h2 className="section-heading">
            Let's <span className="text-gradient">build</span> something
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed max-w-md">
            Open to Software Engineering roles, ML platform work, and interesting distributed
            systems problems. I read every message.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="mailto:aviam2425@gmail.com"
              className="flex items-center gap-3 text-zinc-300 hover:text-blue-300 transition"
            >
              <span className="p-2 rounded-lg border border-white/10">
                <Mail size={16} />
              </span>
              aviam2425@gmail.com
            </a>
            <div className="flex items-center gap-3 text-zinc-300">
              <span className="p-2 rounded-lg border border-white/10">
                <MapPin size={16} />
              </span>
              Ahmedabad, Gujarat, India
            </div>
            <div className="flex items-center gap-3 pt-2">
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
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-6 md:p-8 space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm text-zinc-400 mb-2">Your name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={field}
              placeholder="Ada Lovelace"
              disabled={status === 'sending'}
            />
            {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-zinc-400 mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={field}
              placeholder="you@company.com"
              disabled={status === 'sending'}
            />
            {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-zinc-400 mb-2">Message</label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${field} resize-none`}
              placeholder="Tell me about the role, project, or idea…"
              disabled={status === 'sending'}
            />
            {errors.message && <p className="mt-1 text-xs text-rose-400">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'sending' && (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending…
              </>
            )}
            {status === 'success' && (
              <>
                <Check size={16} /> Message sent — I'll reply soon!
              </>
            )}
            {status === 'error' && (
              <>
                <AlertCircle size={16} /> Something broke — email me directly
              </>
            )}
            {status === 'idle' && (
              <>
                <Send size={16} /> Send message
              </>
            )}
          </button>

          {status === 'error' && (
            <p className="text-xs text-zinc-400 text-center">
              Reach me at{' '}
              <a href="mailto:aviam2425@gmail.com" className="text-blue-300 hover:underline">
                aviam2425@gmail.com
              </a>
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
