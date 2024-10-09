import Divider from "components/Divider";
import { routesConfig } from "config/app-config";
import { useEffect, useState, type ReactElement } from "react";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import HeaderAvatarOptions from "./HeaderAvatarOptions";
import { LuLogOut } from "react-icons/lu";
import DarkModeSwitch from "./DarkModeSwitch";

function HeaderAvatar(): ReactElement {
  const [checked, setChecked] = useState(localStorage.theme === "dark");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileModal = () => {
    setProfileModalOpen(!profileModalOpen);
  };

  useEffect(() => {
    setProfileModalOpen(false);
  }, [window.location.pathname]);

  useEffect(() => {
    if (checked) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.theme = "light";
    }
  }, [checked]);

  return (
    <>
      <img
        onClick={handleProfileModal}
        className="w-12 h-12 p-1 rounded-full ring-1 ring-gray-300 cursor-pointer"
        src="/src/assets/img/default_avatar.png"
      />
      {profileModalOpen && (
        <div className="absolute top-0 right-0 z-10 transform-gpu translate-x-[-10px] translate-y-[80px]">
          <div className="block py-1 text-m text-gray-900 border border-gray-300 rounded-lg bg-gray-50 w-52 h-64">
            {/* Profile Section */}
            <HeaderAvatarOptions onClick={() => navigate(routesConfig.account.path)}>
              <FaUser className="mt-1" />
              BELO Smile
            </HeaderAvatarOptions>
            <Divider />
            {/* Settings Section */}
            <HeaderAvatarOptions isClickable={false}>
              <span className="cursor-pointer w-full" onClick={() => setChecked(!checked)}>
                Dark Mode
              </span>
              <DarkModeSwitch checked={checked} setChecked={setChecked} />
            </HeaderAvatarOptions>
            <HeaderAvatarOptions onClick={() => navigate(routesConfig.logout.path)}>
              <LuLogOut className="mt-1" />
              Logout
            </HeaderAvatarOptions>
            <Divider />
            {/* Footer Section */}
            <HeaderAvatarOptions onClick={() => navigate(routesConfig.aboutUs.path)}>
              About us
            </HeaderAvatarOptions>
            <HeaderAvatarOptions>Legal</HeaderAvatarOptions>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderAvatar;
