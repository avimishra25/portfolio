import React, { useState } from 'react';
import { Play, ArrowUpRight } from 'lucide-react';

const edits = [
  { id: 'bike-night-ride', title: 'Bike Night Ride', category: 'Night ride edit', duration: '0:26' },
  { id: 'cinematic-storytelling', title: 'Cinematic Storytelling', category: 'Cinematic edit', duration: '1:14' },
  { id: '7000-rpm', title: '7000 RPM', category: 'Motorcycle edit', duration: '1:29' },
  { id: 'vga-x-medium', title: 'VGA × Medium', category: 'Montage edit', duration: '0:34' },
];

export default function SelectedEdits() {
  const [activeId, setActiveId] = useState(null);
  const [failedId, setFailedId] = useState(null);

  return (
    <div className="mt-12 md:mt-16" aria-labelledby="selected-edits-heading">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="selected-edits-heading" className="text-2xl md:text-3xl font-semibold tracking-tight">Selected edits.</h2>
        </div>
        <p className="text-sm text-zinc-400">Edited by me. Press play to watch with sound.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5 md:gap-6">
        {edits.map(edit => {
          const base = `/assets/edits/${edit.id}`;
          const active = activeId === edit.id;
          return (
            <article key={edit.id} className="surface-panel overflow-hidden">
              <div className="aspect-video bg-black">
                {active ? (
                  <video
                    key={edit.id}
                    src={`${base}.mp4`}
                    poster={`${base}.jpg`}
                    controls
                    autoPlay
                    playsInline
                    tabIndex={0}
                    ref={node => node?.focus({ preventScroll: true })}
                    preload="none"
                    aria-label={`${edit.title} — video edited by Avi Mishra`}
                    className="h-full w-full object-contain"
                    onError={() => setFailedId(edit.id)}
                  />
                ) : (
                  <button
                    type="button"
                    aria-label={`Play ${edit.title}`}
                    onClick={() => { setFailedId(null); setActiveId(edit.id); }}
                    className="group relative block h-full w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-300"
                  >
                    <img src={`${base}.jpg`} alt="" width="640" height="360" loading="lazy" className="h-full w-full object-contain motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.025]" />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors group-hover:bg-blue-600 group-focus-visible:bg-blue-600">
                        <Play size={22} fill="currentColor" className="ml-1" />
                      </span>
                    </span>
                    <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs tabular-nums text-white">{edit.duration}</span>
                  </button>
                )}
              </div>
              <div className="p-5">
                <p className="mb-1 text-xs text-blue-300">{edit.category}</p>
                <h3 className="text-lg font-semibold tracking-tight">{edit.title}</h3>
                {failedId === edit.id && (
                  <p role="status" className="mt-3 text-sm text-zinc-400">
                    This video couldn't load.{' '}
                    <a href={`${base}.mp4`} className="inline-flex items-center gap-1 text-blue-200 underline">Open video <ArrowUpRight size={14} /></a>
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
