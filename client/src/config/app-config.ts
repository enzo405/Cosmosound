import { IconName } from "constants/iconName";

const APPLICATION_NAME = "CosmoSound";
const DEFAULT_PAGE_TITLE = "CosmoSound";

type RoutesConfig = Record<
  string,
  {
    path: string;
    getParameter: (...parameters: string[]) => string;
    title: string;
  }
>;

type RoutesSidebar = Record<
  string,
  {
    path: string;
    displayText: string;
    iconName: IconName;
    iconActiveName: IconName;
  }
>;

const routesConfig: RoutesConfig = {
  home: { path: "/", getParameter: (_) => "/", title: DEFAULT_PAGE_TITLE },
  account: { path: "/account", getParameter: (_) => "/account", title: "Account" },
  login: { path: "/login", getParameter: (_) => "/login", title: "Login" },
  register: { path: "/register", getParameter: (_) => "/register", title: "Register" },
  explore: { path: "/explore", getParameter: (_) => "/explore", title: "Explore" },
  library: { path: "/library", getParameter: (_) => "/library", title: "Library" },
  aboutUs: { path: "/about-us", getParameter: (_) => "/explore", title: "Explore" },
  artistPanel: {
    path: "/artist-panel",
    getParameter: (_) => "/artist-panel",
    title: "Artist Panel",
  },
  catalog: {
    path: "/catalog/:idCatalog",
    getParameter: (idCatalog: string) => `/catalog/${idCatalog}`,
    title: "Catalog",
  },
  playlist: {
    path: "/playlist/:idPlaylist",
    getParameter: (idPlaylist: string) => `/playlist/${idPlaylist}`,
    title: "Playlist",
  },
  genres: {
    path: "/genres/:nameGenre",
    getParameter: (nameGenre: string) => `/genres/${nameGenre}`,
    title: "Genre",
  },
  catalogEdit: {
    path: "/catalog/:idCatalog/edit",
    getParameter: (idCatalog: string) => `/catalog/${idCatalog}/edit`,
    title: "Edit Catalog",
  },
  artist: {
    path: "/artist/:idArtist",
    getParameter: (idArtist: string) => `/artist/${idArtist}`,
    title: "Artist",
  },
  createCatalog: {
    path: "/create-catalog",
    getParameter: (_) => "/create-catalog",
    title: "Create Music",
  },
  legal: { path: "/legal", getParameter: (_) => "/legal", title: "Legal Terms" },
  any: { path: "*", getParameter: (_) => "*", title: DEFAULT_PAGE_TITLE },
};

const routesSidebar: RoutesSidebar = {
  home: {
    path: "/",
    displayText: "Home",
    iconName: "homeIcon-black",
    iconActiveName: "homeIcon-orange",
  },
  library: {
    path: "/library",
    displayText: "Library",
    iconName: "heart-black",
    iconActiveName: "heart-orange",
  },
  explore: {
    path: "/explore",
    displayText: "Explore",
    iconName: "compass-black",
    iconActiveName: "compass-orange",
  },
};

const config = {
  appName: APPLICATION_NAME,
  appVersion: import.meta.env.VITE_VERSION ?? "?",
};

export { config, DEFAULT_PAGE_TITLE, routesConfig, routesSidebar };
