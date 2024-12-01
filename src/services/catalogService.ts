import data from "assets/json/catalogs.json";
import { CatalogWithMusic } from "models/Catalog";

const catalogData = data as CatalogWithMusic[];

function getAllCatalog(): CatalogWithMusic[] {
  return catalogData;
}

function getCatalogById(id: string): CatalogWithMusic | undefined {
  return catalogData.find((music) => music.id === id);
}

const CatalogService = {
  getAllCatalog,
  getCatalogById,
};

export default CatalogService;
