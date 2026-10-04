import React from 'react';
import { ArrowDown, Database, CreditCard, ShoppingBag, Server, Image } from 'lucide-react';

export default function ProjectPreview({ title }) {
  return (
    <div className={`project-preview ${title === 'DripStore' ? 'project-preview-commerce' : ''}`}>
      <div className="preview-toolbar" aria-hidden="true">
        <span className="flex gap-1.5"><i /><i /><i /></span>
        <span>{title === 'DripStore' ? 'dripstore / architecture' : 'careercompass / live preview'}</span>
        <span className="w-8" />
      </div>
      {title === 'CareerCompass AI' ? (
        <img
          src="/assets/careercompass-preview.jpg"
          alt="CareerCompass AI landing page with resume analysis and career matching tools"
          width="1275"
          height="717"
          loading="lazy"
          className="block w-full aspect-[16/9] object-cover object-top"
        />
      ) : (
        <div className="commerce-diagram" role="img" aria-label="DripStore architecture: React storefront connects to an Express API with seven data models, MongoDB, Razorpay payments, and Cloudinary media.">
          <div aria-hidden="true" className="w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-5">
              <span className="text-lg font-bold tracking-tight text-white">dripstore<span className="text-blue-400">.</span></span>
              <span className="text-[10px] tracking-[0.18em] text-slate-400 uppercase">Commerce architecture</span>
            </div>
            <div className="architecture-node"><ShoppingBag size={16} /><span>React storefront</span><span className="ml-auto text-[10px] text-slate-400">CLIENT</span></div>
            <ArrowDown className="mx-auto my-2 text-blue-400/60" size={16} />
            <div className="architecture-node border-blue-400/30 bg-blue-400/[0.08]"><Server size={16} /><span>Express API</span><span className="ml-auto text-[10px] text-blue-300">7 MODELS</span></div>
            <div className="architecture-branches"><span /><span /><span /></div>
            <div className="grid grid-cols-3 gap-2">
              {[[Database, 'MongoDB'], [CreditCard, 'Razorpay'], [Image, 'Cloudinary']].map(([Icon, label]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.025] py-3 flex flex-col items-center gap-2 text-[11px] text-slate-300"><Icon size={16} className="text-blue-300" />{label}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
