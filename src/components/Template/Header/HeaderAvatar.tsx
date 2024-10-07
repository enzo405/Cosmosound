import Divider from "components/Divider";
import { routesConfig } from "config/app-config";
import { useState, type ReactElement } from "react";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function HeaderAvatar(): ReactElement {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileModal = () => {
    setProfileModalOpen(!profileModalOpen);
  };

  return (
    <>
      <img
        onClick={handleProfileModal}
        className="w-12 h-12 p-1 rounded-full ring-1 ring-gray-300 cursor-pointer"
        src="/src/assets/img/default_avatar.png"
      />
      {profileModalOpen && (
        <div className="absolute top-0 right-0 z-10 transform-gpu translate-x-[-10px] translate-y-[80px]">
          <div className="block py-1 text-m text-gray-900 border border-gray-300 rounded-lg bg-gray-50 w-44 h-48">
            {/* Profile Section */}
            <div
              onClick={() => navigate(routesConfig.account.path)}
              className="flex flex-row gap-1 justify-start m-1 p-2 rounded-sm cursor-pointer hover:bg-slate-400">
              <FaUser className="mt-1" />
              BELO Smile
            </div>
            <Divider className="" />
            {/* Settings Section */}
            <Divider className="" />
            {/* Footer Section */}
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderAvatar;
