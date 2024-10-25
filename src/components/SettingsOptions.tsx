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
      className={`flex flex-row gap-2 justify-start items-center p-1 m-1 hover:bg-gray-200 rounded-md xsm:m-1 xsm:p-2 select-none ${className}`}
      onClick={onClick}>
      {children}
    </div>
  );
}

export default SettingsOptions;
