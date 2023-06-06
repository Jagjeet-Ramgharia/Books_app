/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,html}",
    "./pages/**/*.{js,ts,jsx,tsx,,html}",
    "./components/**/*.{js,ts,jsx,tsx,,html}",
    "./src/**/*.{js,ts,jsx,tsx,,html}",
  ],
  theme: {
    extend: {
      screens:{
        "3xl":{min:"1920px"},
      }
    },
  },
  plugins: [],
};
