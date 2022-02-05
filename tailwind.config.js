module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFF',
        black: '#000',
        transparent: 'transparent',
        primary: '#00CC89',
        light: '#64EB97',
        dark: '#4CD375',
        secondary: '#1A8C90',
        'btngradient-from': '#73f12f',
        'btngradient-to': '#3eb691',
      },
      screens: {
        xs: { max: '639px' },
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      backgroundImage: {
        'animatedbackground-overlay': "linear-gradient(#0f9fbd, #1726a2)",
      },
      spacing: {
        '340': '340px',
      },
    },
  },
  plugins: [],
};