import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';
import tailwindScrollbar from 'tailwind-scrollbar';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '385px',
      sm: '640px',
      md: '768px',
      lg: '1028px',
      xl: '1280px',
      '2xl': '1536px',
    },
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
            100: '#749ea8',
            200: '#2D6F7F',
            300: '#436DA1',
            400: '#2D607B',
            500: '#1d475e',
            700: '#0F223A',
            DEFAULT: '#1d475e',
          },
          game: {
            500: '#64EB97',
            550: '#56dd83',
            600: '#4CD375',
            700: '#39B97E',
            800: '#52C074',
            850: '#44B47F',
            900: '#288345',
            950: '#43A277',
            DEFAULT: '#64EB97',
          },
          home: '#0f235e',
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
        height: {
          '0%': { height: '0' },
          '200%': { height: 'auto' },
        },
      },
      animation: {
        'blurry-move': 'blurry-move 2.5s ease-out infinite',
        height: 'height 2s ease-out',
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
