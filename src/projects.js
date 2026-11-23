// Project content shared by the Projects section and the hero's editing desk.
// `deskFrame` is a small 2x thumbnail for the desk's film strip (frames show at 120x68).
//
// `architecture` drives each project's timeline: tracks are listed top to bottom as an
// editor would stack them (effects, video, audio). Clip `start`/`end` are percentages of
// the lane, chosen to suggest how the layers overlap rather than to measure anything.
export const projects = [
  {
    title: 'CareerCompass AI',
    short: 'CareerCompass',
    anchor: 'careercompass',
    sheetImage: '/assets/careercompass-preview.webp',
    deskFrame: '/assets/desk/careercompass.webp',
    category: 'Applied AI · Full stack',
    description:
      'Career platform that analyzes a resume, scores ATS readiness, matches it to 12 career profiles and pasted job descriptions, then turns the skill gaps into a roadmap, a resume builder, and interview practice. React, Express, and Flask services on Vercel, Render, and Hugging Face Spaces.',
    highlights: [
      'ATS readiness score from a GradientBoostingRegressor trained on 600 synthetic resumes, presented as a coaching heuristic rather than a prediction',
      'Job-description matching: 40% TF-IDF similarity + 60% skill coverage, with matched, missing, and extra skills',
      'Week-by-week roadmap, AI resume builder with PDF export, and interview practice with rubric feedback',
      'Gemini career chatbot, Google OAuth with JWT sessions, PDF reports, resume comparison, and progress tracking',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Flask', 'spaCy', 'Scikit-learn', 'Gemini API', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/avimishra25/CareerCompass-AI',
    demo: 'https://career-compass-ai-omega-smoky.vercel.app/',
    story: {
      label: 'INTELLIGENCE, WITH DIRECTION',
      problem: 'A resume lists your experience. It rarely tells you where to go next.',
      decision: 'Connect resume analysis, job matching, a roadmap, and AI coaching in one workflow, with guardrails on what the AI can claim.',
      result: 'Upload a resume, compare it against a job description, and get a week-by-week plan for the skills to work on next.',
    },
    architecture: {
      output: 'Vercel · Render · Hugging Face Spaces',
      layers: [
        {
          track: 'FX', role: 'Integrations', clips: [
            { name: 'Gemini', detail: 'Career chatbot, resume-builder bullets, and interview feedback, with outputs validated and retried once.', start: 30, end: 49 },
            { name: 'Google OAuth', detail: 'Sign-in with Google, backed by JWT sessions.', start: 52, end: 71 },
            { name: 'PDF reports', detail: 'Downloadable analysis reports and A4 resume export.', start: 74, end: 93 },
          ],
        },
        { track: 'V2', role: 'API', clips: [{ name: 'Express', detail: 'Accounts, JWT auth, and saved job-description history, deployed on Render.', start: 6, end: 100 }] },
        { track: 'V1', role: 'UI', clips: [{ name: 'React', detail: 'Resume upload, career matches, JD matching, roadmap, resume builder, interview practice, and progress dashboard, deployed on Vercel.', start: 0, end: 100 }] },
        { track: 'A1', role: 'ML', clips: [{ name: 'Flask', detail: 'spaCy skill extraction, TF-IDF job matching, ATS scoring, and all Gemini calls, reachable only from the backend, on Hugging Face Spaces.', start: 16, end: 86 }] },
        { track: 'A2', role: 'Data', clips: [{ name: 'MongoDB', detail: 'Users, saved analyses and job-description matches, roadmap progress, and resume drafts.', start: 6, end: 100 }] },
      ],
    },
  },
  {
    title: 'DripStore',
    short: 'DripStore',
    anchor: 'dripstore',
    sheetImage: '/assets/dripstore-preview.webp',
    deskFrame: '/assets/desk/dripstore.webp',
    category: 'E-commerce · Full stack',
    description:
      'Sneaker and streetwear storefront with guest carts, customer accounts, and product/order administration. Deployed on Render as a single Docker service with credential-free customer and admin demos.',
    highlights: [
      'Razorpay verification, signed webhooks, and recovery for interrupted payments',
      'MongoDB transactions apply payment and inventory updates exactly once',
      'Per-size stock, role-based admin controls, and audited order transitions',
      'Live demo with simulated success, failure, and cancellation flows; no real charges',
    ],
    tags: ['React', 'Express', 'MongoDB', 'Razorpay', 'Cloudinary', 'JWT', 'Docker', 'Render'],
    github: 'https://github.com/avimishra25/dripstore',
    demo: 'https://dripstore-demo.onrender.com/',
    story: {
      label: 'BUILT FOR THE IN-BETWEEN',
      problem: 'A storefront needs to handle what happens after someone clicks Pay — including when things go wrong.',
      decision: 'Verify payments on the server and use transactions to keep inventory and order updates consistent.',
      result: 'Try success, failure, and cancellation in a payment playground. No real charges.',
    },
    architecture: {
      output: 'Docker · Render',
      layers: [
        {
          track: 'FX', role: 'Integrations', clips: [
            { name: 'Razorpay', detail: 'Server-side verification, signed webhooks, and recovery for interrupted payments.', start: 34, end: 60 },
            { name: 'Cloudinary', detail: 'Product image storage and delivery.', start: 64, end: 84 },
          ],
        },
        { track: 'V2', role: 'API', clips: [{ name: 'Express', detail: 'JWT auth, role-based admin controls, and audited order transitions.', start: 6, end: 100 }] },
        { track: 'V1', role: 'UI', clips: [{ name: 'React', detail: 'Storefront with guest carts, customer accounts, and product and order administration.', start: 0, end: 100 }] },
        { track: 'A1', role: 'Data', clips: [{ name: 'MongoDB', detail: 'Transactions apply payment and inventory updates exactly once, with per-size stock.', start: 10, end: 100 }] },
      ],
    },
  },
  {
    title: 'Personal Portfolio',
    short: 'This portfolio',
    anchor: 'this-portfolio',
    sheetImage: '/assets/og-image.png',
    deskFrame: '/assets/desk/portfolio.webp',
    category: 'Design & Development',
    description:
      'A personal showcase bringing software engineering and visual storytelling together. Designed and built with React, Tailwind CSS, and Framer Motion, with a responsive dark interface and an interactive editing-desk hero.',
    highlights: [
      'Responsive layouts with scroll reveals and interactive project cards',
      'Scroll-driven film reels and chapter navigation shared across the page',
      'On-demand video gallery for selected editing work',
      'Reduced-motion support, keyboard navigation, and accessible control labels',
    ],
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    // A lighter card than the featured stories: no architecture timeline.
    pitch: {
      label: 'SOFTWARE MEETS STORYTELLING',
      line: 'Software and visual storytelling, sharing one timeline.',
    },
    github: 'https://github.com/avimishra25/portfolio',
    demo: 'https://portfolio-avimishra25s-projects.vercel.app/',
  },
];

// Projects with a story are featured; the portfolio itself closes the section.
export const featured = projects.filter(project => project.story);
export const portfolio = projects.find(project => project.title === 'Personal Portfolio');
