import { Artist, DetailedArtistInfo } from "models/User";
import { apiClient } from "./axiosService";

async function getArtistById(id: string | undefined): Promise<DetailedArtistInfo | undefined> {
  if (id == undefined) return undefined;

  return await apiClient.get(`/api/artists/${id}`).then((res) => res.data);
}

async function searchArtistByName(value: string): Promise<Artist[]> {
  if (value == "") {
    return [];
  }

  return await apiClient
    .get(`/api/artists?search=${value.toLowerCase().trim()}`)
    .then((res) => res.data);
}

const ArtistService = {
  searchArtistByName,
  getArtistById,
};

export default ArtistService;
