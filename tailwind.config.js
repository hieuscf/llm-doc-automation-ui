/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
  keyframes: {
    fadeIn: {
      "0%": { opacity: 0, transform: "translateY(-5px)" },
      "100%": { opacity: 1, transform: "translateY(0)" },
    },
    slideUp: {
      "0%": { transform: "translateY(30px)", opacity: 0 },
      "100%": { transform: "translateY(0)", opacity: 1 },
    },
  },
  animation: {
    fadeIn: "fadeIn 0.2s ease-out",
    slideUp: "slideUp 0.4s ease-out",
  },
},
  },
  plugins: [],
};
