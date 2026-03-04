/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f8',
          100: '#ffe4f2',
          200: '#ffc9e5',
          300: '#ff9fd0',
          400: '#ff7abf',
          500: '#f472b6',
          600: '#ec4899',
          700: '#db2777',
          800: '#9d174d',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(236, 72, 153, 0.25)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};

