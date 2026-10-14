import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink, ShoppingBag, Cpu, Layout } from 'lucide-react';
import ProjectPreview from './ProjectPreview.jsx';

const projects = [
  {
    title: 'CareerCompass AI',
    category: 'Applied AI · Full stack',
    icon: Cpu,
    description:
      'Career intelligence platform with resume analysis, matching across 12 career profiles, and custom job-description matching. React, Express, and Flask services deployed on Vercel, Render, and Hugging Face Spaces.',
    highlights: [
      'Gemini API career chatbot with conversation history and resume context',
      'Job-description matching via TF-IDF + skill coverage, with skill gaps and saved history',
      'Heuristic ATS readiness scoring with GradientBoostingRegressor trained on 600 synthetic samples',
      'Google OAuth, PDF reports, resume comparison, and progress tracking',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Flask', 'spaCy', 'Scikit-learn', 'Gemini API', 'JWT'],
    github: 'https://github.com/avimishra25/CareerCompass-AI',
    demo: 'https://career-compass-ai-omega-smoky.vercel.app/',
    story: {
      label: 'INTELLIGENCE, WITH DIRECTION',
      problem: 'A résumé lists your experience. It rarely tells you where to go next.',
      decision: 'Connect résumé analysis, career matching, and a context-aware AI assistant in one workflow.',
      result: 'Explore 12 career profiles, compare job descriptions, and see the skills to work on next.',
    },
  },
  {
    title: 'DripStore',
    category: 'E-commerce · Full stack',
    icon: ShoppingBag,
    description:
      'Sneaker and streetwear storefront with guest carts, customer accounts, and product/order administration. Deployed on Render as a single Docker service with credential-free customer and admin demos.',
    highlights: [
      'Razorpay verification, signed webhooks, and recovery for interrupted payments',
      'MongoDB transactions apply payment and inventory updates exactly once',
      'Per-size stock, role-based admin controls, and audited order transitions',
      'Live demo with simulated success, failure, and cancellation flows; no real charges',
    ],
    tags: ['React', 'Express', 'MongoDB', 'Razorpay', 'Cloudinary', 'JWT', 'Docker', 'Render'],
    github: 'https://github.com/avimishra25/dripstore',
    demo: 'https://dripstore-demo.onrender.com/',
    story: {
      label: 'BUILT FOR THE IN-BETWEEN',
      problem: 'A storefront needs to handle what happens after someone clicks Pay — including when things go wrong.',
      decision: 'Verify payments on the server and use transactions to keep inventory and order updates consistent.',
      result: 'Try success, failure, and cancellation in a payment playground. No real charges.',
    },
  },
  {
    title: 'Personal Portfolio',
    category: 'Design & Development',
    icon: Layout,
    description:
      'A personal showcase bringing software engineering and visual storytelling together. Designed and built with React, Tailwind CSS, and Framer Motion, with a responsive dark interface and an interactive editing-desk hero.',
    highlights: [
      'Responsive layouts with scroll reveals and interactive project cards',
      'Scroll-driven film reels and chapter navigation shared across the page',
      'On-demand video gallery for selected editing work',
      'Reduced-motion support, keyboard navigation, and accessible control labels',
    ],
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    github: 'https://github.com/avimishra25/portfolio',
    demo: 'https://portfolio-avimishra25s-projects.vercel.app/',
  },
];

// Projects with a story are featured; the portfolio itself closes the section.
const featured = projects.filter(project => project.story);
const portfolio = projects.find(project => project.title === 'Personal Portfolio');

export default function Projects() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="projects" className="section-shell featured-work">
      <div className="section-container">
        <div className="section-intro studio-section-heading">
          <div><p className="studio-label mb-4">02 / SELECTED WORK</p><h2 className="section-heading">From idea.<br /><span className="text-gradient">To something real.</span></h2></div>
          <p className="section-description">Two projects, a closer look.<br />The problem, the decisions, and what you can try.</p>
        </div>
        <div className="showcase-list">
          {featured.map((project, index) => (
            <motion.article key={project.title} className="project-showcase" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }}>
              <div className="showcase-topline"><span>FEATURE {String(index + 1).padStart(2, '0')}</span><span>{project.category}</span></div>
              <div className="showcase-layout">
                <div className="showcase-visual">
                  <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`Try ${project.title} live demo`} className="showcase-image-link"><ProjectPreview title={project.title} /><span className="preview-open">Explore live demo <ExternalLink size={14} /></span></a>
                  <div className="clip-track" aria-hidden="true"><span>V1</span><div>{project.title} / product preview</div><span>↗</span></div>
                </div>
                <div className="showcase-copy">
                  <p className="studio-label">{project.story.label}</p>
                  <h3>{project.title}</h3>
                  <p className="showcase-problem">{project.story.problem}</p>
                  <dl><dt>The decision</dt><dd>{project.story.decision}</dd><dt>Try it yourself</dt><dd>{project.story.result}</dd></dl>
                  <div className="flex flex-wrap gap-3 mt-7">
                    <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary text-sm" aria-label={`View ${project.title} live project`}>Live demo <ExternalLink size={15} /></a>
                    <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost text-sm" aria-label={`View ${project.title} source code on GitHub`}><Github size={16} /> Code</a>
                  </div>
                </div>
              </div>
              <details className="build-notes"><summary>Inside the build <span>Technical decisions & stack</span></summary><div className="build-notes-content"><p>{project.description}</p><ul>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul><div className="flex flex-wrap gap-2 mt-5">{project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}</div></div></details>
            </motion.article>
          ))}
        </div>
        <div className="portfolio-colophon"><div><p className="studio-label">ALSO IN THE COLLECTION</p><h3>This portfolio.</h3><p>Software and visual storytelling, sharing one timeline. Built with React, Tailwind CSS, and Framer Motion.</p></div><a className="btn-ghost text-sm" href={portfolio.github} target="_blank" rel="noreferrer"><Github size={16} /> Explore the source</a></div>
      </div>
    </section>
  );
}
