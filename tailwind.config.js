// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  mode: 'jit',
  theme: {
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
    },
  },
};
