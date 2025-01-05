import Container from "components/box/Container";
import { Icon } from "components/icons/Icon";
import { useUser } from "hooks/useUser";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import React, { ChangeEvent, DragEvent, ReactElement, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import GenresService from "services/genresService";
import NewMusic from "./components/NewMusic";
import CatalogService from "services/catalogService";
import { useConfirmDialog } from "hooks/useConfirm";
import { displayPictureProfile } from "utils/user";
import { PartialArtist } from "models/User";
import { enqueueSnackbar } from "notistack";
import Loading from "components/icons/Loading";

export interface CreateCatalogFormData {
  titleCatalog: string;
  thumbnailCatalog: File | string;
  musics: Array<CreateMusicFormData>;
}

export interface CreateMusicFormData {
  file: File;
  genres: string[];
  duration: number;
}

export default function CreateCatalogPage(): ReactElement {
  const { user } = useUser();
  const { openDialog } = useConfirmDialog();

  const artist = useMemo(() => user as PartialArtist, [user]);
  if (artist == undefined) return <NotFoundErrorPage message="ARTIST NOT FOUND" />;

  const availableGenres = useMemo(() => GenresService.getAllGenres(), []);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { isDirty, errors },
  } = useForm<CreateCatalogFormData>({
    defaultValues: {
      titleCatalog: `${artist.artistName}`,
      thumbnailCatalog: displayPictureProfile(artist.pictureProfile),
      musics: [],
    },
  });

  const [preview, setPreview] = useState(displayPictureProfile(artist.pictureProfile));
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const CatalogCard = (data: CreateCatalogFormData) => {
    return (
      <div className="flex gap-2 border rounded-lg p-4 shadow-md max-w-lg">
        <img
          src={preview}
          alt="Catalog Thumbnail"
          className="mm-size-16 md:mm-size-24 rounded-full border border-gray-300"
        />
        {data.musics.length > 0 ? (
          <div className="h-1/2 max-h-72 overflow-y-auto">
            <strong>Songs:</strong>
            <ul className="list-disc pl-5">
              {data.musics.map((music, index) => (
                <li key={index}>
                  <strong>Title:</strong> {music.file.name}, <strong>Genres:</strong>{" "}
                  {music.genres.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No songs added.</p>
        )}
      </div>
    );
  };

  const onSubmitForm = (data: CreateCatalogFormData) => {
    openDialog({
      title: data.titleCatalog,
      description: (
        <CatalogCard
          musics={data.musics}
          thumbnailCatalog={data.thumbnailCatalog}
          titleCatalog={data.titleCatalog}
        />
      ),
      onCancel: () => setLoading(false),
      onConfirm: async () => {
        setLoading(true);
        await CatalogService.createCatalog(data)
          .then((data) => {
            setLoading(false);
            reset();
            setPreview(displayPictureProfile(artist.pictureProfile));
            enqueueSnackbar({
              message: `${data.type} successfully created with ${data.musics.length} songs.`,
              variant: "success",
            });
          })
          .catch((e) => {
            setLoading(false);
            enqueueSnackbar({
              message: e.response.data.message,
              variant: "error",
            });
          });
      },
    });
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("thumbnailCatalog", file, { shouldDirty: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) handleMusicUpload(files);
  };

  const handleMusicUpload = async (files: FileList) => {
    const calculateDuration = (file: File): Promise<number> => {
      return new Promise((resolve, reject) => {
        const audio = document.createElement("audio");
        audio.src = URL.createObjectURL(file);

        audio.addEventListener("loadedmetadata", () => {
          resolve(audio.duration);
        });

        audio.addEventListener("error", () => {
          reject(new Error("Failed to load audio file"));
        });
      });
    };

    const newMusic = await Promise.all(
      Array.from(files).map(async (file) => {
        const duration = await calculateDuration(file);
        return {
          file,
          genres: [],
          duration,
        };
      }),
    );

    setValue("musics", [...(getValues("musics") || []), ...newMusic], { shouldDirty: true });
  };

  const handleGenreChange = (index: number, selectedGenres: string[]) => {
    const updatedMusics = getValues("musics").map((music, i) =>
      i === index ? { ...music, genres: selectedGenres } : music,
    );
    setValue("musics", updatedMusics, { shouldValidate: true });
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) handleMusicUpload(files);
  };

  const handleRemoveMusic = (index: number) => {
    const updatedMusics = getValues("musics").filter((_, i) => i !== index);
    setValue("musics", updatedMusics, { shouldDirty: true });
  };

  return (
    <div className="flex flex-col items-center sm:items-start mt-4 gap-1 w-full h-full">
      <span className="text-4xl font-bs font-bold text-dark-custom ml-2">Create your Catalog</span>
      <div className="w-full lg:w-4/6 flex flex-col lg:flex-row lg:items-stretch gap-2">
        <Container className="w-full lg:w-2/3 p-4 md:p-6 lg:p-8">
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col gap-4 md:gap-8 h-full w-full p-3 md:p-0 lg:p-1 items-center md:items-stretch">
            <div className="flex flex-col md:flex-row gap-4 lg:gap-8 flex-grow min-h-0 h-full w-min md:w-5/6">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                  <label htmlFor="artistName" className="font-medium text-dark-custom">
                    Catalog Title
                  </label>
                  <Controller
                    name="titleCatalog"
                    control={control}
                    rules={{ required: "Catalog title is required." }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="titleCatalog"
                        placeholder="Enter Title"
                        className="mt-1 text-dark-custom px-2 lg:px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertio-orange focus:outline-none"
                      />
                    )}
                  />
                  {errors.titleCatalog && (
                    <span className="text-red-500 text-sm mt-1">{errors.titleCatalog.message}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-dark-custom">Thumbnail</span>
                  <Controller
                    name="thumbnailCatalog"
                    control={control}
                    rules={{ required: "Thumbnail is required." }}
                    render={() => (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          id="thumbnailCatalog"
                          className="hidden"
                          onChange={onImageChange}
                        />
                        <label
                          htmlFor="thumbnailCatalog"
                          className="relative w-min h-min cursor-pointer hover:opacity-90 flex justify-end">
                          <img
                            src="/img/form/edit-background.png"
                            alt="Edit thumbnail"
                            className="absolute z-10 top-0 right-0 mm-size-24 md:mm-size-36 opacity-90"
                          />
                          <img
                            src={preview}
                            alt="Catalog Thumbnail"
                            className="mm-size-24 md:mm-size-36 rounded-full border border-gray-300"
                          />
                        </label>
                      </>
                    )}
                  />
                  {errors.thumbnailCatalog && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.thumbnailCatalog.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6 justify-end sm:justify-start">
              <button
                onClick={() => {
                  reset();
                  setPreview(displayPictureProfile(artist.pictureProfile));
                }}
                disabled={loading}
                type="button"
                className={`px-4 py-2 border-2 ${loading ? "border-0 cursor-not-allowed bg-gray-300 text-white" : "border-tertio-orange text-tertio-orange hover:bg-secondary-orange"} rounded-lg`}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isDirty || loading}
                className={`px-5 py-3 rounded-lg text-white ${
                  !isDirty || loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-tertio-orange hover:bg-primary-orange"
                }`}>
                {loading ? <Loading /> : "Save"}
              </button>
            </div>
          </form>
        </Container>
        <Container className="w-full flex-col lg:w-1/3 md:min-w-80 items-start p-2 md:p-4 lg:pt-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`py-4 px-2 w-full flex flex-col items-center justify-center border-2 rounded-md border-dashed ${
              isDragging ? "border-primary-orange bg-orange-100" : "border-dark-glassy"
            }`}>
            <Icon iconName="cloud-upload" className="mm-size-12 fill-dark-custom" />
            <p>Drag and Drop here</p>
            <p>or</p>
            <input
              type="file"
              accept="audio/*"
              id="musicUpload"
              multiple
              className="hidden"
              onChange={handleFileInputChange}
            />
            <label
              htmlFor="musicUpload"
              className="p-2 px-4 bg-tertio-orange hover:bg-primary-orange rounded-lg text-white cursor-pointer">
              Select file
            </label>
          </div>
          <div className="flex flex-col flex-grow w-full gap-4 mt-4">
            {errors.musics && (
              <span className="text-red-500 text-sm mt-1">{errors.musics.message}</span>
            )}
            <span className="text-dark-glassy text-sm -mt-2">
              Songs title is defined by the file name
            </span>
            <Controller
              rules={{
                required: "You need to have at least one music",
                validate: {
                  atLeastOneGenre: (musics) =>
                    musics.every((music) => music.genres.length > 0) ||
                    "Each songs must have at least one genre.",
                },
              }}
              name="musics"
              control={control}
              render={({ field }) => (
                <>
                  {field.value.map((music, i) => (
                    <NewMusic
                      key={i}
                      genres={availableGenres}
                      index={i}
                      musicData={music}
                      handleGenreChange={handleGenreChange}
                      handleRemoveMusic={() => handleRemoveMusic(i)}
                    />
                  ))}
                </>
              )}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
