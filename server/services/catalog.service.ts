import ForbiddenException from "@/errors/ForbiddenException";
import NotFoundException from "@/errors/NotFoundException";
import { MusicDetails } from "@/models/MusicDetails";
import catalogRepository from "@/repository/catalog.repository";
import { Catalogs, Music, Prisma } from "@prisma/client";

const getCatalogById = async (id: string): Promise<Catalogs | null> => {
  return await catalogRepository.getCatalogById(id);
};

const createCatalog = async (data: Prisma.CatalogsCreateInput) => {
  return await catalogRepository.createCatalog(data);
};

const searchCatalog = async (value: string): Promise<Catalogs[]> => {
  return await catalogRepository.searchCatalog(value);
};

const deleteCatalog = async (idCatalog: string, userId: string): Promise<void> => {
  const catalog = await catalogRepository.getCatalogById(idCatalog);

  if (!catalog) {
    throw new NotFoundException(`Catalog with id ${idCatalog} not found`);
  }

  if (!userId || catalog.ownerId != userId) {
    throw new ForbiddenException("You are not allowed to delete a catalog you don't own");
  }

  return await catalogRepository.deleteCatalog(idCatalog);
};

const getMusicById = async (idCatalog: string, idMusic: string): Promise<Music | null> => {
  return await catalogRepository.getMusicById(idCatalog, idMusic);
};

const deleteMusic = async (userId: string | undefined, idCatalog: string, idMusic: string) => {
  const catalog = await catalogRepository.getCatalogById(idCatalog);

  if (!catalog) {
    throw new NotFoundException(`Catalog with id ${idCatalog} not found`);
  }

  if (!userId || catalog.ownerId != userId) {
    throw new ForbiddenException(
      "You are not allowed to delete a music from a catalog you don't own",
    );
  }

  return await catalogRepository.deleteMusic(catalog, idMusic);
};

const searchMusic = async (value: string): Promise<MusicDetails[]> => {
  return await catalogRepository.searchMusic(value);
};

export default {
  getCatalogById,
  createCatalog,
  deleteCatalog,
  deleteMusic,
  getMusicById,
  searchCatalog,
  searchMusic,
};
