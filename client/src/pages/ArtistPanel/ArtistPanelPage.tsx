import Container from "components/box/Container";
import SpotifyIcon from "components/icons/media/SpotifyIcon";
import { useUser } from "hooks/useUser";
import { Genre } from "models/Music";
import { Media } from "models/User";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import GenresService from "services/genresService";
import MediaLinkInput from "./components/MediaLinkInput";
import YoutubeMusicIcon from "components/icons/media/YoutubeMusicIcon";
import InstagramIcon from "components/icons/media/InstagramIcon";
import XIcon from "components/icons/media/XIcon";
import AppleMusicIcon from "components/icons/media/AppleMusicIcon";
import { Icon } from "components/icons/Icon";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "config/app-config";
import { useConfirmDialog } from "hooks/useConfirm";
import UserService from "services/userService";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { getDirtyFieldsValue } from "utils/form";
import ArtistInfoCard from "./components/ArtistCardInfo";

export interface ArtistPanelFormData {
  artistName?: string;
  spotifyLink?: string;
  youtubeLink?: string;
  appleMusicLink?: string;
  xLink?: string;
  instagramLink?: string;
  genre?: Genre;
}

export default function ArtistPanelPage(): ReactElement {
  const { user, setUser } = useUser();

  const { openDialog } = useConfirmDialog();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isDirty, errors, dirtyFields },
  } = useForm<ArtistPanelFormData>({
    defaultValues: {
      artistName: user?.artistName ?? "",
      spotifyLink: user?.socialMedia?.find((m) => m.media == Media.SPOTIFY)?.link,
      youtubeLink: user?.socialMedia?.find((m) => m.media == Media.YTB_MUSIC)?.link,
      appleMusicLink: user?.socialMedia?.find((m) => m.media == Media.APPLE_MUSIC)?.link,
      xLink: user?.socialMedia?.find((m) => m.media == Media.X)?.link,
      instagramLink: user?.socialMedia?.find((m) => m.media == Media.INSTAGRAM)?.link,
      genre: user?.genre,
    },
  });

  const selectedGenre = watch("genre");

  const sortGenres = (genres: Genre[]): Genre[] => {
    if (!selectedGenre) {
      return genres;
    }

    const genre = selectedGenre ?? user?.genre;
    const result = genres.filter((g) => genre.name !== g.name);
    return [genre!, ...result]; // to have selected genre in first
  };

  const availableGenres = useMemo(() => GenresService.getAllGenres(), []);
  const [displayGenres, setDisplayGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [editProfile, setEditProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayGenres(sortGenres(availableGenres));
  }, [user?.genre, availableGenres]);

  useEffect(() => {
    reset({
      artistName: user?.artistName ?? "",
      spotifyLink: user?.socialMedia?.find((m) => m.media == Media.SPOTIFY)?.link,
      youtubeLink: user?.socialMedia?.find((m) => m.media == Media.YTB_MUSIC)?.link,
      appleMusicLink: user?.socialMedia?.find((m) => m.media == Media.APPLE_MUSIC)?.link,
      xLink: user?.socialMedia?.find((m) => m.media == Media.X)?.link,
      instagramLink: user?.socialMedia?.find((m) => m.media == Media.INSTAGRAM)?.link,
      genre: user?.genre,
    });
    setEditProfile(false);
  }, [user]);

  const onSubmitForm = (data: ArtistPanelFormData) => {
    const dirtyFieldsValue = getDirtyFieldsValue(dirtyFields, data);

    const description = (
      <div className="flex flex-col gap-1">
        <p>Artist Name: {dirtyFieldsValue.artistName}</p>
        <p>Genre: {dirtyFieldsValue.genre?.name}</p>

        <span className="flex flex-row gap-1 items-center">
          <p>Updated links:</p>
          {dirtyFieldsValue.spotifyLink && (
            <a href={dirtyFieldsValue.spotifyLink}>
              <SpotifyIcon />
            </a>
          )}
          {dirtyFieldsValue.youtubeLink && (
            <a href={dirtyFieldsValue.youtubeLink}>
              <YoutubeMusicIcon />
            </a>
          )}
          {dirtyFieldsValue.xLink && (
            <a href={dirtyFieldsValue.xLink}>
              <XIcon />
            </a>
          )}
          {dirtyFieldsValue.appleMusicLink && (
            <a href={dirtyFieldsValue.appleMusicLink}>
              <AppleMusicIcon />
            </a>
          )}
          {dirtyFieldsValue.instagramLink && (
            <a href={dirtyFieldsValue.instagramLink}>
              <InstagramIcon />
            </a>
          )}
        </span>
      </div>
    );

    openDialog({
      title: "Are you sure ?",
      description: description,
      onConfirm: async () =>
        await UserService.updateArtist(dirtyFieldsValue)
          .then((user) => {
            if (user.role === "USER") {
              enqueueSnackbar("Artist account created", { variant: "success" });
            } else {
              enqueueSnackbar("Artist info updated", { variant: "success" });
            }
            setUser(user);
          })
          .catch((err) => {
            const defaultErrMessage = "An error occured";
            if (err instanceof AxiosError) {
              setError(err.response?.data?.message || defaultErrMessage);
            } else {
              setError(defaultErrMessage);
            }
            enqueueSnackbar(defaultErrMessage, {
              variant: "error",
            });
          }),
    });
  };

  const handleOnChangeGenreInput = (e: string) => {
    const filteredGenres = sortGenres(availableGenres).filter((genre) => genre.name.includes(e));
    let uniqueGenres = [selectedGenre!, ...filteredGenres].filter(
      (genre, index, self) => self.indexOf(genre) === index,
    );
    setDisplayGenres(uniqueGenres);
  };

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  return (
    <div className="flex flex-col items-center sm:items-start mt-4 w-full h-full">
      <span className="flex flex-row items-center gap-2 text-4xl font-bs font-bold text-dark-custom ml-2">
        Artist Panel
        {user?.role === "ARTISTS" && (
          <span className="cursor-pointer" onClick={handleEditProfile}>
            <Icon className="mm-size-6 fill-dark-custom hover:fill-dark-glassy" iconName="pencil" />
          </span>
        )}
      </span>
      <div className="lg:h-[35rem] w-full md:w-fit flex flex-col-reverse lg:flex-row lg:items-stretch gap-2">
        {editProfile || user?.role !== "ARTISTS" ? (
          <Container className="w-full p-4 md:p-6 lg:p-8">
            <form
              onSubmit={handleSubmit(onSubmitForm)}
              className="flex flex-col gap-4 md:gap-8 h-full w-full p-3 md:p-0 lg:p-1 items-center md:items-stretch">
              <div className="flex flex-col md:flex-row gap-4 lg:gap-8 flex-grow min-h-0 h-full w-min md:w-5/6">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col">
                    <label htmlFor="artistName" className="font-medium text-dark-custom">
                      Artist Name
                    </label>
                    <Controller
                      name="artistName"
                      control={control}
                      rules={{
                        required: user?.artistName === null ? "Artist name is required" : false,
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="text"
                            id="artistName"
                            placeholder="Enter your artist name"
                            className={`mt-1 text-dark-custom px-2 lg:px-5 py-3 border ${
                              errors.artistName
                                ? "border-red-500"
                                : "border-gray-300 focus:ring-2 focus:ring-tertio-orange"
                            } rounded-lg focus:outline-none`}
                          />
                          {errors.artistName && (
                            <span className="text-red-500 text-sm mt-1">
                              {errors.artistName.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-dark-custom">Social Media</span>
                    <MediaLinkInput
                      control={control}
                      icon={<SpotifyIcon />}
                      name="spotifyLink"
                      placeholder="Spotify"
                      hostname="open.spotify.com"
                    />
                    <MediaLinkInput
                      control={control}
                      icon={<YoutubeMusicIcon />}
                      name="youtubeLink"
                      placeholder="YouTube Music"
                      hostname="music.youtube.com"
                    />
                    <MediaLinkInput
                      control={control}
                      icon={<AppleMusicIcon />}
                      name="appleMusicLink"
                      placeholder="Apple Music"
                      hostname="music.apple.com"
                    />
                    <MediaLinkInput
                      control={control}
                      icon={<XIcon />}
                      name="xLink"
                      placeholder="X"
                      hostname="x.com"
                    />
                    <MediaLinkInput
                      control={control}
                      icon={<InstagramIcon />}
                      name="instagramLink"
                      placeholder="Instagram"
                      hostname="instagram.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="genre" className="font-medium text-dark-custom">
                    Choose your Genre
                  </label>
                  <div
                    className={`flex flex-col h-[90%] border ${
                      errors.genre ? "border-red-500" : "border-gray-300"
                    } rounded-lg p-4`}>
                    <input
                      type="text"
                      onChange={(e) => handleOnChangeGenreInput(e.target.value)}
                      placeholder="Search genre"
                      className="mt-1 text-dark-custom px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertio-orange focus:outline-none"
                    />
                    <Controller
                      name="genre"
                      rules={{
                        required: "Please select a genre.",
                      }}
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col max-h-[25rem] h-full mt-2 scrollbar-thin overflow-y-auto p-2">
                          {displayGenres.map((genre) => {
                            const isChecked = field.value?.name === genre.name;
                            return (
                              <div key={genre.name} className="flex items-center gap-4">
                                <input
                                  type="radio"
                                  className="accent-primary-orange cursor-pointer"
                                  value={genre.name}
                                  checked={isChecked}
                                  onChange={() => field.onChange({ name: genre.name })}
                                  id={`genre-${genre.name}`}
                                />
                                <label
                                  className={`${isChecked ? "text-dark-custom" : "text-dark-glassy"} capitalize cursor-pointer`}
                                  htmlFor={`genre-${genre.name}`}>
                                  {genre.name}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    />
                  </div>
                  {errors.genre && (
                    <span className="text-red-500 text-sm mt-1">{errors.genre.message}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                {error && <span className="text-red-500 font-normal tracking-tight">{error}</span>}
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
              </div>
            </form>
          </Container>
        ) : (
          user && <ArtistInfoCard artist={user} />
        )}
        {user?.role === "ARTISTS" && (
          <Container className="w-fit items-start p-2 md:p-4 lg:pt-6">
            <button
              className="flex flex-row items-center justify-center gap-1 pl-3 pr-4 py-1 text-tertio-orange border-tertio-orange border-2 rounded-xl font-medium hover:bg-orange-50"
              type="button"
              role="button"
              onClick={() => navigate(routesConfig.createCatalog.path)}>
              <Icon iconName="cloud-upload" className="mm-size-7 fill-tertio-orange" />
              Create
            </button>
          </Container>
        )}
      </div>
    </div>
  );
}
