import ScrollableBox from "components/box/ScrollableBox";
import ArtistCard from "components/cards/ArtistCard";
import Card from "components/cards/Card";
import { routesConfig } from "config/app-config";
import { type ReactElement } from "react";
import ArtistService from "services/artistService";
import PlaylistService from "services/playlistService";

function LibraryPage(): ReactElement {
  return (
    <div className="flex flex-col gap-10">
      <ScrollableBox title="Favourite Artists">
        {ArtistService.getMyFavouriteArtist().map((artist) => {
          return <ArtistCard artist={artist} />;
        })}
      </ScrollableBox>
      <ScrollableBox title="Liked Playlist">
        {PlaylistService.getMyPlaylist().map((playlist) => {
          return (
            <Card
              description={playlist.owner.name}
              thumbnail={playlist.musics[0].catalog.thumbnail}
              title={playlist.title}
              link={routesConfig.playlist.getParameter(playlist.id)}
            />
          );
        })}
      </ScrollableBox>
    </div>
  );
}

export default LibraryPage;
