/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F4F1EA',
        ink: '#111111',
        stamp: '#D9251D', // The exact Vermillion stamp red from the ref pic
        subtle: '#6B6862',
        surface: '#FAF8F3'
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
