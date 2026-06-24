/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm2': '700px', // breakpoint מותאם אישית ב־900px
        '3xl': '1445px',
        'md2': '1030px',
      },
    },
  },
  plugins: [],
}