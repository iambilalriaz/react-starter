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
        error: '#ea4335',
        base: 'dad9d9'
      },
      boxShadow: {
        '4xl': '0px 0px 34px rgba(0, 0, 0, 0.1)',
        bottom: '0px 0px 11px rgba(0, 0, 0, 0.06)'
      },
      borderRadius: {
        '1.5xl': '13px'
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    }
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require('daisyui')],
  server: {
    port: 8000
  },
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
    // eslint-disable-next-line no-dupe-keys
    themes: false,
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark'
  }
};
