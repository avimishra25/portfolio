import React from 'react';

// An editor's contact sheet for the Projects section: every project as one frame on a strip,
// each jumping to its full card below. Hover or focus circles the frame in grease pencil.
export default function ContactSheet({ projects }) {
  return (
    <nav className="contact-sheet" aria-label="Projects at a glance">
      <div className="contact-sheet-head" aria-hidden="true">
        <span>Contact sheet / {projects.length} frames</span>
        <span>Pick a frame ↓</span>
      </div>
      <div className="contact-sheet-strip">
        <div className="film-perfs" aria-hidden="true" />
        <ol className="contact-sheet-frames">
          {projects.map((project, index) => (
            <li key={project.anchor}>
              <a href={`#${project.anchor}`} className="sheet-frame" aria-label={`${String(index + 1).padStart(2, '0')} ${project.title}, ${project.category}`}>
                <span className="sheet-shot">
                  <span className="sheet-image"><img src={project.sheetImage} alt="" loading="lazy" decoding="async" /></span>
                  <svg className="sheet-mark" viewBox="0 0 200 120" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M104 10 C160 6 195 30 192 62 C189 94 148 114 96 112 C44 110 7 90 8 58 C9 27 47 9 112 14" />
                  </svg>
                </span>
                <span className="sheet-caption">
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  <span>{project.short}</span>
                  <em>{project.category}</em>
                </span>
              </a>
            </li>
          ))}
        </ol>
        <div className="film-perfs" aria-hidden="true" />
      </div>
    </nav>
  );
}
