import { type ReactElement } from "react";

type SettingsOptionsProps = {
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function SettingsOptions({
  className,
  children,
  hoverable = true,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}: Readonly<SettingsOptionsProps>): ReactElement {
  return (
    <div
      className={`flex flex-row justify-start items-center m-1 p-[6px] sm:p-2 text-sm sm:text-base ${hoverable ? "hover:bg-gray-200" : ""} rounded-md select-none ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {children}
    </div>
  );
}

export default SettingsOptions;
