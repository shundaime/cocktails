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
        },
        violet: {
          100: '#d3ced9',
          200: '#a69db3',
          300: '#7a6d8e',
          400: '#4d3c68',
          500: '#210b42',
          600: '#1a0935',
          700: '#140728',
          800: '#0d041a',
          900: '#07020d'
        },
        neon: {
          100: '#cdf7ff',
          200: '#9bf0ff',
          300: '#68e8ff',
          400: '#36e1ff',
          500: '#04d9ff',
          600: '#03aecc',
          700: '#028299',
          800: '#025766',
          900: '#012b33'
        },
        neonPink: {
          100: '#ffcdde',
          200: '#ff9abd',
          300: '#ff689d',
          400: '#ff357c',
          500: '#ff035b',
          600: '#cc0249',
          700: '#990237',
          800: '#660124',
          900: '#330112'
        }
      },
      backgroundImage: {
        main: "url('/src/assets/images/background.jpg')"
      }
    }
  },
  plugins: []
}
