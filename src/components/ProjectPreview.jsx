import React from 'react';

export default function ProjectPreview({ title }) {
  const isDripStore = title === 'DripStore';
  const isPortfolio = title === 'Personal Portfolio';

  return (
    <div className="project-preview">
      <div className="preview-toolbar" aria-hidden="true">
        <span className="flex gap-1.5"><i /><i /><i /></span>
        <span>{isPortfolio ? 'personal portfolio / you are here' : isDripStore ? 'dripstore / live demo' : 'careercompass / live preview'}</span>
        <span className="w-8" />
      </div>
      <img
        src={isPortfolio ? '/assets/og-image.png' : isDripStore ? '/assets/dripstore-preview.jpg' : '/assets/careercompass-preview.jpg'}
        alt={isPortfolio
          ? 'Avi Mishra personal portfolio — Software Engineer and Video Editor'
          : isDripStore
          ? 'Live DripStore demo with playground controls, Wear the Culture headline, and sneaker highlights'
          : 'CareerCompass AI landing page with resume analysis and career matching tools'}
        width={isPortfolio ? 1730 : isDripStore ? 1274 : 1275}
        height={isPortfolio ? 909 : 717}
        loading="lazy"
        className={isPortfolio || isDripStore
          ? 'block w-full aspect-[16/9] object-contain bg-[#090909]'
          : 'block w-full aspect-[16/9] object-cover object-top'}
      />
    </div>
  );
}
