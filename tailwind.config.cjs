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
          bg: '#0F0E17',
          card: '#1A1829',
          primary: '#7F52FF',
          accent: '#00F0FF',
          textMain: '#F3F4F6',
          textMuted: '#9CA3AF',
        }
      }
    },
  },
  plugins: [],
}