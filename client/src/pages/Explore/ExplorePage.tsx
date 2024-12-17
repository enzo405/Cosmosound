import { useSearch } from "hooks/useSearch";
import { Catalog, TypeCatalog } from "models/Catalog";
import { Genre, MusicDetails } from "models/Music";
import { Playlist } from "models/Playlist";
import { Artist } from "models/User";
import { useEffect, useState, type ReactElement } from "react";
import FilterBox from "./components/FilterBox";
import MusicService from "services/musicService";
import ArtistService from "services/artistService";
import PlaylistService from "services/playlistService";
import CatalogService from "services/catalogService";
import Box from "components/box/Box";
import MusicItem from "components/music/MusicItem";
import ScrollableBox from "components/box/ScrollableBox";
import Card from "components/cards/Card";
import ArtistCard from "components/cards/ArtistCard";
import GenresService from "services/genresService";
import SmallCard from "components/cards/SmallCard";
import { routesConfig } from "config/app-config";
import UserService from "services/userService";
import { enqueueSnackbar } from "notistack";
import { useUser } from "hooks/useUser";

export enum Filters {
  ALL = "All",
  ARTISTS = "Artists",
  MUSICS = "Musics",
  PLAYLISTS = "Playlists",
  EPS_SINGLES = "EPs & Singles",
  ALBUMS = "Albums",
  GENRES = "Genres",
}

