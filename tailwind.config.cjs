/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
				sans: ['Space Mono', 'system-ui'],
			},
			// backgroundImage: {
			// 	hero: "url('/src/assets/hero.png')",
			// },
      
    },
  },
  plugins: [],
}
