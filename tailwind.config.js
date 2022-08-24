// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  mode: 'jit',
  theme: {
    extend: {
      fontFamily:{
        "ubuntu":["'Ubuntu'", "sans", "sans-serif"]
      },
      spacing: {
        '1px': '1px',
        '2px': '2px',
      },
      colors: {
        primary: colors.gray,
        secondary: colors.indigo,
        tertiary: colors.sky,
        gray: colors.stone,
        background: colors.black,
        blue: {
          100: '#CAF0F8',
          200: '#ADE8F4',
          300: '#90E0EF',
          400: '#48CAE4',
          500: '#00B4D8',
          600: '#0096C7',
          700: '#0077B6',
          800: '#023E8A',
          900: '#03045E',
        },
      },
    },
  },
};
