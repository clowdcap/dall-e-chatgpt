/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },

			// A cor esta sendo alterada e tbm pode ser criado outro com outro valor ou nome por exemplo
      colors: {
        gray: {
          900: "#121214"
        }
      }
    },
  },
  plugins: [],
}