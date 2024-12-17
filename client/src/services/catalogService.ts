import data from "assets/json/catalogs.json";
import { Catalog, CatalogWithMusic } from "models/Catalog";
import { CreateCatalogFormData } from "pages/CreateCatalog/CreateCatalogPage";

const catalogData = data as CatalogWithMusic[];

function getAllCatalog(): CatalogWithMusic[] {
  return catalogData;
}

function getCatalogById(id?: string): CatalogWithMusic | undefined {
  if (!id) return undefined;
  return catalogData.find((music) => music.id == id);
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
  console.log("catalog delete", catalog);
}

function createCatalog(catalog: CreateCatalogFormData): void {
  console.log("catalog create", catalog);
}

const CatalogService = {
  getAllCatalog,
  getCatalogById,
  searchCatalogByTitle,
  deleteCatalog,
  createCatalog,
};

export default CatalogService;
