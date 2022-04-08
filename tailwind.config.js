module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'app-white': '#FAFAFA',
        'app-text-default': '#C1D1E8',
        'app-bg1': ' #081221',
        'app-bg2': '#03080F',
        'app-card-bg': '#0E1A2B',
        'app-input-bg': '#182C47',
        'app-btn-default': '#5692E8'
      },
      fontFamily: {
        heading: ['Montserrat'],
        body: ['Mulish']
      }
    }
  },
  plugins: []
}
