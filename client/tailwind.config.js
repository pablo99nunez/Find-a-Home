/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: "#3A302E",
        pink: "#AB4E68",
        grey: {
          100: "#D9D9D9",
          300: "#ACACAC",
          800: "#717171",
        },
        yellow: "#FFC733",
      },
      fontFamily: {
        sans: ["RobotoL", ...defaultTheme.fontFamily.sans],
      },
    },
    fontFamily: {
      roboto: ["Roboto"],
    },
    backgroundImage: {
      google: "url('/images/Google.svg)",
    },
  },
  plugins: [],
};
