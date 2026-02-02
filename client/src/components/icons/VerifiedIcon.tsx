import { ReactElement } from "react";
import { Icon } from "./Icon";

interface VerifiedProps {
  className?: string;
}

export default function VerifiedIcon({ className }: VerifiedProps): ReactElement {
  return (
    <span
      className={`flex-shrink-0 flex justify-center items-center rounded-lg ${className} bg-label-music-verif`}
      title="Official Music">
      <Icon iconName="verified-label" className="mm-size-3 stroke-black" />
    </span>
  );
}
