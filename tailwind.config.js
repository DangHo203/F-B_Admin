/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: [
      /^bg-/,
      /^text-/,
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}