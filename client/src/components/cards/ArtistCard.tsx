import HeartIcon from "./../../components/icons/HeartIcon";
import VerifiedIcon from "./../../components/icons/VerifiedIcon";
import { routesConfig } from "./../../config/app-config";
import { useUser } from "./../../hooks/useUser";
import { Artist } from "./../../models/User";
import { enqueueSnackbar } from "notistack";
import { MouseEvent, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "./../../services/userService";
import { displayPictureProfile } from "./../../utils/user";

interface ArtistCardProps {
  artist: Artist;
  className?: string;
}

export default function ArtistCard({ artist, className = "" }: ArtistCardProps): ReactElement {
  const navigate = useNavigate();
  const { user, toggleLike } = useUser();
  const [displayLikeBtn, setDisplayLikeBtn] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(
    user?.likedArtists.find((id) => id == artist.id) !== undefined,
  );

  const handleOnClick = (event: MouseEvent) => {
    let likeBtn = document.getElementById("likeBtn");
    const target = event.target as Node;

    if (!likeBtn?.contains(target)) {
      navigate(routesConfig.artist.getParameter(artist.id));
    }
  };

  const handleClickHeart = async () => {
    await UserService.toggleLike(artist.id, "artist")
      .then(() => {
        toggleLike(artist.id, "artist");
        if (isLiked) {
          enqueueSnackbar(`Artist removed from your favourite artist`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`Artist added to your favourite artists`, {
            variant: "success",
          });
        }
        setIsLiked(!isLiked);
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.error, {
          variant: "error",
        });
      });
  };

  return (
    <div
      onMouseEnter={() => setDisplayLikeBtn(true)}
      onMouseLeave={() => setDisplayLikeBtn(false)}
      onClick={(e) => handleOnClick(e)}
      className={`relative flex flex-col items-center group cursor-pointer min-w-[8.5rem] max-w-[8.5rem] border border-dark-glassy rounded-2xl p-2 md:pt-2 md:pb-5 gap-2 mx-0.5 ${className}`}>
      <div className="w-full flex flex-row justify-center">
        <img
          className="h-24 w-24 md:h-28 md:w-28 rounded-full object-cover aspect-square pt-1"
          src={displayPictureProfile(artist.pictureProfile)}
          alt={artist.artistName}
        />
      </div>
      <div className="flex flex-col cursor-pointer justify-start w-full items-center overflow-hidden">
        <div className="flex flex-row gap-0.5 group-hover:underline underline-offset-2 text-sm font-medium truncate mx-auto pb-6">
          {artist.artistName}
          {artist.isVerified && <VerifiedIcon className="size-[16px]" />}
        </div>
      </div>
      {displayLikeBtn && (
        <div id="likeBtn" className="z-10 absolute bottom-1 right-1">
          <HeartIcon isLiked={isLiked} handleClickHeart={handleClickHeart} className="size-6" />
        </div>
      )}
    </div>
  );
}
