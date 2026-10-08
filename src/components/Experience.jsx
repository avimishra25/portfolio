import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
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
        text: 'Added layered refusal policies to production voice and chat agents. Streamed responses and deduplicated calls to reduce latency and token spend.',
      },
      {
        icon: Zap,
        title: 'Web Optimization',
        text: 'Restructured and minified CMS assets, then verified performance improvements with Lighthouse.',
      },
      {
        icon: Workflow,
        title: 'Workflow Automation',
        text: 'Deployed end-to-end n8n pipelines linking RSS, knowledge bases, OpenAI generation, and social publishing.',
      },
      {
        icon: Bug,
        title: 'Enterprise QA',
        text: 'Tested Firebase Firestore ERP/CRM systems and traced release blockers to missing composite indexes.',
      },
    ],
  },
];

function CountMetric({ value, lowerValue, suffix }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 1 });
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible || reduceMotion) return;
    const animation = animate(0, 1, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: setProgress,
    });
    return () => animation.stop();
  }, [visible, reduceMotion]);

  const format = (fraction) => `${lowerValue === undefined ? '' : `${Math.round(lowerValue * fraction)}–`}${Math.round(value * fraction)}${suffix}`;

  return (
    <p ref={ref} className="text-3xl font-semibold tracking-tight text-blue-200 tabular-nums">
      <span className="sr-only">{format(1)}</span>
      <span aria-hidden="true">{format(reduceMotion ? 1 : progress)}</span>
    </p>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-shell">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="section-intro"
        >
          <span className="chip mb-4"><Briefcase size={12} /> Experience</span>
          <h2 className="section-heading">
            Engineering with <span className="text-blue-300">impact.</span>
          </h2>
          <p className="section-description">
            Production experience across AI security, web performance, automation, and quality.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-1.5 md:left-2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/60 via-blue-400/20 to-transparent" />

          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-7 md:pl-10"
            >
              {/* Node */}
              <div className="absolute left-0 md:left-0.5 top-3 h-3 w-3 rounded-full bg-blue-300 ring-4 ring-blue-400/10" />
              <div className="py-2 md:py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-zinc-400">{exp.period}</span>
                </div>
                <p className="text-blue-300 font-medium">{exp.company}</p>
                <p className="text-sm text-zinc-400 mt-1">{exp.location}</p>
                <div className="my-7 grid sm:grid-cols-2 gap-3">
                  <div className="surface-panel p-5">
                    <CountMetric lowerValue={17} value={20} suffix="%" />
                    <p className="mt-1 text-sm text-zinc-400">Improvement in CMS page performance</p>
                  </div>
                  <div className="surface-panel p-5">
                    <CountMetric value={24} suffix=" defects" />
                    <p className="mt-1 text-sm text-zinc-400">Surfaced in ERP / CRM testing</p>
                  </div>
                </div>

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
                        className="group relative py-5 border-t border-white/10"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-300 transition-colors">
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
