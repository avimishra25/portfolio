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
