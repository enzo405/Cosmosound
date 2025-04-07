import { Catalog, DetailedCatalog } from "./../models/Catalog";
import { CreateCatalogFormData } from "./../pages/CreateCatalog/CreateCatalogPage";
import { apiClient } from "./axiosService";

async function getArtistCatalogs(artistId: string): Promise<DetailedCatalog[]> {
  return await apiClient.get(`/catalogs/artist/${artistId}`).then((res) => res.data);
}

async function getCatalogById(id?: string): Promise<DetailedCatalog | undefined> {
  return await apiClient.get(`/catalogs/${id}`).then((res) => res.data);
}

async function searchCatalogByTitle(value: string): Promise<DetailedCatalog[]> {
  if (value == "") {
    return [];
  }
  return await apiClient
    .get(`/catalogs?search=${value.toLowerCase().trim()}`)
    .then((res) => res.data);
}

async function deleteCatalog(catalog: Catalog): Promise<void> {
  return await apiClient.delete(`/catalogs/${catalog.id}`).then((res) => res.data.message);
}

async function createCatalog(dataForm: Partial<CreateCatalogFormData>): Promise<DetailedCatalog> {
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

  return await apiClient.post("/catalogs", formData).then((res) => res.data);
}

async function getSuggestions(): Promise<DetailedCatalog[]> {
  return await apiClient.get("/me/suggestions").then((res) => res.data);
}

const CatalogService = {
  getArtistCatalogs,
  getCatalogById,
  searchCatalogByTitle,
  deleteCatalog,
  createCatalog,
  getSuggestions,
};

export default CatalogService;
