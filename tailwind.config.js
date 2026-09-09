/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#09090b',
        panel: '#0f0f13',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(59, 130, 246, 0.25)',
        red: '0 0 40px rgba(239, 68, 68, 0.25)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(60% 60% at 50% 40%, rgba(59, 130, 246,0.18) 0%, rgba(239, 68, 68,0.08) 35%, rgba(9,9,11,0) 70%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};