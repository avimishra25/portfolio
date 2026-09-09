import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, ExternalLink, Layers, ShoppingBag, Cpu } from 'lucide-react';

const projects = [
  {
    title: 'CareerCompass AI',
    icon: Cpu,
    accent: 'from-blue-600/30 to-red-500/30',
    description:
      'Distributed 3-service architecture (React on Vercel, Express on Render, Flask ML engine on Hugging Face). 2-pass NLP matching (spaCy + TF-IDF) with 92% keyword recall across 12 roles and 200+ skills.',
    highlights: [
      'ATS scoring engine (R² = 0.87) — GradientBoosting Regressor',
      'Context-aware GPT-4o-mini career chatbot proxy (<2s response)',
      '3-service distributed deploy: Vercel + Render + HF Spaces',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Flask', 'spaCy', 'Scikit-learn', 'JWT'],
    github: 'https://github.com/avimishra25/CareerCompass-AI',
    demo: 'https://career-compass-ai-omega-smoky.vercel.app/',
  },
  {
    title: 'DripStore',
    icon: ShoppingBag,
    accent: 'from-red-500/30 to-blue-600/30',
    description:
      'Full-stack MERN e-commerce app featuring a 7-model REST API, RBAC, and Cloudinary media upload pipelines. Razorpay payment gateway with server-side cryptographic signature verification.',
    highlights: [
      '7-model REST API with role-based access control',
      'Razorpay integration + HMAC-SHA256 signature verification',
      'Cloudinary media pipeline for optimized product uploads',
    ],
    tags: ['MERN', 'Razorpay', 'Cloudinary', 'RBAC', 'REST API'],
    github: 'https://github.com/avimishra25/dripstore',
    demo: null,
  },
];

function TiltCard({ project, index }) {
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useTransform(my, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-10, 10]);
  const glowX = useTransform(mx, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(my, [-0.5, 0.5], ['20%', '80%']);

  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
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
          rotateX: springRX,
          rotateY: springRY,
          transformStyle: 'preserve-3d',
        }}
        className="relative glass rounded-3xl p-8 h-full overflow-hidden"
      >
        {/* Cursor-following glow */}
        <motion.div
          style={{
            background: `radial-gradient(400px circle at ${glowX} ${glowY}, rgba(59, 130, 246,0.15), transparent 40%)`,
          }}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        />

        <div className="relative" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex items-start justify-between mb-6">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.accent} border border-white/10`}>
              <Icon size={24} className="text-blue-200" />
            </div>
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg border border-white/10 hover:border-blue-400/50 hover:text-blue-300 transition"
              >
                <Github size={16} />
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Demo"
                  className="p-2 rounded-lg border border-white/10 hover:border-blue-400/50 hover:text-blue-300 transition"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
          <p className="text-zinc-400 leading-relaxed mb-5">{project.description}</p>

          <ul className="space-y-2 mb-6">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-red-400 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
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
            Projects with <span className="text-gradient">real metrics</span>
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
