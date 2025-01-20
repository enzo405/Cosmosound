import { prisma } from "@/app";
import DatabaseException from "@/errors/DatabaseException";
import { Catalogs, Music, Prisma } from "@prisma/client";
import playlistRepository from "./playlist.repository";

const getCatalogById = async (id: string): Promise<Catalogs | null> => {
  try {
    return await prisma.catalogs.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
      },
    });
  } catch (e) {
    return null;
  }
};

const createCatalog = async (data: Prisma.CatalogsCreateInput): Promise<Catalogs> => {
  try {
    return await prisma.catalogs.create({
      data: data,
      include: {
        owner: true,
      },
    });
  } catch (e) {
    throw new DatabaseException("Error creating catalog", e);
  }
};

const searchCatalog = async (value: string): Promise<Catalogs[]> => {
  try {
    return prisma.catalogs.findMany({
      where: {
        OR: [
          { title: { contains: value, mode: "insensitive" } },
          { owner: { artistName: { contains: value, mode: "insensitive" } } },
        ],
      },
      include: {
        owner: true,
      },
      distinct: ["id"],
      take: 10,
    });
  } catch (e) {
    throw new DatabaseException("Error searching catalog", e);
  }
};

const deleteCatalog = async (id: string): Promise<void> => {
  try {
    const catalog = await prisma.catalogs.findUnique({
      where: {
        id: id,
      },
    });

    catalog?.musics.forEach((music) => {
      playlistRepository.deleteDenormalizedMusic(catalog.id, music.id);
    });

    await prisma.catalogs.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    throw new DatabaseException("Error deleting catalog", e);
  }
};

const getMusicById = async (idCatalog: string, idMusic: string): Promise<Music | null> => {
  try {
    const catalog = await prisma.catalogs.findFirst({
      where: {
        id: idCatalog,
        musics: {
          some: {
            id: idMusic,
          },
        },
      },
    });
    if (!catalog) return null;

    return catalog.musics[0] ?? null;
  } catch (e) {
    console.error("e", e);
    return null;
  }
};

const deleteMusic = async (catalog: Catalogs, idMusic: string): Promise<Catalogs> => {
  const newMusics = catalog.musics.filter((m) => m.id !== idMusic);

  try {
    playlistRepository.deleteDenormalizedMusic(catalog.id, idMusic);
    return await prisma.catalogs.update({
      where: {
        id: catalog.id,
      },
      data: {
        musics: { set: newMusics },
      },
      include: {
        owner: true,
      },
    });
  } catch (e) {
    throw new DatabaseException("Error deleting music", e);
  }
};

export default {
  getCatalogById,
  createCatalog,
  deleteCatalog,
  getMusicById,
  deleteMusic,
  searchCatalog,
};
