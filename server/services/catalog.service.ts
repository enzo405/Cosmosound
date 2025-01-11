import ForbiddenException from "@/errors/ForbiddenException";
import NotFoundException from "@/errors/NotFoundException";
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

const deleteCatalog = async (id: string): Promise<void> => {
  return await catalogRepository.deleteCatalog(id);
};

const getMusicById = async (idCatalog: string, idMusic: string): Promise<Music | null> => {
  return await catalogRepository.getMusicById(idCatalog, idMusic);
};

const deleteMusic = async (userId: string | undefined, idCatalog: string, idMusic: string) => {
  const catalog = await catalogRepository.getCatalogById(idCatalog);

  if (!catalog) {
    throw new NotFoundException(`Catalog with id ${idCatalog} doesn't exist`);
  }

  if (!userId || catalog.ownerId != userId) {
    throw new ForbiddenException("You are not allowed to delete a catalog you don't own");
  }

  return await catalogRepository.deleteMusic(catalog, idMusic);
};

export default {
  getCatalogById,
  createCatalog,
  deleteCatalog,
  deleteMusic,
  getMusicById,
  searchCatalog,
};
