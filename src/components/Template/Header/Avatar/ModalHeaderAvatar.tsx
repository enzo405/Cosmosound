import Divider from "components/Divider";
import { routesConfig } from "config/app-config";
import { useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeSwitch from "./DarkModeSwitch";
import { Icon } from "components/Icon";
import SettingsOptions from "components/SettingsOptions";

interface DropdownHeaderAvatar {
  closeModal: () => void;
}

export default function DropdownHeaderAvatar({ closeModal }: DropdownHeaderAvatar): ReactElement {
  const [checked, setChecked] = useState(localStorage.theme === "dark");
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      const avatarButton = document.getElementById("avatar-button");
      const target = event.target as Node;
      const clickIsOnModal = avatarButton?.contains(target);

      if (!clickIsOnModal) {
        closeModal();
      }
    };

    window.addEventListener("click", handleClickAway);
  }, []);

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
    <div className="absolute top-0 right-0 z-10 transform-gpu translate-x-[-10px] translate-y-[80px]">
      <div className="bg-white block py-1 text-gray-900 rounded-xl w-44 xsm:w-72 border border-settings-divider">
        {/* Profile Section */}
        <SettingsOptions>
          <img
            className="w-[2.6rem] h-[2.6rem] rounded-xl ring-gray-300"
            src="/src/assets/img/header/default_avatar.png"
          />
          <span className="ml-2">
            <p>Belo Smile</p>
            <p className="text-settings-text-grey">belo.smile@gmail.com</p>
          </span>
        </SettingsOptions>
        <Divider />
        {/* Settings Section */}
        <SettingsOptions
          className="cursor-pointer"
          onClick={() => navigate(routesConfig.account.path)}>
          <Icon iconName="account" className="mr-1 w-5 h-5" />
          Account
        </SettingsOptions>
        <SettingsOptions
          className="cursor-pointer"
          onClick={() => navigate(routesConfig.artistPanel.path)}>
          <Icon iconName="artistPanel" className="mr-1 w-5 h-5" />
          Artist Panel
        </SettingsOptions>
        <SettingsOptions
          className="cursor-pointer"
          onClick={() => navigate(routesConfig.legal.path)}>
          <Icon iconName="legal" className="mr-1 w-5 h-5" />
          Legal
        </SettingsOptions>
        <SettingsOptions
          className="cursor-pointer"
          onClick={() => navigate(routesConfig.aboutUs.path)}>
          <Icon iconName="aboutus" className="mr-1 w-5 h-5" />
          About us
        </SettingsOptions>
        <Divider />
        <SettingsOptions>
          <span
            className="flex flex-row gap-2 justify-start items-center cursor-pointer w-full"
            onClick={() => setChecked(!checked)}>
            <Icon iconName="darkmode" className="mr-1 w-5 h-5" />
            Dark Mode
          </span>
          <DarkModeSwitch checked={checked} setChecked={setChecked} />
        </SettingsOptions>
        <Divider />
        {/* Footer Section */}
        <SettingsOptions className="cursor-pointer">
          <Icon iconName="logout" className="mr-1 w-5 h-5" />
          Logout
        </SettingsOptions>
      </div>
    </div>
  );
}