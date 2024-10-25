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
        "music-player-border": "var(--color-music-player-border)",
        "soft-beige": "var(--color-soft-beige)",
        "body-bg": "var(--color-body-bg)",
        "sidebar-bg": "var(--color-sidebar-bg)",
        "sidebar-item-bg": "var(--color-sidebar-item-bg)",
        "sidebar-item-bg-hover": "var(--color-sidebar-item-bg-hover)",
        "sidebar-category-font": "var(--color-sidebar-category-font)",
        "primary-orange": "var(--color-primary)",
        "searchbar-white": "var(--color-searchbar-white)",
        "settings-divider": "var(--color-settings-divider)",
        "settings-text-grey": "var(--color-settings-text-grey)",
      },
      boxShadow: {
        "music-player": "0 19px 100px 0px var(--color-shadow-music-player)",
      },
    },
  },
  plugins: [],
};
