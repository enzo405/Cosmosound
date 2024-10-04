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

const routesConfig: RoutesConfig = {
  home: { path: "/", getParameterPath: (_) => "/", title: DEFAULT_PAGE_TITLE },
  any: { path: "*", getParameterPath: (_) => "*", title: DEFAULT_PAGE_TITLE },
};

const config = {
  basename: import.meta.env.PUBLIC_PATH,
  isBrowser: typeof window !== "undefined",
  appName: APPLICATION_NAME,
  appVersion: import.meta.env.VITE_VERSION ?? "?",
};

export { config, DEFAULT_PAGE_TITLE, routesConfig };
