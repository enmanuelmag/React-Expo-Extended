/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './constants/*.{js,jsx,ts,tsx}',
    './hooks/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        app: '#8b5cf6',
        'app-light': '#8b5cf6',
        'app-dark': '#8b5cf6',
      },
    },
  },
  prefix: 'cd-',
  plugins: [],
};
