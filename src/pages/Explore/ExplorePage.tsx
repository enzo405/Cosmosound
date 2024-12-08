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

  return (
    <div className="flex flex-col gap-10 w-full">
      <FilterBox onFilterClick={(f) => setActiveFilter(f)} activeFilter={activeFilter} />
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
                      description={`${TypeCatalog[catalog.type]} - ${catalog.owner.artist_name}`}
                      link={`/catalog/${catalog.id}`}
                      thumbnail={catalog.thumbnail}
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
                    description={`${TypeCatalog[catalog.type]} - ${catalog.owner.artist_name}`}
                    link={`/catalog/${catalog.id}`}
                    thumbnail={catalog.thumbnail}
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
                      thumbnail={playlist.musics[0].catalog.thumbnail}
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
                      link={routesConfig.genres.getParameter(genre.name)}
                    />
                  );
                })}
              </Box>
            </div>
          )}
      </div>
    </div>
  );
}

export default ExplorePage;
