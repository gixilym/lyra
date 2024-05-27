/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      duo: ["iA Writer Duo", "system-ui"],
      sara: ["sarabun", "system-ui"],
    },
  },
  plugins: [],
};
