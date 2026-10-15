import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Proficiency is measured by how far each tool has shipped: prototype, shipped, or production.
const levels = {
  production: { label: 'Production', length: 3, description: 'Used in production or across my live projects' },
  shipped: { label: 'Shipped', length: 2, description: 'Shipped in a live project or at work' },
  prototype: { label: 'Prototype', length: 1, description: 'Built with in coursework or prototypes' },
};

// Levels follow where each tool has run: production = in production or across the live
// projects; shipped = in one live project or at work; prototype = coursework and prototypes.
const bins = [
  {
    label: 'Frontend',
    description: 'Responsive interfaces that turn complex workflows into clear, usable experiences.',
    tools: [['React.js', 'production'], ['JavaScript (ES6+)', 'production'], ['HTML/CSS', 'production'], ['Tailwind CSS', 'production'], ['Vite', 'shipped'], ['Framer Motion', 'shipped']],
  },
  {
    label: 'Backend & Systems',
    description: 'APIs, auth, payments, and data models that connect the product behind the interface.',
    tools: [['Node.js', 'production'], ['Express.js', 'production'], ['MongoDB', 'production'], ['JWT auth', 'production'], ['Razorpay', 'shipped'], ['Google OAuth', 'shipped'], ['Firebase Firestore', 'shipped'], ['SQL / MySQL', 'prototype']],
  },
  {
    label: 'Applied ML',
    description: 'Text analysis, matching, and predictive models delivered through practical web tools.',
    tools: [['Python', 'shipped'], ['Flask', 'shipped'], ['Scikit-learn', 'shipped'], ['spaCy', 'shipped'], ['TF-IDF', 'shipped'], ['Gemini API', 'shipped'], ['OpenAI API', 'shipped']],
  },
  {
    label: 'Cloud & DevOps',
    description: 'Deploys, containers, and hosted services that keep the projects live.',
    tools: [['Vercel', 'production'], ['Render', 'production'], ['Docker', 'shipped'], ['Cloudinary', 'shipped'], ['Hugging Face Spaces', 'shipped'], ['AWS S3 / EC2', 'prototype'], ['AWS DynamoDB / Aurora', 'prototype']],
  },
];

function UsageMeter({ level }) {
  return (
    <span className={`usage-meter usage-meter-${level}`} aria-hidden="true">
      {[1, 2, 3].map(step => <i key={step} className={step <= levels[level].length ? 'filled' : ''} />)}
    </span>
  );
}

export default function Skills() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="skills" className="section-shell">
      <div className="section-container">
        <div className="section-intro studio-section-heading">
          <div><h2 className="section-heading">The tech bins.<br /><span className="text-gradient">Sorted by use.</span></h2></div>
          <p className="section-description">Every tool, tagged by how far it has shipped.<br />From prototype to production.</p>
        </div>

        <ul className="usage-key" aria-label="Proficiency key">
          {Object.entries(levels).map(([key, level]) => (
            <li key={key}><UsageMeter level={key} /><span><b>{level.label}</b>{level.description}</span></li>
          ))}
        </ul>

        <div className="tech-bins">
          {bins.map(({ label, description, tools }, index) => (
            <motion.article
              key={label}
              className="tech-bin"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="tech-bin-header"><span>BIN {String(index + 1).padStart(2, '0')}</span><span>{tools.length} tools</span></div>
              <div className="tech-bin-body">
                <h3>{label}</h3>
                <p>{description}</p>
                <ul>
                  {tools.map(([name, level]) => (
                    <li key={name} className="bin-tool">
                      <span>{name}</span>
                      <span className="bin-tool-level"><UsageMeter level={level} />{levels[level].label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="core-skills">
          <p className="meta-label">Core / Foundations</p>
          <p>Java · C/C++ · DSA (100+ LeetCode) · OOP · Operating systems · Networks · Git · Postman · n8n</p>
        </div>
      </div>
    </section>
  );
}
