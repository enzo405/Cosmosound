import Box from "components/box/Box";
import ScrollableBox from "components/box/ScrollableBox";
import ArtistCard from "components/cards/ArtistCard";
import Card from "components/cards/Card";
import SmallCard from "components/cards/SmallCard";
import { routesConfig } from "config/app-config";
import { useUser } from "hooks/useUser";
import { Playlist } from "models/Playlist";
import { DetailedArtistInfo } from "models/User";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState, type ReactElement } from "react";
import ArtistService from "services/artistService";
import GenresService from "services/genresService";
import UserService from "services/userService";

function LibraryPage(): ReactElement {
  const { user, toggleLike } = useUser();
  const [myArtists, setMyArtists] = useState<DetailedArtistInfo[]>([]);

  useEffect(() => {
    const fetchMyArtists = async () => {
      await ArtistService.getMyFavouriteArtist()
        .then((artists) => {
          setMyArtists(artists);
        })
        .catch(() => {
          enqueueSnackbar("Failed to fetch your favourite artists", {
            variant: "error",
          });
        });
    };

    fetchMyArtists();
  }, []);

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

  const myPlaylists = useMemo(() => {
    return user?.playlists ?? []; // TODO get user favourite playlists instead of user's playlists
  }, [user]);
  const myGenres = user ? GenresService.getMyFavouriteGenres(user) : [];

  return (
    <div className="flex flex-col gap-10">
      <ScrollableBox title="Favourite Artists">
        {myArtists.map((artist) => {
          return <ArtistCard key={artist.id} artist={artist} />;
        })}
      </ScrollableBox>
      <ScrollableBox title="Liked Playlist">
        {myPlaylists.map((playlist) => {
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
      <Box title="Liked Genres" className="flex-wrap">
        {myGenres.map((genre) => {
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
    </div>
  );
}

export default LibraryPage;
