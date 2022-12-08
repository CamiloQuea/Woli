/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "475px",
      mdlg: "920px",
      tall: { raw: "(min-height: 800px)" },
      tallmedium: { raw: "(min-height: 600px)" },
      low: { raw: "(min-height: 300px)" },
      ...defaultTheme.screens,
    },
    extend: {
      scale: {
        flip: "-1",
      },
      fontFamily: {
        main: ["Noto Sans JP", "sans-serif"],
      },
      animation: {
        "spin-fast": "ease-in-out spin 1s infinite",
        "spin-slow": "ease-in-out spin 4s infinite",
      },
    },
  },
  plugins: [],
};
