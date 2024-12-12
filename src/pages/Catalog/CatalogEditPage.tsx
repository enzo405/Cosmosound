import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import CatalogService from "services/catalogService";
import { formatDurationWithLabel, formatTime } from "utils/date";
import PageLayout from "components/PageLayout";
import ArtistInfo from "components/music/ArtistInfo";
import MusicItemDelete from "components/music/MusicItemDelete";
import { Music } from "models/Music";
import MusicService from "services/musicService";
import { useConfirmDialog } from "hooks/useConfirm";
import { TypeCatalog } from "models/Catalog";

interface CatalogEditPageProps {}

export default function CatalogEditPage({}: CatalogEditPageProps): ReactElement {
  const { idCatalog } = useParams();
  const { openDialog } = useConfirmDialog();

  const catalog = CatalogService.getCatalogById(idCatalog);
  if (catalog == undefined) {
    return <NotFoundErrorPage message="CATALOG NOT FOUND" />;
  }

  const handleClickDelete = (music: Music) => {
    openDialog({
      title: `Are you sure ?`,
      description: `Do you want to delete '${music.title}' from this ${TypeCatalog[catalog.type]}?`,
      onConfirm: () => MusicService.deleteMusic(music),
    });
  };

  const handleDeleteCatalog = () => {
    openDialog({
      title: `Are you sure ?`,
      description: `Do really you want to delete this ${TypeCatalog[catalog.type]}?`,
      onConfirm: () => CatalogService.deleteCatalog(catalog),
    });
  };

  return (
    <PageLayout
      thumbnail={catalog.thumbnail}
      title={catalog.title}
      subtitle={
        <div className="flex flex-col gap-1">
          <span className="flex flex-row gap-1">
            By <ArtistInfo artist={catalog.owner} />
          </span>
          <span>Made on {formatTime(catalog.date_creation)}</span>
          <span>
            {catalog.musics.length} songs (
            {formatDurationWithLabel(
              catalog.musics.reduce((total, music) => total + music.duration, 0),
            )}
            )
          </span>
        </div>
      }
      actionIconName="trash-red"
      onPageActionClick={handleDeleteCatalog}
      headerActions={<></>}
      content={
        <div className="flex flex-col gap-1">
          <div className="w-full border-b border-gray-300 py-2 mb-2" />
          {catalog.musics.length != 0 ? (
            catalog.musics.map((music, i) => {
              return (
                <MusicItemDelete
                  key={music.id}
                  music={music}
                  artist={catalog.owner}
                  catalog={catalog}
                  index={i + 1}
                  handleClickDelete={(music) => handleClickDelete(music)}
                />
              );
            })
          ) : (
            <span className="text-dark-custom">
              {catalog.owner.artist_name} haven't made any {catalog.type.valueOf()} yet
            </span>
          )}
        </div>
      }
    />
  );
}
