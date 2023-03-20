/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      container: {
        // you can configure the container to be centered
        center: true,

        // or have default horizontal padding
        padding: '0px',

        // default breakpoints but with 40px removed
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1170px',
          '2xl': '1496px'
        }
      },
      colors: {
        main: '#ef8931',
        second: '#AAAAAA',
        third: '#202020',
        default: '#131313',
        success: '#299C00',
        gray: '#818181',
        black2: '#2B2B2B',
        black3: '#404040',
        input2: '#f2f2f2'
      }
    }
  },
  plugins: []
}
