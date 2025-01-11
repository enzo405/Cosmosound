import data from "assets/json/catalogs.json";
import { Catalog, CatalogWithMusic } from "models/Catalog";
import { CreateCatalogFormData } from "pages/CreateCatalog/CreateCatalogPage";
import { apiClient } from "./axiosService";

const catalogData = data as CatalogWithMusic[];

function getAllCatalog(): CatalogWithMusic[] {
  return catalogData;
}

async function getCatalogById(id?: string): Promise<CatalogWithMusic | undefined> {
  return await apiClient.get(`/api/catalogs/${id}`).then((res) => res.data);
}

async function searchCatalogByTitle(value: string): Promise<Catalog[]> {
  if (value == "") {
    return [];
  }
  return await apiClient
    .get(`/api/catalogs?search=${value.toLowerCase().trim()}`)
    .then((res) => res.data);
}

async function deleteCatalog(catalog: Catalog): Promise<void> {
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

  return await apiClient.post("/api/catalogs", formData).then((res) => res.data);
}

const CatalogService = {
  getAllCatalog,
  getCatalogById,
  searchCatalogByTitle,
  deleteCatalog,
  createCatalog,
};

export default CatalogService;
