# Avi Mishra — Portfolio

> Software Engineer · Distributed Systems & Full-Stack (MERN)

A production 3D personal portfolio built with React, React Three Fiber, and Framer Motion. Dark theme with a blue → red gradient system, glassmorphism, and a pointer-reactive R3F starfield in the hero.

**🌐 Live:** [portfolio-avimishra25s-projects.vercel.app](https://portfolio-avimishra25s-projects.vercel.app/)

---

## Highlights

- **R3F Hero canvas** — 2,500-point starfield + slow-rotating icosahedron constellation, pointer-driven parallax, `AdaptiveDpr` + `AdaptiveEvents` for smooth performance across devices.
- **Circular avatar frame** — parallax tilt (`useMotionValue` + `useSpring`) with cursor tracking, blue/red rim glow, and a rotating dashed ring.
- **3D tilt project cards** — perspective transform + cursor-following radial glow overlay.
- **Live R3F float indicators** on each skill category.
- **Working contact form** wired to [Web3Forms](https://web3forms.com/) — no backend, no signup.
- **Fully responsive** — the whole layout collapses gracefully to mobile.

## Tech Stack

| Layer | Tools |
|---|---|
| Framework | React 18, Vite 5 |
| Styling | Tailwind CSS 3 (dark theme, glassmorphism, custom shadows) |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei` |
| Animation | Framer Motion |
| Icons | Lucide React |
| Forms | Web3Forms |
| Deploy | Vercel |

## Local development

```bash
git clone https://github.com/avimishra25/portfolio.git
cd portfolio
npm install
npm run dev
```

The dev server runs on `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

## Assets

Two asset files live under `public/assets/`:

```
public/assets/avi-cutout.png       # Transparent profile cutout
public/assets/Avi_Mishra_CV.pdf    # Downloadable resume
```

Replace either to update the site.

## Configuration

**Contact form** — get a free access key from [web3forms.com](https://web3forms.com/) (they email it, no signup) and paste it into `src/components/Contact.jsx`:

```js
const WEB3FORMS_ACCESS_KEY = 'YOUR_KEY_HERE';
```

**Social links** — update the URLs in `src/components/Hero.jsx` and `src/components/Contact.jsx`.

## Project structure

```
avi-portfolio/
├── public/
│   └── assets/           # Cutout, resume, OG image
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── Experience.jsx
│       ├── Projects.jsx
│       ├── Skills.jsx
│       ├── Extracurricular.jsx
│       ├── Contact.jsx
│       └── canvas/
│           └── HeroCanvas.jsx
├── index.html
├── tailwind.config.js
└── vite.config.js
```

## Deployment

Every push to `main` auto-deploys to Vercel. Pull requests get their own preview URL.

## Featured projects on the site

- **[CareerCompass AI](https://github.com/avimishra25/CareerCompass-AI)** — Distributed 3-service ML platform (React + Express + Flask), 2-pass NLP matching (spaCy + TF-IDF), ATS scoring engine (R² = 0.87).
- **[DripStore](https://github.com/avimishra25/dripstore)** — Full-stack MERN e-commerce app with 7-model REST API, RBAC, Razorpay integration.

## Contact

**Avi Mishra** · Ahmedabad, Gujarat, India
📧 [aviam2425@gmail.com](mailto:aviam2425@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/avi-mishra2425) · [GitHub](https://github.com/avimishra25)
