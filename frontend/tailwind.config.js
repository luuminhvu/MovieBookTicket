/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{jsx,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'bg-auth': "url('/assets/images/background-auth.jpg')"
      }
    },
  },
  plugins: [],
}

