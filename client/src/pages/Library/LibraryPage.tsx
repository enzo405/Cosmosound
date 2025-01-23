import Box from "components/box/Box";
import ScrollableBox from "components/box/ScrollableBox";
import ArtistCard from "components/cards/ArtistCard";
import Card from "components/cards/Card";
import SmallCard from "components/cards/SmallCard";
import Loading from "components/Loading";
import { routesConfig } from "config/app-config";
import { useUser } from "hooks/useUser";
import { Catalog } from "models/Catalog";
import { Playlist } from "models/Playlist";
import { Favourites } from "models/User";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState, type ReactElement } from "react";
import GenresService from "services/genresService";
import UserService from "services/userService";
import { displayPictureProfile } from "utils/user";

function LibraryPage(): ReactElement {
  const { user, toggleLike } = useUser();
  const [loading, setLoading] = useState(true);
  const [favContent, setFavContent] = useState<Favourites>();
  const [favGenres, setFavGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchMyArtists = async () => {
      setLoading(true);
      await UserService.getPrefered()
        .then((favContent) => {
          setFavContent(favContent);
          const myGenres = user ? GenresService.getMyFavouriteGenres(user) : [];
          setFavGenres(myGenres);
        })
        .catch(() => {
          enqueueSnackbar("Failed to fetch your favourite artists", {
            variant: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMyArtists();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const onLikeGenre = async (like: boolean, genre: string): Promise<boolean> => {
    return await UserService.toggleLike(genre, "genre")
      .then(() => {
        toggleLike(genre, "genre");
        if (like) {
          enqueueSnackbar(`${genre} removed from your favourite genres`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`${genre} added to your favourite genres`, {
            variant: "success",
          });
        }
        return true;
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.error, {
          variant: "error",
        });
        return false;
      });
  };

  const onLikePlaylist = async (like: boolean, playlist: Playlist): Promise<boolean> => {
    return await UserService.toggleLike(playlist.id, "playlist")
      .then(() => {
        toggleLike(playlist.id, "playlist");
        if (like) {
          enqueueSnackbar(`${playlist.title} removed from your favourite playlist`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`${playlist.title} added to your favourite playlist `, {
            variant: "success",
          });
        }
        return true;
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.error, {
          variant: "error",
        });
        return false;
      });
  };

  const onLikeCatalog = async (like: boolean, catalog: Catalog): Promise<boolean> => {
    return await UserService.toggleLike(catalog.id, "album")
      .then(() => {
        toggleLike(catalog.id, "album");
        if (like) {
          enqueueSnackbar(`${catalog.title} removed from your favourite`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`${catalog.title} added to your favourite `, {
            variant: "success",
          });
        }
        return true;
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.error, {
          variant: "error",
        });
        return false;
      });
  };

  return (
    <div className="flex flex-col gap-10">
      {favContent?.likedArtists.length !== 0 && (
        <ScrollableBox title="Favourite Artists">
          {favContent?.likedArtists.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />;
          })}
        </ScrollableBox>
      )}
      {favContent?.likedPlaylists.length !== 0 && (
        <ScrollableBox title="Liked Playlist">
          {favContent?.likedPlaylists.map((playlist) => {
            return (
              <Card
                key={playlist.id}
                description={playlist?.owner?.name}
                thumbnail={playlist.playlistThumbnail}
                title={playlist.title}
                link={routesConfig.playlist.getParameter(playlist.id)}
                defaultLiked={user?.likedPlaylists.find((id) => id == playlist.id) != undefined}
                onLike={(like) => onLikePlaylist(like, playlist)}
              />
            );
          })}
        </ScrollableBox>
      )}
      {favGenres.length !== 0 && (
        <Box title="Liked Genres" className="flex-wrap">
          {favGenres.map((genre) => {
            return (
              <SmallCard
                key={genre}
                title={genre}
                link={routesConfig.genres.getParameter(genre)}
                defaultLiked={user?.likedGenres.find((id) => id == genre) != undefined}
                onLike={(like) => onLikeGenre(like, genre)}
              />
            );
          })}
        </Box>
      )}
      {favContent?.likedCatalogs.length !== 0 && (
        <ScrollableBox title="Liked Albums/Singles/EPs">
          {favContent?.likedCatalogs.map((catalog) => {
            return (
              <Card
                key={catalog.id}
                title={catalog.title}
                description={`${catalog.type.valueOf()} - ${catalog.owner.artistName}`}
                link={routesConfig.catalog.getParameter(catalog.id)}
                thumbnail={displayPictureProfile(catalog.thumbnail)}
                defaultLiked={
                  user?.likedCatalogs.find((id) => id == catalog.id.toString()) !== undefined
                }
                onLike={(like) => onLikeCatalog(like, catalog)}
              />
            );
          })}
        </ScrollableBox>
      )}
      {favContent?.likedArtists.length === 0 &&
        favContent?.likedArtists.length === 0 &&
        favContent?.likedCatalogs.length === 0 &&
        favGenres.length === 0 && (
          <div className="text-center text-2xl">You have no favourite content yet</div>
        )}
    </div>
  );
}

export default LibraryPage;
