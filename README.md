# Avi Mishra — 3D Portfolio

Production-ready React + Vite + Tailwind + R3F portfolio.

## Setup

```bash
npm install
npm run dev
```

## Assets

Drop the transparent cutout at:

```
public/assets/avi-cutout.png
```

Drop the resume PDF at:

```
public/assets/Avi_Mishra_CV.pdf
```

## Stack

- React 18 + Vite
- Tailwind CSS (dark theme, glassmorphism, cyan/emerald accents)
- @react-three/fiber + @react-three/drei (Starfield, Float, AdaptiveDpr)
- Framer Motion (parallax, tilt, scroll reveals)
- Lucide React (icons)

## Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css
└── components/
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── Experience.jsx
    ├── Projects.jsx
    ├── Skills.jsx
    ├── Extracurricular.jsx
    ├── Contact.jsx
    └── canvas/
        └── HeroCanvas.jsx
```
