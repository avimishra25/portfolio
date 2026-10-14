// Single source for the portfolio's sections: navbar chapters, the film-reel nav, and scene breaks.
export const chapters = [
  { id: 'hero', label: 'Intro', scene: 'INTRO' },
  { id: 'projects', label: 'Projects', scene: 'THE BUILDS' },
  { id: 'experience', label: 'Experience', scene: 'ON SET' },
  { id: 'skills', label: 'Skills', scene: 'THE TOOLKIT' },
  { id: 'beyond', label: 'Editing Room', scene: 'THE EDIT' },
  { id: 'contact', label: 'Contact', scene: 'NEXT SCENE' },
];

export const chapterNumber = (index) => String(index + 1).padStart(2, '0');

// Index of the chapter whose section has crossed the reading line near the top of the viewport.
export function activeChapterIndex() {
  const marker = Math.max(120, window.innerHeight * 0.3);
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
  if (atBottom) return chapters.length - 1;
  let current = 0;
  chapters.forEach(({ id }, index) => {
    if (document.getElementById(id)?.getBoundingClientRect().top <= marker) current = index;
  });
  return current;
}
