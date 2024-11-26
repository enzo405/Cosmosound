import Divider from "components/Divider";
import { routesConfig } from "config/app-config";
import { useEffect, useRef, useState, type ReactElement } from "react";
import DarkModeSwitch from "./DarkModeSwitch";
import { Icon } from "components/icons/Icon";
import SettingsOptions from "components/settings/SettingsOptions";
import { useTheme } from "hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { useOpenAvatarModal } from "hooks/useOpenAvatarModal";
import { useScreenSize } from "hooks/useScreenSize";

interface DropdownHeaderAvatar {}

export default function DropdownHeaderAvatar({}: DropdownHeaderAvatar): ReactElement {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(theme === "dark");
  const { isModalOpen, closeModal } = useOpenAvatarModal();
  const modalRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const isMobile = useScreenSize();

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      let id = `avatar-button-${isMobile ? "mobile" : "desktop"}`;
      const avatarButton = document.getElementById(id);
      const target = event.target as Node;
      const clickIsOnModal = avatarButton?.contains(target) || modalRef.current?.contains(target);

      if (!clickIsOnModal) {
        closeModal();
      }
    };

    window.addEventListener("click", handleClickAway);

    return () => {
      window.removeEventListener("click", handleClickAway);
    };
  }, [isMobile]);

  useEffect(() => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [checked]);

  return (
    <div
      ref={modalRef}
      className="fixed top-0 right-0 z-30 transform-gpu rounded-xl translate-x-[-10px] translate-y-[10px] sm:translate-y-[80px] shadow-xl"
      style={{
        display: isModalOpen ? "block" : "none",
      }}>
      <div className="bg-white block py-1 text-gray-900 rounded-xl w-44 xsm:w-52 sm:w-60 border border-settings-divider">
        {/* Profile Section */}
        <SettingsOptions>
          <img
            className="w-[2.6rem] h-[2.6rem] hidden xsm:block rounded-xl ring-gray-300"
            src="/src/assets/img/header/default_avatar.png"
            alt="profile picture"
          />
          <span className="ml-2">
            <p>Belo Smile</p>
            <p className="text-dark-grey">belo.smile@gmail.com</p>
          </span>
        </SettingsOptions>
        <Divider />
        {/* Settings Section */}
        <SettingsOptions
          className="cursor-pointer gap-2"
          onClick={() => navigate(routesConfig.account.path)}>
          <Icon iconName="account" className="mr-1 w-5 h-5" />
          Account
        </SettingsOptions>
        <SettingsOptions
          className="cursor-pointer gap-2"
          onClick={() => navigate(routesConfig.artistPanel.path)}>
          <Icon iconName="artistPanel" className="mr-1 w-5 h-5" />
          Artist Panel
        </SettingsOptions>
        <SettingsOptions
          className="cursor-pointer gap-2"
          onClick={() => navigate(routesConfig.legal.path)}>
          <Icon iconName="legal" className="mr-1 w-5 h-5" />
          Legal
        </SettingsOptions>
        <SettingsOptions
          className="cursor-pointer gap-2"
          onClick={() => navigate(routesConfig.aboutUs.path)}>
          <Icon iconName="aboutus" className="mr-1 w-5 h-5" />
          About us
        </SettingsOptions>
        <Divider />
        <SettingsOptions className="gap-2">
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
        <SettingsOptions className="cursor-pointer gap-2">
          <Icon iconName="logout" className="mr-1 w-5 h-5" />
          Logout
        </SettingsOptions>
      </div>
    </div>
  );
}
