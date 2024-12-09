import { Icon } from "components/icons/Icon";
import { IconName } from "constants/iconName";
import { ReactElement } from "react";

interface TextSettingProps {
  iconName: IconName;
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function TextSetting({
  iconName,
  text,
  onClick,
  className,
}: TextSettingProps): ReactElement {
  return (
    <span onClick={onClick} className="inline-flex w-full items-center cursor-pointer">
      <Icon className={`mm-size-5 mr-2 ${className}`} iconName={iconName} />
      <span className="w-max text-dark-grey">{text}</span>
    </span>
  );
}
