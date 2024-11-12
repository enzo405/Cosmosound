import ArrowLeft from "components/icons/ArrowLeft";
import ArrowRight from "components/icons/ArrowRight";
import { useAppNavigate } from "hooks/useNavigate";
import { ReactElement } from "react";

function HeaderNavigation(): ReactElement {
  const { canGoBack, canGoForward, goBackHandler, goForwardHandler } = useAppNavigate();

  return (
    <span className="flex gap-1">
      <span
        onClick={goBackHandler}
        className={`p-3 sm:p-4 rounded-full ${canGoBack ? "cursor-pointer hover:bg-gray-200" : ""}`}>
        <ArrowLeft isActiv={canGoBack} />
      </span>
      <span
        className={`p-3 sm:p-4 rounded-full ${canGoForward ? "cursor-pointer hover:bg-gray-200" : ""}`}
        onClick={goForwardHandler}>
        <ArrowRight isActiv={canGoForward} />
      </span>
    </span>
  );
}

export default HeaderNavigation;
