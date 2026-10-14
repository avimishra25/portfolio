// Single source for the portfolio's sections: the menu, the film-reel nav, and the scene breaks that label each section.
export const chapters = [
  { id: 'hero', label: 'Intro' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Tech Stack' },
  { id: 'beyond', label: 'Editing Room' },
  { id: 'contact', label: 'Contact' },
];

export const chapterNumber = (index) => String(index + 1).padStart(2, '0');

// The reading line near the top of the viewport that decides which chapter is current.
const readingLine = () => Math.max(120, window.innerHeight * 0.3);

// Scroll positions at which each chapter becomes current, clamped to the scrollable range so
// the first chapter starts at the top of the page and the last one is reached at the bottom.
function chapterStarts() {
  const marker = readingLine();
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  return chapters.map(({ id }) => {
    const section = document.getElementById(id);
    if (!section) return Infinity;
    return Math.min(maxScroll, Math.max(0, window.scrollY + section.getBoundingClientRect().top - marker));
  });
}

// The current chapter and how far (0–1) the page has scrolled toward the next one.
export function chapterProgress() {
  const marker = readingLine();
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
  if (atBottom) return { index: chapters.length - 1, fraction: 0 };
  const tops = chapters.map(({ id }) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity);
  let index = 0;
  // 1px of slack: scroll positions round, so a section scrolled exactly to the line may sit a hair below it.
  tops.forEach((top, i) => { if (top <= marker + 1) index = i; });
  if (index + 1 >= chapters.length || tops[index + 1] === Infinity) return { index, fraction: 0 };
  const starts = chapterStarts();
  const [from, to] = [starts[index], starts[index + 1]];
  const fraction = to > from ? Math.min(1, Math.max(0, (window.scrollY - from) / (to - from))) : 0;
  return { index, fraction };
}

// The inverse of chapterProgress: the scroll position for a point `fraction` of the way from
// chapter `index` to the next one. Used when scrubbing the film-reel rail.
export function scrollForChapter(index, fraction) {
  const starts = chapterStarts();
  const from = starts[index];
  const to = starts[index + 1] ?? from;
  return from + (to - from) * fraction;
}
