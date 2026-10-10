import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink, Layers, ShoppingBag, Cpu } from 'lucide-react';
import ProjectPreview from './ProjectPreview.jsx';

const projects = [
  {
    title: 'CareerCompass AI',
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
  },
  {
    title: 'DripStore',
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
  },
];

function TiltCard({ project, index }) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useTransform(my, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-2, 2]);
  const glowX = useTransform(mx, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(my, [-0.5, 0.5], ['20%', '80%']);
  const background = useMotionTemplate`radial-gradient(400px circle at ${glowX} ${glowY}, rgba(59, 130, 246, 0.15), transparent 40%)`;

  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    if (reduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const Icon = project.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 1200 }}
      className="group"
    >
      <motion.div
        style={{
          rotateX: reduceMotion ? 0 : springRX,
          rotateY: reduceMotion ? 0 : springRY,
          transformStyle: 'preserve-3d',
        }}
        className="project-card relative rounded-2xl border border-white/10 bg-[#10131b] h-full overflow-hidden flex flex-col hover:border-blue-400/30 transition-colors"
      >
        {/* Cursor-following glow */}
        <motion.div
          style={{
            background,
          }}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        />

        <ProjectPreview title={project.title} />
        <div className="relative p-6 md:p-8 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3 text-blue-300">
              <Icon size={18} />
              <span className="text-xs font-medium tracking-[0.16em] uppercase">{index === 0 ? 'Applied AI · Full stack' : 'E-commerce · Full stack'}</span>
            </div>
            <span className="text-xs font-mono text-zinc-400">0{index + 1}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">{project.title}</h3>
          <p className="text-zinc-400 leading-relaxed mb-5">{project.description}</p>

          <ul className="space-y-2 mb-6">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-blue-400 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mb-7">
            {project.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
          </div>
            <div className="flex flex-wrap gap-3 mt-auto pt-5 border-t border-white/10">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary text-sm" aria-label={`View ${project.title} live project`}>
                  View project <ExternalLink size={15} />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                className="btn-ghost text-sm"
              >
                <Github size={16} /> Source code
              </a>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="chip mb-4"><Layers size={12} /> Featured Work</span>
          <h2 className="section-heading">
            Selected <span className="text-blue-300">work.</span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl">
            End-to-end systems — from distributed ML services to production e-commerce.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <TiltCard project={p} index={i} key={p.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
