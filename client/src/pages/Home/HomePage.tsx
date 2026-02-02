import { useEffect, useState, type ReactElement } from "react";
import Suggestions from "./components/Suggestions";
import CatalogService from "./../../services/catalogService";
import RecentMusic from "./components/RecentMusic";
import { DetailedCatalog } from "./../../models/Catalog";

function HomePage(): ReactElement {
  const [catalogs, setCatalogs] = useState<DetailedCatalog[]>([]);

  useEffect(() => {
    const fetchCatalogs = async () => {
      await CatalogService.getSuggestions().then((catalogs) => {
        setCatalogs(catalogs);
      });
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
