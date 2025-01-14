import { useEffect, useState, type ReactElement } from "react";
import Suggestions from "./components/Suggestions";
import CatalogService from "services/catalogService";
import RecentMusic from "./components/RecentMusic";
import { CatalogWithMusic } from "models/Catalog";

function HomePage(): ReactElement {
  const [catalogs, setCatalogs] = useState<CatalogWithMusic[]>([]);

  useEffect(() => {
    const fetchCatalogs = async () => {
      const catalogs = await CatalogService.searchCatalogByTitle("FIR");
      setCatalogs(catalogs);
    };

    fetchCatalogs();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <Suggestions catalogs={catalogs} />
      <RecentMusic />
    </div>
  );
}

export default HomePage;
