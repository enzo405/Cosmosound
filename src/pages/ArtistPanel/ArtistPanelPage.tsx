import Container from "components/box/Container";
import SpotifyIcon from "components/icons/media/SpotifyIcon";
import { useUser } from "hooks/useUser";
import { Genre } from "models/Music";
import { Media } from "models/User";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import { ReactElement, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import ArtistService from "services/artistService";
import GenresService from "services/genresService";
import UserService from "services/userService";
import MediaLinkInput from "./components/MediaLinkInput";
import YoutubeMusicIcon from "components/icons/media/YoutubeMusicIcon";
import InstagramIcon from "components/icons/media/InstagramIcon";
import XIcon from "components/icons/media/XIcon";
import AppleMusicIcon from "components/icons/media/AppleMusicIcon";

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
  const { user } = useUser();
  const artist = useMemo(() => ArtistService.getArtistById(user?.id), []);
  if (artist == undefined) return <NotFoundErrorPage />;

  const availableGenres = useMemo(() => GenresService.getAllGenres(), []);

  const { handleSubmit, control } = useForm<ArtistPanelFormData>({
    defaultValues: {
      artistName: artist.artist_name,
      spotifyLink: artist.social_media.find((m) => m.media == Media.SPOTIFY)?.link,
      youtubeLink: artist.social_media.find((m) => m.media == Media.YTB_MUSIC)?.link,
      appleMusicLink: artist.social_media.find((m) => m.media == Media.APPLE_MUSIC)?.link,
      xLink: artist.social_media.find((m) => m.media == Media.X)?.link,
      instagramLink: artist.social_media.find((m) => m.media == Media.INSTAGRAM)?.link,
      genre: artist.genre,
    },
  });

  const onSubmitForm = (data: ArtistPanelFormData) => {
    // TODO: Confirmation box
    UserService.saveArtistData(data);
  };

  return (
    <div className="flex flex-col items-center sm:items-start mt-4 w-full h-full">
      <span className="text-4xl font-bs font-bold text-dark-custom ml-2">Artist Panel</span>
      <div className="flex flex-col md:flex-row gap-2 h-full">
        <Container className="w-5/6 sm:w-min sm:min-w-[30rem] h-full">
          <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <label htmlFor="artistName" className="font-medium text-dark-custom">
                  Artist Name
                </label>
                <Controller
                  name="artistName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="artistName"
                      placeholder="Enter your artist name"
                      className="mt-1 text-dark-custom px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:outline-none"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-dark-custom">Social Media</span>
                <MediaLinkInput
                  control={control}
                  icon={<SpotifyIcon />}
                  name="spotifyLink"
                  placeholder="Spotify Link"
                  hostname="open.spotify.com"
                />
                <MediaLinkInput
                  control={control}
                  icon={<YoutubeMusicIcon />}
                  name="youtubeLink"
                  placeholder="Youtube Music Link"
                  hostname="music.youtube.com"
                />
                <MediaLinkInput
                  control={control}
                  icon={<AppleMusicIcon />}
                  name="appleMusicLink"
                  placeholder="Apple Music Link"
                  hostname="music.apple.com"
                />
                <MediaLinkInput
                  control={control}
                  icon={<XIcon />}
                  name="xLink"
                  placeholder="X Link"
                  hostname="x.com"
                />
                <MediaLinkInput
                  control={control}
                  icon={<InstagramIcon />}
                  name="instagramLink"
                  placeholder="Instagram Link"
                  hostname="instagram.com"
                />
              </div>
            </div>
            <div className="flex flex-row">{/* Genre select */}</div>
          </form>
        </Container>
        <Container className="w-5/6 sm:w-min sm:min-w-10 h-full">
          <></>
        </Container>
      </div>
    </div>
  );
}
