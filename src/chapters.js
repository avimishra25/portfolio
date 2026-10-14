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

// Where the reading line near the top of the viewport sits: the chapter whose section has
// crossed it, and how far (0–1) the line has travelled toward the next chapter's section.
export function chapterProgress() {
  const marker = Math.max(120, window.innerHeight * 0.3);
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
  if (atBottom) return { index: chapters.length - 1, fraction: 0 };
  const tops = chapters.map(({ id }) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity);
  let index = 0;
  tops.forEach((top, i) => { if (top <= marker) index = i; });
  // Scroll positions at which each chapter starts, clamped to the scrollable range so the
  // first chapter starts at the top of the page and the last one is reached at the bottom.
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const startOf = (i) => Math.min(maxScroll, Math.max(0, window.scrollY + tops[i] - marker));
  if (index + 1 >= chapters.length || tops[index + 1] === Infinity) return { index, fraction: 0 };
  const from = startOf(index);
  const to = startOf(index + 1);
  const fraction = to > from ? Math.min(1, Math.max(0, (window.scrollY - from) / (to - from))) : 0;
  return { index, fraction };
}

// Index of the chapter whose section has crossed the reading line.
export const activeChapterIndex = () => chapterProgress().index;
