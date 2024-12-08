import data from "assets/json/catalogs.json";
import { Catalog, CatalogWithMusic } from "models/Catalog";

const catalogData = data as CatalogWithMusic[];

function getAllCatalog(): CatalogWithMusic[] {
  return catalogData;
}

function getCatalogById(id: string): CatalogWithMusic | undefined {
  return catalogData.find((music) => music.id === id);
}

function searchCatalogByTitle(value: string): Catalog[] {
  if (value == "") {
    return [];
  }

  const searchTerm = value.toLowerCase().trim();

  const catalogsTitleMatch = catalogData
    .filter((catalog) => catalog.title.toLowerCase().includes(searchTerm))
    .slice(0, 10);

  return [...new Set(catalogsTitleMatch)];
}

const CatalogService = {
  getAllCatalog,
  getCatalogById,
  searchCatalogByTitle,
};

export default CatalogService;
