const plugin = require("tailwindcss/plugin");

export default {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: {
      xsm: "460px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        bs: ["BahnSchrift", "sans-serif"],
      },
      colors: {
        "music-player-border": "var(--color-music-player-border)",
        "music-player-bg": "var(--color-music-player-bg)",
        "music-hover": "var(--color-music-hover)",
        "music-activ": "var(--color-music-activ)",
        "label-music-verif": "var(--label-music-verif)",
        "dark-custom": "var(--color-dark)",
        "dark-glassy": "var(--color-darkglassy)",
        "grey-inactiv": "var(--color-grey-inactiv)",
        "box-bg": "var(--color-box-bg)",
        "soft-beige": "var(--color-soft-beige)",
        "soft-gray": "var(--color-soft-gray)",
        "body-bg": "var(--color-body-bg)",
        "sidebar-bg": "var(--color-sidebar-bg)",
        "sidebar-item-bg": "var(--color-sidebar-item-bg)",
        "sidebar-item-bg-hover": "var(--color-sidebar-item-bg-hover)",
        "sidebar-category-font": "var(--color-sidebar-category-font)",
        "primary-orange": "var(--color-primary-orange)",
        "secondary-orange": "var(--color-secondary-orange)",
        "tertio-orange": "var(--color-tertio-orange)",
        "white-orange": "var(--color-white-orange)",
        "searchbar-white": "var(--color-searchbar-white)",
        "settings-divider": "var(--color-settings-divider)",
        "dark-grey": "var(--color-dark-grey)",
        "music-player-artist": "var(--color-shadow-music-player)",
        "brown-music-player-dot": "var(--color-brown-music-player-dot)",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.4)",
        "music-player": "0 25px 60px 0px var(--color-shadow-music-player)",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "scroll-text": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        pop: "pop 0.3s ease-in-out",
      },
      animation: {
        "scroll-text": "scroll-text 7s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    plugin(function ({ addUtilities, theme, e }) {
      const sizes = theme("spacing");
      const newUtilities = Object.entries(sizes).reduce((acc, [key, value]) => {
        acc[`.min-size-${e(key)}`] = {
          minWidth: value,
          minHeight: value,
        };
        acc[`.max-size-${e(key)}`] = {
          maxWidth: value,
          maxHeight: value,
        };
        acc[`.mm-size-${e(key)}`] = {
          minWidth: value,
          minHeight: value,
          maxWidth: value,
          maxHeight: value,
          width: value,
          height: value,
        };
        return acc;
      }, {});

      addUtilities(newUtilities, ["responsive"]);
    }),
  ],
};
