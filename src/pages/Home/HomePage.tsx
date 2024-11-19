import { type ReactElement } from "react";
import Suggestions from "./components/Suggestions";
import CatalogService from "services/catalogService";
import RecentMusic from "./components/RecentMusic";

function HomePage(): ReactElement {
  const catalogs = CatalogService.getAllCatalog();

  return (
    <div className="flex flex-col gap-10">
      <Suggestions catalogs={catalogs} />
      <RecentMusic />
    </div>
  );
}

export default HomePage;
