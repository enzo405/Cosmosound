import { prisma } from "@/app";
import { Catalogs, Prisma } from "@prisma/client";

const getCatalogById = async (id: string): Promise<Catalogs | null> => {
  try {
    return await prisma.catalogs.findUnique({
      where: {
        id,
      },
    });
  } catch (e) {
    console.error("Error fetching catalog by id:", e);
    return null;
  }
};

const createCatalog = async (data: Prisma.CatalogsCreateInput): Promise<Catalogs> => {
  return await prisma.catalogs.create({
    data: data,
  });
};

const deleteCatalog = async (id: string): Promise<void> => {
  await prisma.catalogs.delete({
    where: {
      id: id,
    },
  });
};

const deleteMusic = async (idCatalog: string, idMusic: string): Promise<Catalogs | null> => {
  const catalog = await prisma.catalogs.findUnique({
    where: {
      id: idCatalog,
    },
  });

  if (!catalog) {
    return null;
  }

  const newMusics = catalog.musics.filter((m) => m.id !== idMusic);

  return await prisma.catalogs.update({
    where: {
      id: idCatalog,
    },
    data: {
      musics: { set: newMusics },
    },
  });
};

export default {
  getCatalogById,
  createCatalog,
  deleteCatalog,
  deleteMusic,
};
