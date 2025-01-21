/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        integralCFBold: ["Integral CF Bold", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      colors: {
        primary: "#00000",
        grayBG: "#F0F0F0",
      },
      backgroundImage: {
        "lupe-icon": "url('/src/assets/Lupe.png')",
      },
    },
  },
  plugins: [],
};
