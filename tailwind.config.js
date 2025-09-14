/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        orange: '#FF6B00',
        'mb-black': '#2C2C2C',
        'mb-black-200': '#191919',
      }
    },
  },
  plugins: [],
}