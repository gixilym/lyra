/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sarabun: ["sarabun", "system-ui"],
      duo: ["iA Writer Duo", "system-ui"],
    },
  },
  plugins: [],
};
