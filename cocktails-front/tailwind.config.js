/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#efd3e2',
          200: '#dfa6c5',
          300: '#d07aa9',
          400: '#c04d8c',
          500: '#b0216f',
          600: '#8d1a59',
          700: '#6a1443',
          800: '#460d2c',
          900: '#230716'
        },
        secondary: {
          100: '#fef0dc',
          200: '#fde2ba',
          300: '#fbd397',
          400: '#fac575',
          500: '#f9b652',
          600: '#c79242',
          700: '#956d31',
          800: '#644921',
          900: '#322410'
        }
      },
      backgroundImage: {
        main: "url('/src/assets/images/1.svg')",
        main2: "url('/src/assets/images/2.jpg')"
      }
    }
  },
  plugins: []
}
