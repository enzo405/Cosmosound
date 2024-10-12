export default {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: {
      xsm: "460px",
    },
    extend: {
      fontFamily: {
        bs: ["BahnSchrift", "sans-serif"],
      },
      colors: {
        test: "var(--test)",
      },
    },
  },
  plugins: [],
};
