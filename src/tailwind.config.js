/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  // tailwind.config.js
theme: {
  extend: {
    boxShadow: {
      glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      glow: '0 4px 15px rgba(72, 187, 120, 0.6)'
    },
    backdropBlur: {
      xs: '2px',
    },
    transitionDuration: {
      400: '400ms',
    }
  },
}

