import HeartIcon from "components/icons/HeartIcon";
import { routesConfig } from "config/app-config";
import { useUser } from "hooks/useUser";
import { Artist } from "models/User";
import { enqueueSnackbar } from "notistack";
import { MouseEvent, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "services/userService";

interface ArtistCardProps {
  artist: Artist;
  className?: string;
}

export default function ArtistCard({ artist, className = "" }: ArtistCardProps): ReactElement {
  const navigate = useNavigate();
  const { user } = useUser();
  const [displayLikeBtn, setDisplayLikeBtn] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(
    user.likedArtists.find((id) => id == artist.id.toString()) !== undefined,
  );

  const handleOnClick = (event: MouseEvent) => {
    let likeBtn = document.getElementById("likeBtn");
    const target = event.target as Node;

    if (!likeBtn?.contains(target)) {
      navigate(routesConfig.artist.getParameter(artist.id.toString()));
    }
  };

  const handleClickHeart = () => {
    if (isLiked) {
      UserService.removeLike(artist);
      enqueueSnackbar(`Artist removed from your favourite artist`, {
        variant: "success",
      });
    } else {
      UserService.like(artist);
      enqueueSnackbar(`Artist added to your favourite artists`, {
        variant: "success",
      });
    }
    setIsLiked(!isLiked);
  };

  return (
    <div
      onMouseEnter={() => setDisplayLikeBtn(true)}
      onMouseLeave={() => setDisplayLikeBtn(false)}
      onClick={(e) => handleOnClick(e)}
      className={`relative flex flex-col items-center group cursor-pointer min-w-[8.5rem] max-w-[8.5rem] border border-dark-glassy rounded-2xl p-2 md:pt-2 md:pb-5 gap-2 mx-0.5 ${className}`}>
      <div className="w-full flex flex-row justify-center">
        <img
          className="h-24 w-24 md:h-28 md:w-28 rounded-full object-cover pt-1"
          src={artist.pictureProfile}
          alt={artist.artistName}
        />
      </div>
      <div className="flex flex-col cursor-pointer w-full items-center">
        <div className="group-hover:underline underline-offset-2 text-sm font-medium truncate pb-6">
          {artist.artistName}
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
