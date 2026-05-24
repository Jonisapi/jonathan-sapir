import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#112A46',
          teal: '#00A6A6',
          gold: '#F3C969'
        }
      }
    }
  },
  plugins: []
};

export default config;
