import { type ReactElement } from "react";

type SettingsOptionsProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function SettingsOptions({
  className,
  children,
  onClick = () => {},
}: Readonly<SettingsOptionsProps>): ReactElement {
  return (
    <div
      className={`flex flex-row justify-start items-center m-1 p-[6px] sm:p-2 text-sm sm:text-base hover:bg-gray-200 rounded-md select-none ${className}`}
      onClick={onClick}>
      {children}
    </div>
  );
}

export default SettingsOptions;
