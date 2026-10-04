import React from 'react';
import { motion } from 'framer-motion';


import { Code2, Layout, Cloud, Wrench } from 'lucide-react';

const categories = [
  {
    label: 'Languages',
    icon: Code2,
    color: '#3b82f6',
    skills: ['Java', 'C/C++', 'Python', 'JavaScript (ES6+)', 'SQL', 'HTML/CSS'],
  },
  {
    label: 'Frontend & Backend',
    icon: Layout,
    color: '#ef4444',
    skills: ['React.js', 'Node.js', 'Express.js', 'Flask', 'Tailwind CSS', 'Scikit-learn'],
  },
  {
    label: 'Cloud & Databases',
    icon: Cloud,
    color: '#3b82f6',
    skills: [
      'AWS S3',
      'AWS EC2',
      'AWS DynamoDB',
      'AWS Aurora',
      'MongoDB',
      'MySQL',
      'Firebase Firestore',
    ],
  },
  {
    label: 'CS Fundamentals & Tools',
    icon: Wrench,
    color: '#ef4444',
    skills: ['DSA (100+ LeetCode)', 'OOP', 'OS', 'Networks', 'Git', 'Postman', 'n8n'],
  },
];

/** Lightweight decorative gem; no WebGL context or animation loop. */
function FloatIndicator({ color }) {
  return (
    <div aria-hidden="true" className="w-16 h-16 shrink-0 grid place-items-center" style={{ color }}>
      <div className="skill-gem w-10 h-12" />
    </div>
  );
}
export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="chip mb-4"><Wrench size={12} /> Technical Matrix</span>
          <h2 className="section-heading">
            Tools I <span className="text-gradient">build with</span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl">
            Full-stack MERN, applied ML, and distributed cloud architectures.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 hover:border-blue-400/30 transition-colors"
              >
                <div className="flex items-center gap-4 mb-5">
                  <FloatIndicator color={cat.color} />
                  <div>
                    <div className="flex items-center gap-2 text-blue-300 mb-1">
                      <Icon size={16} />
                      <span className="text-xs uppercase tracking-widest">Stack</span>
                    </div>
                    <h3 className="text-xl font-semibold">{cat.label}</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-lg text-sm border border-white/10 bg-white/[0.03] text-zinc-200 hover:border-blue-400/40 hover:text-blue-200 transition"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
