import Container from "components/box/Container";
import { Icon } from "components/icons/Icon";
import { useUser } from "hooks/useUser";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import React, { ChangeEvent, DragEvent, ReactElement, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ArtistService from "services/artistService";
import GenresService from "services/genresService";
import NewMusic from "./components/NewMusic";
import CatalogService from "services/catalogService";

export interface CreateCatalogFormData {
  titleCatalog: string;
  thumbnailCatalog: File | string;
  musics: Array<CreateMusicFormData>;
}

export interface CreateMusicFormData {
  title: string;
  duration: number;
  genres: string[];
}

export default function CreateCatalogPage(): ReactElement {
  const { user } = useUser();
  const artist = useMemo(() => ArtistService.getArtistById(user?.id), []);
  if (artist == undefined) return <NotFoundErrorPage message="ARTIST NOT FOUND" />;

  const availableGenres = useMemo(() => GenresService.getAllGenres(), []);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { isDirty },
  } = useForm<CreateCatalogFormData>({
    defaultValues: {
      titleCatalog: `${artist.artist_name}-${artist.catalogs.length}`,
      thumbnailCatalog: artist.picture_profile,
      musics: [],
    },
  });

  const [preview, setPreview] = useState(artist.picture_profile);
  const [isDragging, setIsDragging] = useState(false);

  const onSubmitForm = (data: CreateCatalogFormData) => {
    CatalogService.createCatalog(data);
    // TODO: Confirmation box
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

  const handleMusicUpload = (files: FileList) => {
    const newMusic = Array.from(files).map((file) => ({
      title: file.name,
      duration: 0, // Placeholder, you can calculate duration if needed.
      genres: [],
    }));

    setValue("musics", [...(getValues("musics") || []), ...newMusic], { shouldDirty: true });
  };

  const handleGenreChange = (index: number, selectedGenres: string[]) => {
    const updatedMusics = getValues("musics").map((music, i) =>
      i === index ? { ...music, genres: selectedGenres } : music,
    );
    setValue("musics", updatedMusics, { shouldDirty: true });
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
    <div className="flex flex-col items-center sm:items-start mt-4 w-full h-full">
      <span className="text-4xl font-bs font-bold text-dark-custom ml-2">Create your Catalog</span>
      <div className="w-4/6 flex flex-col-reverse lg:flex-row lg:items-stretch gap-2">
        <Container className="w-2/3 p-4 md:p-6 lg:p-8">
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
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-dark-custom">Thumbnail</span>
                  <Controller
                    name="thumbnailCatalog"
                    control={control}
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
                            src="/src/assets/img/form/edit-background.png"
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
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6 justify-end sm:justify-start">
              <button
                onClick={() => reset()}
                type="button"
                className="px-4 py-2 text-tertio-orange border-2 border-tertio-orange rounded-lg hover:bg-secondary-orange">
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isDirty}
                className={`px-5 py-3 rounded-lg text-white ${
                  isDirty
                    ? "bg-tertio-orange hover:bg-primary-orange"
                    : "bg-gray-300 cursor-not-allowed"
                }`}>
                Save
              </button>
            </div>
          </form>
        </Container>
        <Container className="flex-col w-1/3 md:min-w-80 items-start p-2 md:p-4 lg:pt-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`py-4 px-2 w-full flex flex-col items-center justify-center border-2 rounded-md border-dashed ${
              isDragging ? "border-primary-orange bg-orange-100" : "border-dark-glassy"
            }`}>
            <Icon iconName="cloud-upload" className="mm-size-12 fill-dark-custom" />
            <p>Drag and Drop here</p>
            <p>(only mp4)</p>
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
            <Controller
              rules={{
                required: "You need to have at least one music",
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
