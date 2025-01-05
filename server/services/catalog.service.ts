import catalogRepository from "@/repository/catalog.repository";
import { Catalogs, Prisma } from "@prisma/client";

const getCatalogById = async (id: string): Promise<Catalogs | null> => {
  return await catalogRepository.getCatalogById(id);
};

const createCatalog = async (data: Prisma.CatalogsCreateInput) => {
  return await catalogRepository.createCatalog(data);
};

const deleteCatalog = async (id: string) => {
  return await catalogRepository.deleteCatalog(id);
};

const deleteMusic = async (idCatalog: string, idMusic: string) => {
  return await catalogRepository.deleteMusic(idCatalog, idMusic);
};

export default {
  getCatalogById,
  createCatalog,
  deleteCatalog,
  deleteMusic,
};
