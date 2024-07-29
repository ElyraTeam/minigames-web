import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';
import tailwindScrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        word: {
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
          side: {
            200: '#2D6F7F',
            300: '#436DA1',
            400: '#2D607B',
            500: '#1d475e',
            700: '#0F223A',
            DEFAULT: '#1d475e',
          },
          game: {
            500: '#64EB97',
            600: '#4CD375',
            700: '#39B97E',
            800: '#52C074',
            900: '#288345',
            950: '#43A277',
            DEFAULT: '#64EB97',
          },
        },
        danger: '#FF0000',
        warning: '#FFCC00',
        'teamgradient-from': '#aa69cb',
        'teamgradient-to': '#95aff3',
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
  },
  plugins: [
    tailwindScrollbar({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
    tailwindAnimate,
  ],
};
export default config;
