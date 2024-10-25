import { useState, type ReactElement } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DropdownHeaderAvatar from "./ModalHeaderAvatar";

function HeaderAvatar(): ReactElement {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleProfileModal = () => {
    setProfileModalOpen(!profileModalOpen);
  };

  return (
    <span id="avatar-button">
      <span
        className="cursor-pointer flex flex-row gap-3 items-center"
        onClick={handleProfileModal}>
        <img
          className="w-[3rem] h-[3rem] p-1 rounded-xl ring-gray-300 cursor-pointer"
          src="/src/assets/img/header/default_avatar.png"
        />
        <IoIosArrowDown className="h-full cursor-pointer transition-transform" />
      </span>
      {profileModalOpen && <DropdownHeaderAvatar closeModal={() => setProfileModalOpen(false)} />}
    </span>
  );
}

export default HeaderAvatar;
