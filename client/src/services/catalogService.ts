import data from "assets/json/catalogs.json";
import { Catalog, CatalogWithMusic } from "models/Catalog";
import { CreateCatalogFormData } from "pages/CreateCatalog/CreateCatalogPage";
import { apiClient } from "./axiosService";

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

async function createCatalog(dataForm: Partial<CreateCatalogFormData>): Promise<CatalogWithMusic> {
  const formData = new FormData();

  dataForm.titleCatalog && formData.append("title", dataForm.titleCatalog);
  dataForm.thumbnailCatalog instanceof File &&
    formData.append("thumbnailFile", dataForm.thumbnailCatalog);
  typeof dataForm.thumbnailCatalog === "string" &&
    formData.append("defaultThumbnail", dataForm.thumbnailCatalog);

  if (dataForm.musics) {
    const genres: string[][] = [];
    const durations: number[] = [];
    dataForm.musics.forEach((music) => {
      formData.append("musics", music.file);
      genres.push(music.genres);
      durations.push(music.duration);
    });
    formData.append(`genres`, JSON.stringify(genres));
    formData.append(`durations`, JSON.stringify(durations));
  }

  return await apiClient.post("/api/catalog", formData).then((res) => res.data);
}

const CatalogService = {
  getAllCatalog,
  getCatalogById,
  searchCatalogByTitle,
  deleteCatalog,
  createCatalog,
};

export default CatalogService;
