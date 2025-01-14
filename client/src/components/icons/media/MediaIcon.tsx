import { ReactElement } from "react";
import InstagramIcon from "./InstagramIcon";
import SpotifyIcon from "./SpotifyIcon";
import AppleMusicIcon from "./AppleMusicIcon";
import XIcon from "./XIcon";
import YoutubeMusicIcon from "./YoutubeMusicIcon";
import { Media } from "models/User";

interface MediaIconProps {
  media: Media;
}

export default function MediaIcon({ media }: MediaIconProps): ReactElement {
  switch (media) {
    case Media.YTB_MUSIC:
      return <YoutubeMusicIcon />;
    case Media.X:
      return <XIcon />;
    case Media.APPLE_MUSIC:
      return <AppleMusicIcon />;
    case Media.SPOTIFY:
      return <SpotifyIcon />;
    case Media.INSTAGRAM:
      return <InstagramIcon />;
  }
}
