/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      duo: ["iA Writer Duo", "system-ui"],
      sara: ["sarabun", "system-ui"],
      cursive: ["cursive", "system-ui"],
      revert: ["revert", "system-ui"],
      serif: ["sans-serif", "system-ui"],
    },
  },
  plugins: [],
};
