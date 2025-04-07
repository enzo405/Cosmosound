import { ReactNode } from "react";
import { Icon } from "./../components/icons/Icon";
import { IconName } from "./../constants/iconName";

interface PageLayoutProps {
  title: ReactNode | string;
  subtitle?: ReactNode;
  headerActions: ReactNode;
  thumbnail?: string;
  actionIconName?: IconName;
  onPageActionClick?: () => void;
  displaySettings?: boolean;
  settingsComponent?: ReactNode;
  content: ReactNode;
}

export default function PageLayout({
  thumbnail,
  title,
  subtitle,
  headerActions,
  actionIconName = "ellipsis",
  onPageActionClick,
  displaySettings = false,
  settingsComponent,
  content,
}: PageLayoutProps) {
  return (
    <div className="relative flex flex-col rounded-lg bg-box-bg h-full w-full gap-4 py-8 px-4">
      <div className="flex flex-col sm:flex-row w-full lg:gap-10 md:gap-6 gap-4">
        {thumbnail && (
          <img
            loading="eager"
            className="rounded-full lg:mm-size-64 md:mm-size-52 mm-size-40 shadow-2xl"
            src={thumbnail}
            alt={typeof title === "string" ? title : "thumbnail"}
          />
        )}
        <div
          className={`w-full ${thumbnail ? "sm:w-4/5 flex-col gap-2" : "flex-row gap-6 items-center"} flex text-dark-custom`}>
          <h1
            className={`${thumbnail ? "lg:text-5xl md:text-3xl text-2xl mr-9" : "sm:text-6xl text-4xl w-auto"} flex flex-row items-center gap-1 font-bs font-semibold whitespace-nowrap text-wrap break-everywhere`}>
            {title}
          </h1>
          {subtitle && <span className="font-light">{subtitle}</span>}
          <span className="flex flex-row-reverse sm:flex-row gap-4 mt-2 md:mt-auto mr-auto w-auto justify-start">
            {headerActions}
          </span>
        </div>
        {onPageActionClick && (
          <span id="settings">
            <Icon
              onClick={onPageActionClick}
              iconName={actionIconName}
              className="absolute top-6 right-4 fill-dark-custom cursor-pointer md:mm-size-8 mm-size-6"
            />
          </span>
        )}
        {displaySettings && settingsComponent}
      </div>
      <div className="flex flex-col gap-3 whitespace-nowrap text-wrap break-words">{content}</div>
    </div>
  );
}
