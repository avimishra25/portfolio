import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, BrainCircuit, Wrench } from 'lucide-react';

const categories = [
  {
    label: 'Frontend', icon: Layout, number: '01',
    description: 'Responsive interfaces that turn complex workflows into clear, usable experiences.',
    skills: ['React.js', 'JavaScript (ES6+)', 'HTML/CSS', 'Tailwind CSS'],
  },
  {
    label: 'Backend & Systems', icon: Server, number: '02',
    description: 'APIs, data models, and cloud services that connect the product behind the interface.',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'SQL / MySQL', 'Firebase Firestore', 'AWS S3 / EC2', 'AWS DynamoDB / Aurora'],
  },
  {
    label: 'Applied ML', icon: BrainCircuit, number: '03',
    description: 'Text analysis, matching, and predictive models delivered through practical web tools.',
    skills: ['Python', 'Flask', 'Scikit-learn', 'spaCy', 'TF-IDF', 'OpenAI API'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-shell">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }} className="section-intro">
          <span className="chip mb-4"><Wrench size={12} /> The toolkit</span>
          <h2 className="section-heading">From interface <span className="text-blue-300">to intelligence.</span></h2>
          <p className="section-description">Three connected disciplines. One focus: building useful software from end to end.</p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-5">
          {categories.map(({ label, icon: Icon, number, description, skills }, i) => (
            <motion.article key={label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.08 }} className="surface-panel p-6 md:p-7">
              <div className="mb-7 flex justify-between items-center">
                <span className="rounded-xl border border-blue-300/15 bg-blue-400/5 p-3 text-blue-300"><Icon size={20} /></span>
                <span aria-hidden="true" className="text-xs font-mono text-zinc-400">{number}</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{label}</h3>
              <p className="mt-3 mb-6 text-sm text-zinc-400 leading-relaxed lg:min-h-[4.5rem]">{description}</p>
              <ul className="flex flex-wrap gap-2">
                {skills.map(skill => <li key={skill} className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-zinc-300">{skill}</li>)}
              </ul>
            </motion.article>
          ))}
        </div>
        <div className="mt-6 border-t border-white/10 pt-6 grid md:grid-cols-[180px_1fr] gap-3">
          <h3 className="text-sm font-medium text-zinc-200">The foundations</h3>
          <p className="text-sm leading-relaxed text-zinc-400">Java · C/C++ · DSA (100+ LeetCode) · OOP · Operating systems · Networks · Git · Postman · n8n</p>
        </div>
      </div>
    </section>
  );
}
