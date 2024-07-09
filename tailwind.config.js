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
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
  },
  plugins: [],
};
