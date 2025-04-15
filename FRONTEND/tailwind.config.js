/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwindcss-scrollbar';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00D1B2',
        secondary: '#7B61FF',
        accent: '#FFC414',
        highlight: '#1CA0FB',
        background: {
          dark: '#141316',
          card: 'rgba(23, 23, 26, 0.8)',
        },
      },
      animation: {
        'gradient': 'gradient 5s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [
    scrollbar,
  ],
}