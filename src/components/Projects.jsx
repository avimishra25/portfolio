import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink, ArrowUp } from 'lucide-react';
import ProjectPreview from './ProjectPreview.jsx';
import ArchitectureTimeline from './ArchitectureTimeline.jsx';
import ContactSheet from './ContactSheet.jsx';
import { featured, portfolio } from '../projects.js';

export default function Projects() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="projects" className="section-shell featured-work">
      <div className="section-container">
        <div className="section-intro studio-section-heading">
          <div><h2 className="section-heading">From idea.<br /><span className="text-gradient">To something real.</span></h2></div>
          <p className="section-description">Three projects, a closer look.<br />The problem, the decisions, and what you can try.</p>
        </div>
        <ContactSheet projects={[...featured, portfolio]} />
        <div className="showcase-list">
          {featured.map((project, index) => (
            <motion.article key={project.title} id={project.anchor} className="project-showcase" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }}>
              <div className="showcase-topline"><span>FEATURE {String(index + 1).padStart(2, '0')}</span><span>{project.category}</span></div>
              <div className="showcase-layout">
                <div className="showcase-visual">
                  <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`Try ${project.title} live demo`} className="showcase-image-link"><ProjectPreview title={project.title} /><span className="preview-open">Explore live demo <ExternalLink size={14} /></span></a>
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
              <ArchitectureTimeline project={project} />
              <details className="build-notes"><summary>Inside the build <span>Technical decisions & stack</span></summary><div className="build-notes-content"><p>{project.description}</p><ul>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul><div className="flex flex-wrap gap-2 mt-5">{project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}</div></div></details>
            </motion.article>
          ))}
        </div>
        <motion.article id={portfolio.anchor} className="project-showcase portfolio-showcase" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }}>
          <div className="showcase-topline"><span>FEATURE {String(featured.length + 1).padStart(2, '0')}</span><span>{portfolio.category}</span></div>
          <div className="showcase-layout">
            <div className="showcase-visual">
              <a href="#hero" aria-label="This portfolio: back to the top" className="showcase-image-link"><ProjectPreview title={portfolio.title} /><span className="preview-open">You are here <ArrowUp size={14} /></span></a>
            </div>
            <div className="showcase-copy">
              <p className="studio-label">{portfolio.pitch.label}</p>
              <h3>{portfolio.title}</h3>
              <p className="showcase-problem">{portfolio.pitch.line}</p>
              <p className="showcase-detail">{portfolio.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">{portfolio.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}</div>
              <div className="flex flex-wrap gap-3 mt-7">
                <a href={portfolio.demo} className="btn-primary text-sm" aria-label={`View ${portfolio.title} live site`}>Live site <ExternalLink size={15} /></a>
                <a href={portfolio.github} target="_blank" rel="noreferrer" className="btn-ghost text-sm" aria-label={`View ${portfolio.title} source code on GitHub`}><Github size={16} /> Code</a>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
