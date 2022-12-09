/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#aaaaaa',
        accent: '#708090',
        neutral: '#f5f5f5',
        'dark-gray': '#C6C9CF',
        info: '#199ee9',
        success: '#15CF74',
        warning: '#FBBD23',
        error: '#ea4335'
      },
      boxShadow: {
        '4xl': '0px 0px 34px rgba(0, 0, 0, 0.1)'
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    }
  },
  plugins: [require('daisyui')],
  // daisyUI config (optional)
  daisyui: {
    themes: [
      {
        suforiaLight: {
          primary: '#1a1a1a',
          secondary: '#aaaaaa',
          accent: '#708090',
          neutral: '#f5f5f5',
          info: '#199ee9',
          success: '#15CF74',
          warning: '#FBBD23',
          error: '#ea4335'
        }
      }
    ],
    themes: true,
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark'
  }
};
