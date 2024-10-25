import { Icon } from "components/Icon";
import { useAppNavigate } from "hooks/useNavigate";
import { ReactElement } from "react";

function HeaderNavigation(): ReactElement {
  const { canGoBack, canGoForward, goBackHandler, goForwardHandler } = useAppNavigate();

  return (
    <span className="flex gap-1">
      <span
        onClick={goBackHandler}
        className={`p-4 rounded-full ${canGoBack ? "cursor-pointer hover:bg-gray-200" : ""}`}>
        <Icon iconName={canGoBack ? "arrow-left-activ" : "arrow-left"} className="h-4 w-4" />
      </span>
      <span
        className={`p-4 rounded-full ${canGoForward ? "cursor-pointer hover:bg-gray-200" : ""}`}
        onClick={goForwardHandler}>
        <Icon iconName={canGoForward ? "arrow-right-activ" : "arrow-right"} className="h-4 w-4" />
      </span>
    </span>
  );
}

export default HeaderNavigation;
