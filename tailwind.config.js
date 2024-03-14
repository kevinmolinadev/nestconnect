/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        croma: {
          primary: '#9E0044',
          secondary: '#A41C4E',
          tertiary: '#BA254A',
          quaternary: '#A7A9AC',
        },
        neutro: {
          primary: '#695958',
          secondary: '#483C46',
          tertiary: '#522B46',
        },
        gray: {
          primary: '#5A5A64',
          secondary: '#CBC7CB',
          tertiary: '#E4E1E4',
          quaternary: '#F4EFF3',
        },
      },
    },
  },
  plugins: [],
}
