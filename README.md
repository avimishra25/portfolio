# Avi Mishra — Portfolio

> Software Engineer · Full-Stack & Applied ML · Freelance Video Editor

A personal portfolio built with React, Vite, Tailwind CSS, and Framer Motion. It brings together software projects, engineering experience, and selected video edits in a responsive dark interface.

**Live:** [portfolio-avimishra25s-projects.vercel.app](https://portfolio-avimishra25s-projects.vercel.app/)

## Highlights

- **Video hero:** muted background footage with pause/play controls, a still-image fallback, and a softly framed portrait. Playback pauses when the hero leaves the viewport or the tab is hidden.
- **Smaller mobile video:** phones load a roughly 2.2 MB portrait version; larger screens load a roughly 5 MB landscape version. The source is chosen on page entry to avoid downloading another version on resize.
- **Selected software projects:** CareerCompass AI, DripStore, and Personal Portfolio previews, technical highlights, and source links.
- **Experience:** internship contributions and counters that animate once to 17–20% performance improvement and 24 defects surfaced.
- **Skills:** Frontend, Backend & Systems, and Applied ML, supported by a separate foundations row.
- **Beyond the code:** freelance editing specialties, Premiere Pro / DaVinci Resolve / After Effects, and VGA editorial and filmmaking experience.
- **Selected edits:** four thumbnail-led videos with native playback, sound, and fullscreen controls. Video files load only after a click, and only one gallery player is mounted at a time.
- **Contact:** direct email, a dedicated editing inquiry link, and copy-email with a manual fallback when clipboard access is unavailable.
- **Navigation:** desktop and compact menus, section highlighting, a keyboard skip link, and a back-to-top link.

Reduced-motion preferences disable the decorative hero video and show final counter values immediately. Focus indicators and accessible control labels support keyboard navigation. Gallery video captions remain pending accurate dialogue transcripts.

## Stack

| Layer | Tools |
| --- | --- |
| UI | React 18, Vite 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Media | Native HTML video, local MP4 files and JPEG posters |
| Hosting | Vercel |

The previous `HeroCanvas.jsx` and Three.js dependencies remain in the repository but are not used by the current hero.

## Local development

Install Node.js and npm, then:

```bash
git clone https://github.com/avimishra25/portfolio.git
cd portfolio
npm ci
npm run dev
```

Vite prints the local address, normally `http://localhost:5173`. If the port is occupied, it chooses another available port.

```bash
npm run build    # Generate the production site in dist/
npm run preview  # Serve the production build locally
```

No API keys or environment variables are required for the current site. Contact actions use email links and the browser clipboard; there is no contact-form backend.

## Updating content

| Content | Location |
| --- | --- |
| Headline, portrait, resume link, hero video | `src/components/Hero.jsx` |
| Projects and source/demo links | `src/components/Projects.jsx` |
| Project preview layouts | `src/components/ProjectPreview.jsx` |
| Internship details and counters | `src/components/Experience.jsx` |
| Skills and foundations | `src/components/Skills.jsx` |
| Editing services and filmmaking background | `src/components/Extracurricular.jsx` |
| Gallery titles, categories, durations, and media IDs | `src/components/SelectedEdits.jsx` |
| Email, clipboard behavior, and contact links | `src/components/Contact.jsx` |
| Section links | `src/components/Navbar.jsx` |
| Footer and section order | `src/App.jsx` |
| Shared styles | `src/index.css` |
| Search descriptions, canonical URL, and sharing metadata | `index.html` |

Email links also appear in the hero and Beyond the Code section. Update all occurrences when changing the contact address.

### Media assets

```text
public/
├── favicon.svg
└── assets/
    ├── Avi_Mishra_CV.pdf
    ├── avi-cutout.png
    ├── careercompass-preview.jpg
    ├── og-image.png
    ├── hero-poster.jpg
    ├── hero-video.mp4
    ├── hero-video-mobile.mp4
    └── edits/
        ├── bike-night-ride.{jpg,mp4}
        ├── cinematic-storytelling.{jpg,mp4}
        ├── 7000-rpm.{jpg,mp4}
        └── vga-x-medium.{jpg,mp4}
```

Each gallery entry maps its `id` to `/assets/edits/<id>.jpg` and `/assets/edits/<id>.mp4`. To add an edit, supply both files and add its title, category, duration, and ID to the `edits` array. Keep the duration label in sync with the video.

The four web copies total roughly 51 MB. They preserve the original durations and audio while using smaller 720p H.264 files with streaming-friendly MP4 metadata. Originals are not included. Posters load lazily; gallery MP4s are not requested until playback is selected.

## Deployment

The connected Vercel project deploys pushes to `main`.

- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite

When changing the public domain, update the canonical, Open Graph, and Twitter URLs in `index.html`. After replacing the sharing image, update its version query to help refresh cached previews.

## Verification

The repository currently provides build and preview scripts; it does not include a permanent automated test suite.

Before publishing:

1. Run `npm run build` and `git diff --check`.
2. Check phone, tablet, and desktop layouts for wrapping and horizontal overflow.
3. Test keyboard navigation, the skip link, menu, and visible focus indicators.
4. Check copy-email success and its manual fallback, email links, and resume download.
5. Verify hero pause/resume, reduced motion, counter end values, and gallery playback.
6. Confirm gallery videos are not downloaded before a click and switching edits replaces the active player.
7. Check the live deployment and sharing metadata after pushing.

Desktop and phone automated accessibility scans passed during the latest implementation checks. These supplement manual review; spoken-dialogue captions are still outstanding.

## Featured projects

- **[CareerCompass AI](https://github.com/avimishra25/CareerCompass-AI):** React, Express, and Flask services with resume analysis, heuristic ATS readiness scoring, job-description matching and skill gaps, Gemini career chat, PDF reports, and progress tracking.
- **[DripStore](https://github.com/avimishra25/dripstore):** Sneaker and streetwear e-commerce with payment recovery, signed Razorpay webhooks, transactional inventory updates, per-size stock, and role-based administration. The [live Render demo](https://dripstore-demo.onrender.com/) runs as one Docker service with credential-free customer/admin access and simulated payments; no real money is charged.

## Contact

**Avi Mishra** · Ahmedabad, India

[Email](mailto:aviam2425@gmail.com) · [LinkedIn](https://www.linkedin.com/in/avi-mishra2425) · [GitHub](https://github.com/avimishra25)
