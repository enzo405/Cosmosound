import { routesConfig } from "./../config/app-config";
import { RouteObject } from "react-router-dom";
import HomePage from "./../pages/Home/HomePage";
import NotFoundErrorPage from "./../pages/errors/NotFoundErrorPage";
import AccountPage from "./../pages/Account/AccountPage";
import LibraryPage from "./../pages/Library/LibraryPage";
import ExplorePage from "./../pages/Explore/ExplorePage";
import AboutUsPage from "./../pages/AboutUs/AboutUsPage";
import LegalPage from "./../pages/Legal/LegalPage";
import ArtistPage from "./../pages/Artist/ArtistPage";
import CatalogEditPage from "./../pages/Catalog/CatalogEditPage";
import GenresPage from "./../pages/Genres/GenresPage";
import PlaylistPage from "./../pages/Playlist/PlaylistPage";
import CatalogPage from "./../pages/Catalog/CatalogPage";
import ArtistPanelPage from "./../pages/ArtistPanel/ArtistPanelPage";
import CreateCatalog from "./../pages/CreateCatalog/CreateCatalogPage";
import RegisterPage from "./../pages/Register/RegisterPage";
import LoginPage from "./../pages/Login/LoginPage";

const authenticatedRoutes: RouteObject[] = [
  { path: routesConfig.home.path, element: <HomePage /> },
  { path: routesConfig.account.path, element: <AccountPage /> },
  { path: routesConfig.explore.path, element: <ExplorePage /> },
  { path: routesConfig.library.path, element: <LibraryPage /> },
  { path: routesConfig.aboutUs.path, element: <AboutUsPage /> },
  { path: routesConfig.artistPanel.path, element: <ArtistPanelPage /> },
  { path: routesConfig.catalog.path, element: <CatalogPage /> },
  { path: routesConfig.playlist.path, element: <PlaylistPage /> },
  { path: routesConfig.genres.path, element: <GenresPage /> },
  { path: routesConfig.catalogEdit.path, element: <CatalogEditPage /> },
  { path: routesConfig.artist.path, element: <ArtistPage /> },
  { path: routesConfig.legal.path, element: <LegalPage /> },
  { path: routesConfig.createCatalog.path, element: <CreateCatalog /> },
  { path: routesConfig.any.path, element: <NotFoundErrorPage /> },
];

const unauthenticatedRoutes: RouteObject[] = [
  { path: routesConfig.home.path, element: <AboutUsPage isAuthenticated={false} /> },
  { path: routesConfig.register.path, element: <RegisterPage /> },
  { path: routesConfig.login.path, element: <LoginPage /> },
  { path: routesConfig.legal.path, element: <LegalPage isAuthenticated={false} /> },
  { path: routesConfig.any.path, element: <NotFoundErrorPage /> },
];

export { unauthenticatedRoutes, authenticatedRoutes };
