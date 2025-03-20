/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './Pages/**/*.{js,jsx}',
    './Components/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './Layout.js',
    './layout.js'
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#1E40AF',
          600: '#1E3A8A',
          700: '#1E3A8A'
        },
        gray: {
          50: '#F9FAFB',
          500: '#6B7280',
          800: '#1F2937'
        }
      }
    },
  },
  plugins: [],
}
