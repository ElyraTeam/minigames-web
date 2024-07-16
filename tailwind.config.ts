import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#52FA60',
          200: '#41F950',
          300: '#2FF940',
          400: '#1EF830',
          500: '#0DF822',
          600: '#07EA1A',
          700: '#07D818',
          800: '#06C616',
          900: '#047E0E',
          DEFAULT: '#0DF822',
        },
        secondary: {
          300: '#22B2B7',
          500: '#1a8c90',
          700: '#136366',
          DEFAULT: '#1a8c90',
        },
        light: '#64EB97',
        dark: '#4CD375',
        'teamgradient-from': '#aa69cb',
        'teamgradient-to': '#95aff3',
      },
    },
    keyframes: {
      'blurry-move': {
        '0%': { translate: '-300%' },
        '50%, 100%': { translate: '300%' },
      },
    },
    animation: {
      'blurry-move': 'blurry-move 2.5s ease-out infinite',
    },
  },
  plugins: [],
};
export default config;
