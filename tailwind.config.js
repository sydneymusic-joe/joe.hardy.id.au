/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md,html}", "./src/**/*.svg", "./src/**/*.jpeg"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Times New Roman', 'serif'],
      },
      colors : {
        'linkblue' : '#2F3DAE',
        'white' : '#ffffff',
      },
      backgroundImage: {
        'header': "url('/assets/images/selfie.jpeg')",
      },
      backgroundPosition : {
        'bottom-4': 'center bottom -7rem',
      }
    },
  },
  plugins: [],
}

