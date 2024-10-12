import { type ReactElement } from "react";
import { IoIosArrowForward } from "react-icons/io";

type HeaderAvatarOptionsProps = {
  isClickable?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

function HeaderAvatarOptions({
  isClickable = true,
  children,
  onClick = () => {},
}: Readonly<HeaderAvatarOptionsProps>): ReactElement {
  let classNames = "flex flex-row gap-1 justify-start m-1 p-2 rounded-lg";
  if (isClickable) {
    classNames += " cursor-pointer hover:bg-slate-400 group";
  }

  return (
    <span className={classNames} onClick={onClick}>
      {children}
      {isClickable ? (
        <IoIosArrowForward className="ml-auto mt-1 mr-1 transition-transform group-hover:translate-x-1" />
      ) : null}
    </span>
  );
}

export default HeaderAvatarOptions;
