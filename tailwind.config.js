/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'cue-blue': 'rgb(0, 18, 63)',
      'cue-red': 'rgb(180, 35, 37)',
      'cue-black': 'rgb(31, 30, 28)',
      'cue-grey': '#F0F0F0'
    }),
    textColor: {
      'cue-blue': 'rgb(0, 18, 63)',
      'cue-red': 'rgb(180, 35, 37)',
      'cue-black': 'rgb(31, 30, 28)',
      'cue-white': '#FAFAFAFA'
    },
    fontFamily: {
      cocogoose: ['Calibri', 'sans-serif'],
      calibri: ['Calibri', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
});