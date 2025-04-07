import { HTMLAttributes, type ReactElement } from "react";
import { Icon } from "./../../../components/icons/Icon";
import { useOpenAvatarModal } from "./../../../hooks/useOpenAvatarModal";
import { useUser } from "./../../../hooks/useUser";
import { displayPictureProfile } from "./../../../utils/user";

function HeaderAvatar({ className = "", id }: HTMLAttributes<HTMLHRElement>): ReactElement {
  const { isModalOpen, toggleModal } = useOpenAvatarModal();
  const { user } = useUser();

  return (
    <span
      id={id}
      className={`${className} group cursor-pointer flex flex-row items-center`}
      onClick={toggleModal}>
      <img
        loading="eager"
        className="mm-size-11 p-1 rounded-xl ring-gray-300 cursor-pointer aspect-square object-cover"
        src={displayPictureProfile(user?.pictureProfile)}
        alt="profile picture"
      />
      <span className="hidden md:block p-3.5 cursor-pointer rounded-xl group-hover:bg-gray-200">
        <Icon
          iconName="arrow-right"
          className={`transition-transform duration-150 stroke-black h-3 w-3 min-w-3 min-h-3 ${isModalOpen ? "-rotate-90" : "rotate-90"}`}
        />
      </span>
    </span>
  );
}

export default HeaderAvatar;