function ExplorePage(): ReactElement {
  const { search, debouncedValue } = useSearch();
  const { user } = useUser();

  const [activeFilter, setActiveFilter] = useState<Filters>(Filters.ALL);
  const [musics, setMusics] = useState<MusicDetails[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [albums, setAlbums] = useState<Catalog[]>([]);
  const [eps, setEps] = useState<Catalog[]>([]);
  const [singles, setSingles] = useState<Catalog[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO do better
        const [fetchedMusics, fetchedArtists, fetchedPlaylists, fetchedCatalogs, fetchedGenres] =
          await Promise.all([
            MusicService.searchMusicByTitle(search),
            ArtistService.searchArtistByName(search),
            PlaylistService.searchPlaylistByTitle(search),
            CatalogService.searchCatalogByTitle(search),
            GenresService.getGenreByName(search),
          ]);

        setMusics(fetchedMusics);
        setArtists(fetchedArtists);
        setPlaylists(fetchedPlaylists);
        setGenres(fetchedGenres.slice(0, 20));

        setAlbums(fetchedCatalogs.filter((c) => c.type === TypeCatalog.ALBUM));
        setEps(fetchedCatalogs.filter((c) => c.type === TypeCatalog.EP));
        setSingles(fetchedCatalogs.filter((c) => c.type === TypeCatalog.SINGLE));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [debouncedValue]);

  const onLikeGenre = (like: boolean, genre: Genre) => {
    if (like) {
      UserService.removeLike(genre);
      enqueueSnackbar(`${genre.name} removed from your favourite genres`, {
        variant: "success",
      });
    } else {
      UserService.like(genre);
      enqueueSnackbar(`${genre.name} added to your favourite genres`, {
        variant: "success",
      });
    }
  };

  const onLikeCatalog = (like: boolean, catalog: Catalog) => {
    if (like) {
      UserService.removeLike(catalog);
      enqueueSnackbar(`${catalog.title} removed from your favourite`, {
        variant: "success",
      });
    } else {
      UserService.like(catalog);
      enqueueSnackbar(`${catalog.title} added to your favourite`, {
        variant: "success",
      });
    }
  };

  const onLikePlaylist = (like: boolean, playlist: Playlist) => {
    if (like) {
      UserService.removeLike(playlist);
      enqueueSnackbar(`${playlist.title} removed from your favourite playlists`, {
        variant: "success",
      });
    } else {
      UserService.like(playlist);
      enqueueSnackbar(`${playlist.title} added to your favourite playlists`, {
        variant: "success",
      });
    }
  };

  const displayFilter = (f: Filters): boolean => {
    switch (f) {
      case Filters.ALBUMS:
        return albums.length !== 0;
      case Filters.ARTISTS:
        return artists.length !== 0;
      case Filters.MUSICS:
        return musics.length !== 0;
      case Filters.PLAYLISTS:
        return playlists.length !== 0;
      case Filters.EPS_SINGLES:
        return [...eps, ...singles].length !== 0;
      case Filters.GENRES:
        return genres.length !== 0;
      default:
        return true;
    }
  };

  const isPageEmpty =
    [...albums, ...artists, ...musics, ...genres, ...playlists, ...eps, ...singles].length === 0;

  return (
    <div className="flex flex-col gap-10 w-full">
      <FilterBox
        filters={Object.entries(Filters).filter(([_, f]) => displayFilter(f))}
        onFilterClick={(f) => setActiveFilter(f)}
        activeFilter={activeFilter}
      />
      {(activeFilter === Filters.ALL || activeFilter === Filters.ARTISTS) &&
        artists.length != 0 && (
          <ScrollableBox title="Artists">
            {artists.map((artist) => {
              return <ArtistCard key={artist.id} artist={artist} />;
            })}
          </ScrollableBox>
        )}
      {(activeFilter === Filters.ALL || activeFilter === Filters.MUSICS) && musics.length != 0 && (
        <Box
          title="Songs"
          className="flex-col"
          children={musics.map((m) => {
            return <MusicItem music={m} artist={m.artist} catalog={m.catalog} key={m.id} />;
          })}
        />
      )}
      <div className="flex flex-wrap w-full">
        {(activeFilter === Filters.ALL || activeFilter === Filters.ALBUMS) &&
          albums.length != 0 && (
            <div className="w-1/2 p-3">
              <ScrollableBox
                children={albums.map((catalog) => {
                  return (
                    <Card
                      key={catalog.id}
                      title={catalog.title}
                      description={`${TypeCatalog[catalog.type]} - ${catalog.owner.artistName}`}
                      link={`/catalog/${catalog.id}`}
                      thumbnail={catalog.thumbnail}
                      defaultLiked={user.likedCatalogs.find((id) => id == catalog.id) !== undefined}
                      onLike={(like) => onLikeCatalog(like, catalog)}
                    />
                  );
                })}
                title="Albums"
              />
            </div>
          )}
        {((activeFilter === Filters.ALL || activeFilter === Filters.EPS_SINGLES) &&
          [...singles, ...eps].length) != 0 && (
          <div className="w-1/2 p-3">
            <ScrollableBox
              children={[...singles, ...eps].map((catalog) => {
                return (
                  <Card
                    key={catalog.id}
                    title={catalog.title}
                    description={`${TypeCatalog[catalog.type]} - ${catalog.owner.artistName}`}
                    link={`/catalog/${catalog.id}`}
                    thumbnail={catalog.thumbnail}
                    defaultLiked={user.likedCatalogs.find((id) => id == catalog.id) !== undefined}
                    onLike={(like) => onLikeCatalog(like, catalog)}
                  />
                );
              })}
              title="EP/Single"
            />
          </div>
        )}
        {(activeFilter === Filters.ALL || activeFilter === Filters.PLAYLISTS) &&
          playlists.length != 0 && (
            <div className="w-1/2 p-3">
              <ScrollableBox
                children={playlists.map((playlist) => {
                  return (
                    <Card
                      key={playlist.id}
                      title={playlist.title}
                      description={`${playlist.title} - ${playlist.owner.name}`}
                      link={`/playlist/${playlist.id}`}
                      thumbnail={playlist.musics[0].playlistThumbnail}
                      defaultLiked={
                        user.likedPlaylists.find((id) => id == playlist.id) !== undefined
                      }
                      onLike={(like) => onLikePlaylist(like, playlist)}
                    />
                  );
                })}
                title="Playlists"
              />
            </div>
          )}
        {(activeFilter === Filters.ALL || activeFilter === Filters.GENRES) &&
          genres.length != 0 && (
            <div className="w-1/2 p-3">
              <Box title="Genres" className="flex-wrap">
                {genres.map((genre) => {
                  return (
                    <SmallCard
                      key={genre.name}
                      title={genre.name}
                      defaultLiked={
                        user.likedGenres.find((name) => name == genre.name) !== undefined
                      }
                      link={routesConfig.genres.getParameter(genre.name)}
                      onLike={(like) => onLikeGenre(like, genre)}
                    />
                  );
                })}
              </Box>
            </div>
          )}
        {isPageEmpty && (
          <>
            <h1>There's nothing here</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
