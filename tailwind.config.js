/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        karla: ['var(--font-karla)'],
        roboto: ['var(--font-roboto)'],
      },
      boxShadow: {
        header: '0px 4px 16px rgba(1, 28, 64, 0.2)',
        'header-expanded': '4px 4px 24px rgba(1, 17, 38, 0.2)',
        button: 'inset 0px -9px 0px rgba(0, 0, 0, 0.18)',
      }
    },
    colors: {
      third: '#F5DB13',
      primary: '#F2B80',
      secondary: '#F28F16',
      danger: '#D93E30',
      light: '#F6F7F9',
      dark: '#212121',
      green: '#73D677',
      white: '#ffffff',
      black: '#000000',
      deu: {
        100: '#FAD942',
        200: '#DCBF36',
        300: '#BFA62F',
        400: '#88772E',
        500: '#F5F6F8',
        600: '#1E1E1E',
      },
      pro: {
        100: '#F1CE33',
        200: '#CCAF2B',
        300: '#A68E23',
        400: '#62562C',
        500: '#F5F6F8',
        600: '#1E1E1E',
      },
      tri: {
        100: '#FFC2B4',
        200: '#FF9A94',
        300: '#FF6C71',
        400: '#F80037',
        500: '#F3F6F7',
        600: '#1E1E1E'
      }
    }
  },
  plugins: [],
}
