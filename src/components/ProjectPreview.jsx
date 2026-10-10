import React from 'react';

export default function ProjectPreview({ title }) {
  const isDripStore = title === 'DripStore';

  return (
    <div className="project-preview">
      <div className="preview-toolbar" aria-hidden="true">
        <span className="flex gap-1.5"><i /><i /><i /></span>
        <span>{isDripStore ? 'dripstore / live demo' : 'careercompass / live preview'}</span>
        <span className="w-8" />
      </div>
      <img
        src={isDripStore ? '/assets/dripstore-preview.png' : '/assets/careercompass-preview.jpg'}
        alt={isDripStore
          ? 'DripStore storefront with Wear the Culture headline, sneaker highlights, and shopping links'
          : 'CareerCompass AI landing page with resume analysis and career matching tools'}
        width={isDripStore ? 1782 : 1275}
        height={isDripStore ? 877 : 717}
        loading="lazy"
        className={isDripStore
          ? 'block w-full aspect-[16/9] object-contain bg-[#090909]'
          : 'block w-full aspect-[16/9] object-cover object-top'}
      />
    </div>
  );
}
