import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Cloud, Wrench } from 'lucide-react';

const categories = [
  {
    label: 'Languages',
    icon: Code2,
    skills: ['Java', 'C/C++', 'Python', 'JavaScript (ES6+)', 'SQL', 'HTML/CSS'],
  },
  {
    label: 'Frontend & Backend',
    icon: Layout,
    skills: ['React.js', 'Node.js', 'Express.js', 'Flask', 'Tailwind CSS', 'Scikit-learn'],
  },
  {
    label: 'Cloud & Databases',
    icon: Cloud,
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
    skills: ['DSA (100+ LeetCode)', 'OOP', 'OS', 'Networks', 'Git', 'Postman', 'n8n'],
  },
];

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
          <span className="chip mb-4"><Wrench size={12} /> The toolkit</span>
          <h2 className="section-heading">
            Tools I <span className="text-blue-300">build with</span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl">
            Full-stack MERN, applied ML, and distributed cloud architectures.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-t border-white/15 pt-6"
              >
                <div className="flex items-center gap-4 mb-5">

                  <div>
                    <div className="flex items-center gap-2 text-blue-300 mb-1">
                      <Icon size={16} />
                      <span className="text-xs uppercase tracking-widest">Stack</span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight">{cat.label}</h3>
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
