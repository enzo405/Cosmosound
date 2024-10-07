import { IconType } from "react-icons";
import { FaHouse, FaUser, FaMusic, FaMagnifyingGlass } from "react-icons/fa6";

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
  }
>;

const routesConfig: RoutesConfig = {
  home: { path: "/", getParameterPath: (_) => "/", title: DEFAULT_PAGE_TITLE },
  account: { path: "/account", getParameterPath: (_) => "/account", title: "Account" },
  login: { path: "/login", getParameterPath: (_) => "/login", title: "Login" },
  register: { path: "/register", getParameterPath: (_) => "/register", title: "Register" },
  feed: { path: "/feed", getParameterPath: (_) => "/feed", title: "Feed" },
  search: { path: "/search", getParameterPath: (_) => "/search", title: "Search" },
  any: { path: "*", getParameterPath: (_) => "*", title: DEFAULT_PAGE_TITLE },
};

const routesSidebar: RoutesSidebar = {
  home: { path: "/", displayText: "Home", icon: FaHouse },
  account: { path: "/account", displayText: "Account", icon: FaUser },
  feed: { path: "/feed", displayText: "Feed", icon: FaMusic },
  search: { path: "/search", displayText: "Search", icon: FaMagnifyingGlass },
};

const config = {
  appName: APPLICATION_NAME,
  appVersion: import.meta.env.VITE_VERSION ?? "?",
};

export { config, DEFAULT_PAGE_TITLE, routesConfig, routesSidebar };
