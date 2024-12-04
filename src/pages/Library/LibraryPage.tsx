import Box from "components/box/Box";
import ScrollableBox from "components/box/ScrollableBox";
import ArtistCard from "components/cards/ArtistCard";
import Card from "components/cards/Card";
import SmallCard from "components/cards/SmallCard";
import { routesConfig } from "config/app-config";
import { type ReactElement } from "react";
import ArtistService from "services/artistService";
import GenresService from "services/genresService";
import PlaylistService from "services/playlistService";

function LibraryPage(): ReactElement {
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
            />
          );
        })}
      </Box>
    </div>
  );
}

export default LibraryPage;
