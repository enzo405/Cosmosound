import { prisma } from "@/app";
import DatabaseException from "@/errors/DatabaseException";
import { MusicDetails } from "@/models/MusicDetails";

const getGenreContent = async (genreName: string, skip: string, take: string) => {
  try {
    const musics = await searchMusicByGenre(genreName, parseInt(skip), parseInt(take));
    const musicIds = musics.map((m) => m.id);

    const catalogsPromise = prisma.catalogs.findMany({
      where: { musics: { some: { id: { in: musicIds } } } },
      include: { owner: true },
    });

    const playlistsPromise = prisma.playlists.findMany({
      where: { musics: { some: { id: { in: musicIds } } } },
      include: { owner: true },
    });

    const artists = await prisma.users.findMany({
      where: { genre: genreName },
      include: {},
    });

    return {
      musics,
      catalogs: await catalogsPromise,
      playlists: await playlistsPromise,
      artists,
    };
  } catch (err) {
    throw new DatabaseException("Error fetching genre content", err);
  }
};

const searchMusicByGenre = async (
  genreName: string,
  skip: number,
  take: number
): Promise<MusicDetails[]> => {
  const catalogs = await prisma.catalogs.findMany({
    where: { musics: { some: { genres: { hasSome: [genreName] } } } },
    take,
    skip,
    distinct: ["id"],
    include: { owner: true },
  });

  const musics: MusicDetails[] = [];
  catalogs.forEach((catalog) => {
    catalog.musics.forEach((music) => {
      if (music.genres.some((g) => g === genreName)) {
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
};

export default {
  getGenreContent,
};
