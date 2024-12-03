/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#339AF0',
        'primary-light': '#EAF3fD',
        'primary-dark': '#339AF0',
      },
    },
  },
  prefix: 'cd-',
  plugins: [],
};
