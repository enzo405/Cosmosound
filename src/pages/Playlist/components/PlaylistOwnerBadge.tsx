import { User } from "models/User";
import { ReactElement } from "react";

interface PlaylistOwnerBadgeProps {
  owner: User;
}

export default function PlaylistOwnerBadge({ owner }: PlaylistOwnerBadgeProps): ReactElement {
  return (
    <span className={`cursor-pointer flex flex-row gap-1`}>
      <img
        src={owner.picture_profile}
        className="size-5 rounded-full object-contain"
        alt={owner.name}
      />
      <span>{owner.name}</span>
    </span>
  );
}
