import { IconType } from "react-icons";
import { FaHouse, FaMusic, FaMagnifyingGlass } from "react-icons/fa6";

/* eslint-disable @typescript-eslint/no-unused-vars */
const APPLICATION_NAME = "CosmoSound";
const DEFAULT_PAGE_TITLE = "CosmoSound";

type RoutesConfig = Record<
  string,
  {
    path: string;
    getParameterPath: (...parameters: Array<string>) => string;
    title: string;
  }
>;

type RoutesSidebar = Record<
  string,
  {
    path: string;
    displayText: string;
    icon: IconType;
    iconActiv: IconType;
  }
>;

const routesConfig: RoutesConfig = {
  home: { path: "/", getParameterPath: (_) => "/", title: DEFAULT_PAGE_TITLE },
  account: { path: "/account", getParameterPath: (_) => "/account", title: "Account" },
  login: { path: "/login", getParameterPath: (_) => "/login", title: "Login" },
  logout: { path: "/logout", getParameterPath: (_) => "/logout", title: "Logout" },
  register: { path: "/register", getParameterPath: (_) => "/register", title: "Register" },
  explore: { path: "/explore", getParameterPath: (_) => "/explore", title: "Explore" },
  library: { path: "/library", getParameterPath: (_) => "/library", title: "Library" },
  aboutUs: { path: "/about-us", getParameterPath: (_) => "/explore", title: "Explore" },
  any: { path: "*", getParameterPath: (_) => "*", title: DEFAULT_PAGE_TITLE },
};

const routesSidebar: RoutesSidebar = {
  home: { path: "/", displayText: "Home", icon: FaHouse, iconActiv: FaHouse },
  library: { path: "/library", displayText: "library", icon: FaMusic, iconActiv: FaMusic },
  explore: {
    path: "/explore",
    displayText: "Explore",
    icon: FaMagnifyingGlass,
    iconActiv: FaMagnifyingGlass,
  },
};

const config = {
  appName: APPLICATION_NAME,
  appVersion: import.meta.env.VITE_VERSION ?? "?",
};

export { config, DEFAULT_PAGE_TITLE, routesConfig, routesSidebar };
