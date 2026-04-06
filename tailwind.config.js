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
        'paper-white': '#FFFFFF',
        'off-white': '#FAFAFA',
        beige: '#F5F5F0',
        charcoal: '#1A1A1A',
        dark: '#0A0A0A',
        stone: '#999999',
        'stone-light': '#EAEAEA',
      },
      fontFamily: {
        display: ['Bodoni Moda', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.15em',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.77, 0, 0.175, 1)',
        smooth: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
};
