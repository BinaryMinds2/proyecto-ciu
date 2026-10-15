/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gamer: {
          bg: 'rgb(var(--gamer-bg) / <alpha-value>)',
          card: 'rgb(var(--gamer-card) / <alpha-value>)',
          footer: 'rgb(var(--gamer-footer) / <alpha-value>)',
          primary: 'rgb(var(--gamer-primary) / <alpha-value>)',
          accent: 'rgb(var(--gamer-accent) / <alpha-value>)',
          textMain: 'rgb(var(--gamer-textMain) / <alpha-value>)',
          textMuted: 'rgb(var(--gamer-textMuted) / <alpha-value>)',
        }
      }
    },
  },
  plugins: [],
}