/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                violet: {
                    100: '#d3ced9',
                    200: '#a69db3',
                    300: '#7a6d8e',
                    400: '#4d3c68',
                    500: '#210b42',
                    600: '#1a0935',
                    700: '#140728',
                    800: '#0d041a',
                    900: '#07020d',
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
                    900: '#012b33',
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
                    900: '#330112',
                },
                neonYellow: {
                    100: '#fbeed3',
                    200: '#f8dda7',
                    300: '#f4cc7a',
                    400: '#f1bb4e',
                    500: '#edaa22',
                    600: '#be881b',
                    700: '#8e6614',
                    800: '#5f440e',
                    900: '#2f2207',
                },
            },
            backgroundImage: {
                main: "url('/src/assets/images/background.jpg')",
            },
        },
    },
    plugins: [],
};
