// Project content shared by the Projects section and the hero's editing desk.
//
// `architecture` drives each project's timeline: tracks are listed top to bottom as an
// editor would stack them (effects, video, audio). Clip `start`/`end` are percentages of
// the lane, chosen to suggest how the layers overlap rather than to measure anything.
export const projects = [
  {
    title: 'CareerCompass AI',
    short: 'CareerCompass',
    preview: '/assets/careercompass-preview.jpg',
    category: 'Applied AI · Full stack',
    description:
      'Career intelligence platform with resume analysis, matching across 12 career profiles, and custom job-description matching. React, Express, and Flask services deployed on Vercel, Render, and Hugging Face Spaces.',
    highlights: [
      'Gemini API career chatbot with conversation history and resume context',
      'Job-description matching via TF-IDF + skill coverage, with skill gaps and saved history',
      'Heuristic ATS readiness scoring with GradientBoostingRegressor trained on 600 synthetic samples',
      'Google OAuth, PDF reports, resume comparison, and progress tracking',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Flask', 'spaCy', 'Scikit-learn', 'Gemini API', 'JWT'],
    github: 'https://github.com/avimishra25/CareerCompass-AI',
    demo: 'https://career-compass-ai-omega-smoky.vercel.app/',
    story: {
      label: 'INTELLIGENCE, WITH DIRECTION',
      problem: 'A résumé lists your experience. It rarely tells you where to go next.',
      decision: 'Connect résumé analysis, career matching, and a context-aware AI assistant in one workflow.',
      result: 'Explore 12 career profiles, compare job descriptions, and see the skills to work on next.',
    },
    architecture: {
      output: 'Vercel · Render · Hugging Face Spaces',
      layers: [
        {
          track: 'FX', role: 'Integrations', clips: [
            { name: 'Gemini', detail: 'Career chatbot with conversation history and résumé context.', start: 30, end: 49 },
            { name: 'Google OAuth', detail: 'Sign-in with Google, backed by JWT sessions.', start: 52, end: 71 },
            { name: 'PDF reports', detail: 'Downloadable reports of a résumé analysis.', start: 74, end: 93 },
          ],
        },
        { track: 'V2', role: 'API', clips: [{ name: 'Express', detail: 'Accounts, JWT auth, and saved job-description history, deployed on Render.', start: 6, end: 100 }] },
        { track: 'V1', role: 'UI', clips: [{ name: 'React', detail: 'Résumé upload, career matches, résumé comparison, and progress tracking, deployed on Vercel.', start: 0, end: 100 }] },
        { track: 'A1', role: 'ML', clips: [{ name: 'Flask', detail: 'spaCy résumé analysis, TF-IDF job matching with skill gaps, and ATS readiness scoring, on Hugging Face Spaces.', start: 16, end: 86 }] },
        { track: 'A2', role: 'Data', clips: [{ name: 'MongoDB', detail: 'Users, saved matching history, and progress over time.', start: 6, end: 100 }] },
      ],
    },
  },
  {
    title: 'DripStore',
    short: 'DripStore',
    preview: '/assets/dripstore-preview.jpg',
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
    preview: '/assets/og-image.png',
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
    github: 'https://github.com/avimishra25/portfolio',
    demo: 'https://portfolio-avimishra25s-projects.vercel.app/',
  },
];

// Projects with a story are featured; the portfolio itself closes the section.
export const featured = projects.filter(project => project.story);
export const portfolio = projects.find(project => project.title === 'Personal Portfolio');
