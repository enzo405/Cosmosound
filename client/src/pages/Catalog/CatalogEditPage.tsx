import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CatalogService from "services/catalogService";
import { formatDurationWithLabel, formatTime } from "utils/date";
import PageLayout from "components/PageLayout";
import ArtistInfo from "components/music/ArtistInfo";
import MusicItemDelete from "components/music/MusicItemDelete";
import { Music } from "models/Music";
import MusicService from "services/musicService";
import { useConfirmDialog } from "hooks/useConfirm";
import { CatalogWithMusic } from "models/Catalog";
import { enqueueSnackbar } from "notistack";
import { useUser } from "hooks/useUser";
import ForbiddenErrorPage from "pages/errors/ForbiddenErrorPage";
import { routesConfig } from "config/app-config";

interface CatalogEditPageProps {}

export default function CatalogEditPage({}: CatalogEditPageProps): ReactElement {
  const navigate = useNavigate();
  const { user } = useUser();
  const { idCatalog } = useParams();
  const { openDialog } = useConfirmDialog();
  const [catalog, setCatalog] = useState<CatalogWithMusic | undefined>();

  useEffect(() => {
    const fetchCatalog = async () => {
      await CatalogService.getCatalogById(idCatalog)
        .then((catalog) => {
          setCatalog(catalog);
        })
        .catch((err) => {
          enqueueSnackbar({
            message: err.message,
            variant: "error",
          });
        });
    };

    fetchCatalog();
  }, [idCatalog]);

  if (catalog == undefined) {
    return <NotFoundErrorPage message="CATALOG NOT FOUND" />;
  }
  if (catalog.owner.id !== user?.id) {
    return <ForbiddenErrorPage />;
  }

  const handleClickDelete = (music: Music) => {
    openDialog({
      title: `Are you sure ?`,
      description: `Do you want to delete '${music.title}' from ${catalog.title}?`,
      onConfirm: () =>
        MusicService.deleteMusic(catalog.id, music)
          .then((catalog) => {
            setCatalog(catalog);
            enqueueSnackbar({
              message: `${music.title} successfully deleted.`,
              variant: "success",
            });
          })
          .catch(() => {
            enqueueSnackbar({
              message: `An error occured while trying to remove ${music.title}.`,
              variant: "error",
            });
          }),
    });
  };

  const handleDeleteCatalog = () => {
    openDialog({
      title: `Are you sure ?`,
      description: `Do really you want to delete this?`,
      onConfirm: async () => {
        return await CatalogService.deleteCatalog(catalog)
          .then(() => {
            enqueueSnackbar({
              message: `${catalog.type.valueOf()} '${catalog.title}' successfully deleted.`,
              variant: "success",
            });
            navigate(routesConfig.home.path);
          })
          .catch(() => {
            enqueueSnackbar({
              message: `An error occured while trying to remove ${catalog.title}.`,
              variant: "error",
            });
          });
      },
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
          <span>Made on {formatTime(catalog.createdAt)}</span>
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
              {catalog.owner.artistName} haven't made any {catalog.type.valueOf()} yet
            </span>
          )}
        </div>
      }
    />
  );
}
