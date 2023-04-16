/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-mad3o": "#484848",
        "gray-mad3o": "#959494",
        "green-mad3o": "#60BA62",
        "border-mad3o": "#b1b1b5",
      },
    },
  },
  plugins: [],
};
