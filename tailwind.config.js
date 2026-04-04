/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C9A96E',
        'gold-light': '#E8D5B0',
        charcoal: '#1A1A1A',
        dark: '#0D0D0D',
        stone: '#8A8A8A',
        'stone-light': '#B8B8B4',
        'off-white': '#F5F5F0',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.77, 0, 0.175, 1)',
        smooth: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
};
