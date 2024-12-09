import Box from "components/box/Box";
import ScrollableBox from "components/box/ScrollableBox";
import ArtistCard from "components/cards/ArtistCard";
import Card from "components/cards/Card";
import SmallCard from "components/cards/SmallCard";
import { routesConfig } from "config/app-config";
import { Genre } from "models/Music";
import { Playlist } from "models/Playlist";
import { enqueueSnackbar } from "notistack";
import { type ReactElement } from "react";
import ArtistService from "services/artistService";
import GenresService from "services/genresService";
import PlaylistService from "services/playlistService";
import UserService from "services/userService";

function LibraryPage(): ReactElement {
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

  return (
    <div className="flex flex-col gap-10">
      <ScrollableBox title="Favourite Artists">
        {ArtistService.getMyFavouriteArtist().map((artist) => {
          return <ArtistCard key={artist.id} artist={artist} />;
        })}
      </ScrollableBox>
      <ScrollableBox title="Liked Playlist">
        {PlaylistService.getMyPlaylist().map((playlist) => {
          return (
            <Card
              key={playlist.id}
              description={playlist.owner.name}
              thumbnail={playlist.musics[0].catalog.thumbnail}
              title={playlist.title}
              link={routesConfig.playlist.getParameter(playlist.id)}
              onLike={(like) => onLikePlaylist(like, playlist)}
            />
          );
        })}
      </ScrollableBox>
      <Box title="Liked Genres" className="flex-wrap">
        {GenresService.getMyFavouriteGenres().map((genre) => {
          return (
            <SmallCard
              key={genre.name}
              title={genre.name}
              link={routesConfig.genres.getParameter(genre.name)}
              onLike={(like) => onLikeGenre(like, genre)}
            />
          );
        })}
      </Box>
    </div>
  );
}

export default LibraryPage;
