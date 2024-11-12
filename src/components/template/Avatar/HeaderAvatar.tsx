import { HTMLAttributes, useState, type ReactElement } from "react";
import DropdownHeaderAvatar from "./ModalHeaderAvatar";
import { Icon } from "components/icons/Icon";

function HeaderAvatar({
  className,
  id = "avatar-button",
}: HTMLAttributes<HTMLHRElement>): ReactElement {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleProfileModal = () => {
    setProfileModalOpen(!profileModalOpen);
  };

  return (
    <span id={id} className={className}>
      <span
        className="group cursor-pointer flex flex-row items-center"
        onClick={handleProfileModal}>
        <img
          className="min-w-[3rem] min-h-[3rem] w-[3rem] h-[3rem] p-1 rounded-xl ring-gray-300 cursor-pointer aspect-square object-contain"
          src="/src/assets/img/header/default_avatar.png"
          alt="profile picture"
        />
        <span className="hidden md:block p-4 cursor-pointer rounded-xl group-hover:bg-gray-200">
          <Icon
            iconName="arrow-right"
            className={`transition-transform duration-150 stroke-black h-3 w-3 min-w-3 min-h-3 ${profileModalOpen ? "-rotate-90" : "rotate-90"}`}
          />
        </span>
      </span>
      {profileModalOpen && (
        <DropdownHeaderAvatar idDropdown={id} closeModal={() => setProfileModalOpen(false)} />
      )}
    </span>
  );
}

export default HeaderAvatar;
