import { HTMLAttributes, type ReactElement } from "react";
import { Icon } from "components/icons/Icon";
import { useOpenAvatarModal } from "hooks/useOpenAvatarModal";

function HeaderAvatar({ className, id }: HTMLAttributes<HTMLHRElement>): ReactElement {
  const { isModalOpen, toggleModal } = useOpenAvatarModal();

  return (
    <span
      id={id}
      className={`${className} group cursor-pointer flex flex-row items-center`}
      onClick={toggleModal}>
      <img
        className="min-w-[3rem] min-h-[3rem] w-[3rem] h-[3rem] p-1 rounded-xl ring-gray-300 cursor-pointer aspect-square object-contain"
        src="/src/assets/img/header/default_avatar.png"
        alt="profile picture"
      />
      <span className="hidden md:block p-4 cursor-pointer rounded-xl group-hover:bg-gray-200">
        <Icon
          iconName="arrow-right"
          className={`transition-transform duration-150 stroke-black h-3 w-3 min-w-3 min-h-3 ${isModalOpen ? "-rotate-90" : "rotate-90"}`}
        />
      </span>
    </span>
  );
}

export default HeaderAvatar;
