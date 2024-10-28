import { HTMLAttributes, useState, type ReactElement } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DropdownHeaderAvatar from "./ModalHeaderAvatar";

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
        className="cursor-pointer flex flex-row gap-3 items-center"
        onClick={handleProfileModal}>
        <img
          className="min-w-[3rem] min-h-[3rem] w-[3rem] h-[3rem] p-1 rounded-xl ring-gray-300 cursor-pointer aspect-square object-contain"
          src="/src/assets/img/header/default_avatar.png"
        />
        <IoIosArrowDown className="hidden md:block min-w-4 min-h-4 h-full cursor-pointer transition-transform" />
      </span>
      {profileModalOpen && (
        <DropdownHeaderAvatar idDropdown={id} closeModal={() => setProfileModalOpen(false)} />
      )}
    </span>
  );
}

export default HeaderAvatar;
