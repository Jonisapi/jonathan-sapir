import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#2A1710',
          teal: '#1F7A4D',
          gold: '#B91C1C'
        }
      }
    }
  },
  plugins: []
};

export default config;
