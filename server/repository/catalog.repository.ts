import { prisma } from "./app";
import DatabaseException from "./errors/DatabaseException";
import { Catalogs, Music, Prisma, Users } from ".prisma/client";
import playlistRepository from "./playlist.repository";
import { MusicDetails } from "./models/MusicDetails";

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
  } catch (err) {
    throw new DatabaseException("Error getting catalog", err);
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
  } catch (err) {
    throw new DatabaseException("Error creating catalog", err);
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
  } catch (err) {
    throw new DatabaseException("Error searching catalog", err);
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
  } catch (err) {
    throw new DatabaseException("Error deleting catalog", err);
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

    return catalog.musics.find((music) => music.id === idMusic) ?? null;
  } catch (err) {
    throw new DatabaseException("Error getting music", err);
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
  } catch (err) {
    throw new DatabaseException("Error deleting music", err);
  }
};

const searchMusic = async (value: string): Promise<MusicDetails[]> => {
  try {
    const catalogs = await prisma.catalogs.findMany({
      where: {
        OR: [{ musics: { some: { title: { contains: value, mode: "insensitive" } } } }],
      },
      take: 10,
      include: {
        owner: true,
      },
    });

    const musics: MusicDetails[] = [];
    catalogs.forEach((catalog) => {
      catalog.musics.forEach((music) => {
        if (music.title.toLowerCase().includes(value.toLowerCase())) {
          musics.push({
            id: music.id,
            title: music.title,
            url: music.url,
            genres: music.genres,
            duration: music.duration,
            createdAt: music.createdAt,
            catalog: catalog,
            artist: catalog.owner,
          });
        }
      });
    });

    return musics;
  } catch (err) {
    throw new DatabaseException("Error searching music", err);
  }
};

const getFavouritesCatalogs = async (user: Users): Promise<Catalogs[]> => {
  try {
    return await prisma.catalogs.findMany({
      where: {
        id: { in: user.likedCatalogs },
      },
      include: {
        owner: true,
      },
    });
  } catch (err) {
    throw new DatabaseException("Error fetching liked catalogs", err);
  }
};

const getCatalogSuggestions = async (user: Users): Promise<Catalogs[]> => {
  try {
    const searchingGenre = user.likedGenres;

    return await prisma.catalogs.findMany({
      include: {
        owner: true,
      },
      where: {
        OR: [
          { musics: { some: { genres: { hasSome: searchingGenre } } } },
          { owner: { genre: { in: searchingGenre } } },
        ],
      },
      distinct: ["id"],
      take: 15,
    });
  } catch (err) {
    throw new DatabaseException("Error fetching catalog suggestions", err);
  }
};

export default {
  getCatalogById,
  createCatalog,
  deleteCatalog,
  getMusicById,
  deleteMusic,
  searchCatalog,
  searchMusic,
  getFavouritesCatalogs,
  getCatalogSuggestions,
};
