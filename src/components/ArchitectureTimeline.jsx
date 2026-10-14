import React, { useState } from 'react';

const clipKey = (clip) => `${clip.track}-${clip.name}`;

// A project's architecture laid out as editing tracks. Hovering, focusing, or tapping a
// clip moves the playhead to it and explains that layer in the caption below.
export default function ArchitectureTimeline({ project }) {
  const { layers, output } = project.architecture;
  const clips = layers.flatMap(layer => layer.clips.map(clip => ({ ...clip, track: layer.track, role: layer.role })));
  const [activeKey, setActiveKey] = useState(() => clipKey(clips.find(clip => clip.track === 'V1') ?? clips[0]));
  const active = clips.find(clip => clipKey(clip) === activeKey);

  return (
    <div className="arch">
      <div className="arch-head">
        <p className="meta-label">Architecture timeline</p>
        <p className="arch-output">Export <span aria-hidden="true">→</span> <b>{output}</b></p>
      </div>

      <div className="arch-grid">
        <div className="arch-row arch-ruler-row" aria-hidden="true"><span /><div className="arch-ruler" /></div>
        {layers.map(layer => (
          <div key={layer.track} className="arch-row">
            <span className="arch-label"><b>{layer.track}</b><span>{layer.role}</span></span>
            <div className="arch-lane">
              {layer.clips.map(clip => {
                const key = clipKey({ ...clip, track: layer.track });
                return (
                  <button
                    key={key}
                    type="button"
                    className={`arch-clip arch-clip-${layer.track.toLowerCase()}${key === activeKey ? ' active' : ''}`}
                    style={{ left: `${clip.start}%`, width: `${clip.end - clip.start}%` }}
                    aria-label={`${layer.role}: ${clip.name}`}
                    aria-pressed={key === activeKey}
                    onMouseEnter={() => setActiveKey(key)}
                    onFocus={() => setActiveKey(key)}
                    onClick={() => setActiveKey(key)}
                  >
                    {clip.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <div className="arch-overlay" aria-hidden="true"><span className="arch-playhead" style={{ left: `${active.start}%` }} /></div>
      </div>

      <p className="arch-caption" aria-live="polite">
        <span>{active.track} · {active.role}</span> <b>{active.name}</b> — {active.detail}
      </p>
    </div>
  );
}
