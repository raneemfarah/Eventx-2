/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bgMove: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-50px, -50px)" },
        },
      },
      animation: {
        "bg-move": "bgMove 10s linear infinite",
      },
    },
  },
  plugins: [],
};
