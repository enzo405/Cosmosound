import Box from "components/box/Box";
import ScrollableBox from "components/box/ScrollableBox";
import ArtistCard from "components/cards/ArtistCard";
import Card from "components/cards/Card";
import SmallCard from "components/cards/SmallCard";
import { routesConfig } from "config/app-config";
import { useUser } from "hooks/useUser";
import { Genre } from "models/Music";
import { Playlist } from "models/Playlist";
import { DetailedArtistInfo } from "models/User";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState, type ReactElement } from "react";
import ArtistService from "services/artistService";
import GenresService from "services/genresService";
import UserService from "services/userService";

function LibraryPage(): ReactElement {
  const { user } = useUser();
  const [myArtists, setMyArtists] = useState<DetailedArtistInfo[]>([]);

  useEffect(() => {
    const fetchMyArtists = async () => {
      await ArtistService.getMyFavouriteArtist()
        .then((artists) => {
          setMyArtists(artists);
        })
        .catch((error) => {
          console.error(error);
          enqueueSnackbar("Failed to fetch your favourite artists", {
            variant: "error",
          });
        });
    };

    fetchMyArtists();
  }, []);

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

  const onLikePlaylist = (like: boolean, playlist: Playlist) => {
    if (like) {
      UserService.removeLike(playlist);
      enqueueSnackbar(`${playlist.title} removed from your favourite playlist`, {
        variant: "success",
      });
    } else {
      UserService.like(playlist);
      enqueueSnackbar(`${playlist.title} added to your favourite playlist `, {
        variant: "success",
      });
    }
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
              key={genre.name}
              title={genre.name}
              link={routesConfig.genres.getParameter(genre.name)}
              defaultLiked={user?.likedGenres.find((id) => id == genre.name) != undefined}
              onLike={(like) => onLikeGenre(like, genre)}
            />
          );
        })}
      </Box>
    </div>
  );
}

export default LibraryPage;
