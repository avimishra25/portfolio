import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ShieldCheck, Zap, Workflow, Bug } from 'lucide-react';

const experience = [
  {
    role: 'Software Developer Intern',
    company: 'Upteky Solutions Pvt. Ltd.',
    period: 'May 2026 – July 2026',
    location: 'Ahmedabad, India',
    bullets: [
      {
        icon: ShieldCheck,
        title: 'AI Agent Security',
        text: 'Hardened production voice/chatbots against prompt injection using layered refusal policies; streamed responses and deduplicated calls to reduce latency and token spend.',
      },
      {
        icon: Zap,
        title: 'Web Optimization',
        text: 'Boosted page performance by 17–20% on CMS architectures via asset restructuring, minification, and Lighthouse verification.',
      },
      {
        icon: Workflow,
        title: 'Workflow Automation',
        text: 'Deployed end-to-end n8n pipelines linking RSS, knowledge bases, OpenAI generation, and social publishing.',
      },
      {
        icon: Bug,
        title: 'Enterprise QA',
        text: 'White-box testing on Firebase Firestore ERP/CRM systems, surfacing 24 defects and debugging missing composite indexes behind release blockers.',
      },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="chip mb-4"><Briefcase size={12} /> Experience</span>
          <h2 className="section-heading">
            Where I've <span className="text-gradient">shipped</span> lately
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl">
            Production internships with measurable impact — security, performance, and QA.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/60 via-red-400/40 to-transparent" />

          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-12 md:pl-20 mb-12"
            >
              {/* Node */}
              <div className="absolute left-2 md:left-6 top-2 h-5 w-5 rounded-full bg-gradient-to-br from-blue-400 to-red-500 shadow-glow" />
              <div className="glass rounded-2xl p-6 md:p-8 hover:border-blue-400/30 transition-colors">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {exp.role} <span className="text-blue-300">· {exp.company}</span>
                  </h3>
                  <span className="text-sm text-zinc-400">{exp.period}</span>
                </div>
                <p className="text-sm text-zinc-500 mb-6">{exp.location}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {exp.bullets.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className="group relative p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-blue-400/30 hover:bg-white/[0.04] transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600/20 to-red-500/20 text-blue-300 group-hover:from-blue-600/40 group-hover:to-red-500/40 transition-colors">
                            <Icon size={16} />
                          </div>
                          <div>
                            <h4 className="font-medium text-zinc-100">{b.title}</h4>
                            <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                              {b.text}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
