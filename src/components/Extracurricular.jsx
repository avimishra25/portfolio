import React from 'react';
import { motion } from 'framer-motion';
import { Film, Award } from 'lucide-react';

export default function Extracurricular() {
  return (
    <section className="relative py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-red-500/20 border border-white/10">
            <Film className="text-blue-300" size={28} />
          </div>
          <div className="flex-1">
            <div className="chip mb-2"><Award size={12} /> Beyond Code</div>
            <h3 className="text-xl md:text-2xl font-semibold">
              Editor-in-Chief · Video Graphic Association (VGA), PDEU
            </h3>
            <p className="mt-2 text-zinc-400 leading-relaxed">
              Led the association's editorial vision. Edited a short film{' '}
              <span className="text-blue-200">nominated in the IFP 50-Hour Filmmaking Challenge</span>{' '}
              — same craft mindset I bring to shipping software: iterate fast, cut what doesn't
              serve the story.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
