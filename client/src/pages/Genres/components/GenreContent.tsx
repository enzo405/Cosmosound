import { ReactElement } from "react";
import { GenreTabs } from "../GenresPage";
import { Catalog, TypeCatalog } from "models/Catalog";
import Card from "components/cards/Card";
import ArtistCard from "components/cards/ArtistCard";
import { Artist } from "models/User";
import { routesConfig } from "config/app-config";
import { MusicDetails } from "models/Music";
import MusicItem from "components/music/MusicItem";
import { Playlist } from "models/Playlist";
import UserService from "services/userService";
import { enqueueSnackbar } from "notistack";
import { useUser } from "hooks/useUser";

interface GenreContentProps {
  content: Catalog[] | MusicDetails[] | Playlist[] | Artist[];
  activeTab: GenreTabs;
}

export default function GenreContent({ content, activeTab }: GenreContentProps): ReactElement {
  const { user } = useUser();

  if (!content.length) {
    return <span className="text-dark-custom">This genre seems empty</span>;
  }

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

  const renderContent = () => {
    switch (activeTab) {
      case GenreTabs.MUSIC:
        return content.map((item) => {
          const music = item as MusicDetails;
          return (
            <MusicItem
              key={music.id}
              music={music}
              catalog={music.catalog}
              artist={music.artist}
              showArtist={false}
            />
          );
        });
      case GenreTabs.PLAYLIST:
        return content.map((item) => {
          const playlist = item as Playlist;
          return (
            <Card
              key={playlist.id}
              title={playlist.title}
              link={routesConfig.playlist.getParameter(playlist.id)}
              thumbnail={playlist.playlistThumbnail}
              description={`${playlist.title} - ${playlist.owner.name}`}
              defaultLiked={user?.likedPlaylists.find((id) => id == playlist.id) !== undefined}
              onLike={(like) => onLikePlaylist(like, playlist)}
            />
          );
        });
      case GenreTabs.ARTISTS:
        return content.map((artist) => <ArtistCard key={artist.id} artist={artist as Artist} />);
      case GenreTabs.ALBUM:
      case GenreTabs.EP:
      case GenreTabs.SINGLE:
        return content.map((item) => {
          const catalog = item as Catalog;
          return (
            <Card
              key={catalog.id}
              title={catalog.title}
              description={`${TypeCatalog[catalog.type]} - ${catalog.owner.artistName}`}
              link={`/catalog/${catalog.id}`}
              thumbnail={catalog.thumbnail}
              defaultLiked={user?.likedCatalogs.find((id) => id == catalog.id) !== undefined}
              onLike={(like) => onLikeCatalog(like, catalog)}
            />
          );
        });
      default:
        <></>;
        break;
    }
  };

  return (
    <div className={`flex ${activeTab === GenreTabs.MUSIC ? "flex-col" : "flex-wrap gap-2"}`}>
      {renderContent()}
    </div>
  );
}
