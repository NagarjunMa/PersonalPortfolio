/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
            // Add these lines to use your imported fonts
            raleway: ['var(--font-raleway)', 'sans-serif'],
            montserrat: ['var(--font-montserrat)', 'sans-serif'],
            geist: ['var(--font-geist-sans)', 'sans-serif'],
            fraunces: ['var(--font-fraunces)', 'serif'],
            'geist-mono': ['var(--font-geist-mono)', 'monospace'],
            monoton: ['var(--font-monoton)', 'cursive'],
          },
        colors : {
            primary : '#00ADF4',
            background : '#081C29',
        },
        textShadow: {
            glow: '0 0px 20px rgba(255,255, 255, 0.35), 0 0px 65px rgba(255, 255,255, 0.2)',
        },
      },
    },
    plugins: [],
  }