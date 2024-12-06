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
  const searchTerm = value.toLowerCase().trim();
  const MAX_RESULTS = 10;

  const catalogsTitleMatch = catalogData
    .filter((catalog) => {
      return catalog.title.toLowerCase().includes(searchTerm);
    })
    .slice(0, MAX_RESULTS);

  if (catalogsTitleMatch.length > MAX_RESULTS) return catalogsTitleMatch;

  const catalogsMusicNameMatch = catalogData.filter((catalog) => {
    return catalog.musics.some((music) => music.title.toLowerCase().includes(searchTerm));
  });

  const combinedMatches = [...catalogsTitleMatch, ...catalogsMusicNameMatch].slice(0, MAX_RESULTS);

  if (combinedMatches.length > MAX_RESULTS) return combinedMatches;

  const catalogsOwnerMatches = catalogData.filter((catalog) => {
    return (catalog.owner.artist_name.toLowerCase() || catalog.owner.name.toLowerCase()).includes(
      searchTerm,
    );
  });

  return [...catalogsOwnerMatches, ...combinedMatches].slice(0, MAX_RESULTS);
}

const CatalogService = {
  getAllCatalog,
  getCatalogById,
  searchCatalogByTitle,
};

export default CatalogService;
