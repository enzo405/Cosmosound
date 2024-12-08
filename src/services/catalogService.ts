import data from "assets/json/catalogs.json";
import { Catalog, CatalogWithMusic } from "models/Catalog";

const catalogData = data as CatalogWithMusic[];

function getAllCatalog(): CatalogWithMusic[] {
  return catalogData;
}

function getCatalogById(id?: string): CatalogWithMusic | undefined {
  if (!id) return undefined;
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

function deleteCatalog(catalog: Catalog): void {
  console.log("catalog", catalog);
}

const CatalogService = {
  getAllCatalog,
  getCatalogById,
  searchCatalogByTitle,
  deleteCatalog,
};

export default CatalogService;
