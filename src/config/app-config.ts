/* eslint-disable @typescript-eslint/no-unused-vars */
const APPLICATION_NAME = "CosmoSound";
const DEFAULT_PAGE_TITLE = "CosmoSound";

type RoutesConfig = Record<
  string,
  {
    path: string;
    getParameterPath: (...parameters: Array<string>) => string;
    title: string;
    diplaySidebar: boolean;
  }
>;

const routesConfig: RoutesConfig = {
  home: { path: "/", getParameterPath: (_) => "/", title: DEFAULT_PAGE_TITLE, diplaySidebar: true },
  account: {
    path: "/account",
    getParameterPath: (_) => "/account",
    title: "Account",
    diplaySidebar: true,
  },
  login: {
    path: "/login",
    getParameterPath: (_) => "/login",
    title: "Login",
    diplaySidebar: false,
  },
  register: {
    path: "/register",
    getParameterPath: (_) => "/register",
    title: "Register",
    diplaySidebar: false,
  },
  feed: { path: "/feed", getParameterPath: (_) => "/feed", title: "Feed", diplaySidebar: true },
  search: {
    path: "/search",
    getParameterPath: (_) => "/search",
    title: "Search",
    diplaySidebar: true,
  },
  any: { path: "*", getParameterPath: (_) => "*", title: DEFAULT_PAGE_TITLE, diplaySidebar: false },
};

const config = {
  appName: APPLICATION_NAME,
  appVersion: import.meta.env.VITE_VERSION ?? "?",
};

export { config, DEFAULT_PAGE_TITLE, routesConfig };
