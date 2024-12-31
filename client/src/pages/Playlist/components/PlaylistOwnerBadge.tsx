import { User } from "models/User";
import { ReactElement } from "react";
import { displayPictureProfile } from "utils/user";

interface PlaylistOwnerBadgeProps {
  owner: User;
}

export default function PlaylistOwnerBadge({ owner }: PlaylistOwnerBadgeProps): ReactElement {
  return (
    <span className={`cursor-pointer flex flex-row gap-1`}>
      <img
        src={displayPictureProfile(owner.pictureProfile)}
        className="mm-size-5 rounded-full object-cover"
        alt={owner.name}
      />
      <span>{owner.name}</span>
    </span>
  );
}
