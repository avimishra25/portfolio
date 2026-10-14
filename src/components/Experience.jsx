import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';

// Each role reads like release notes: role details, measured impact, and a changelog of what shipped.
const experience = [
  {
    role: 'Software Developer Intern',
    company: 'Upteky Solutions Pvt. Ltd.',
    period: 'May 2026 – July 2026',
    location: 'Ahmedabad, India',
    metrics: [
      { lowerValue: 17, value: 20, suffix: '%', label: 'Improvement in CMS page performance' },
      { value: 24, suffix: ' defects', label: 'Surfaced in ERP / CRM testing' },
    ],
    changes: [
      {
        scope: 'ai',
        title: 'AI Agent Security',
        text: 'Added layered refusal policies to production voice and chat agents. Streamed responses and deduplicated calls to reduce latency and token spend.',
      },
      {
        scope: 'web',
        title: 'Web Optimization',
        text: 'Restructured and minified CMS assets, then verified performance improvements with Lighthouse.',
      },
      {
        scope: 'ops',
        title: 'Workflow Automation',
        text: 'Deployed end-to-end n8n pipelines linking RSS, knowledge bases, OpenAI generation, and social publishing.',
      },
      {
        scope: 'qa',
        title: 'Enterprise QA',
        text: 'Tested Firebase Firestore ERP/CRM systems and traced release blockers to missing composite indexes.',
      },
    ],
  },
];

function CountMetric({ value, lowerValue, suffix }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.6 });
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
    <p ref={ref} className="impact-value tabular-nums">
      <span className="sr-only">{format(1)}</span>
      <span aria-hidden="true">{format(reduceMotion ? 1 : progress)}</span>
    </p>
  );
}

export default function Experience() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="experience" className="section-shell">
      <div className="section-container">
        <div className="section-intro studio-section-heading">
          <div><h2 className="section-heading">Real work.<br /><span className="text-gradient">In production.</span></h2></div>
          <p className="section-description">What I shipped during my internship.<br />Four areas, and the impact of each.</p>
        </div>

        {experience.map((job, index) => (
          <motion.article
            key={job.company}
            className="role-card"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="showcase-topline"><span>ROLE {String(index + 1).padStart(2, '0')} / SHIPPED TO PRODUCTION</span><span>{job.period}</span></div>

            <dl className="role-fields">
              <div><dt>Role</dt><dd><h3>{job.role}</h3></dd></div>
              <div><dt>Company</dt><dd>{job.company}</dd></div>
              <div><dt>Location</dt><dd>{job.location}</dd></div>
            </dl>

            <div className="impact-grid">
              {job.metrics.map(metric => (
                <div key={metric.label} className="impact-cell">
                  <p className="meta-label">Impact</p>
                  <CountMetric value={metric.value} lowerValue={metric.lowerValue} suffix={metric.suffix} />
                  <p className="impact-label">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="changelog">
              <p className="meta-label changelog-title">Changelog</p>
              <ol>
                {job.changes.map((change, changeIndex) => (
                  <li key={change.title} className="change">
                    <span className="change-id">#{String(changeIndex + 1).padStart(2, '0')}</span>
                    <span className="change-scope">{change.scope}</span>
                    <div>
                      <h4>{change.title}</h4>
                      <p>{change.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
