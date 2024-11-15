import ArrowLeft from "components/icons/ArrowLeft";
import ArrowRight from "components/icons/ArrowRight";
import { useAppNavigate } from "hooks/useNavigate";
import { ReactElement } from "react";

const defaultStyleArrows = "flex justify-center items-center p-1 sm:p-4 rounded-full";

function HeaderNavigation(): ReactElement {
  const { canGoBack, canGoForward, goBackHandler, goForwardHandler } = useAppNavigate();

  return (
    <span className="flex gap-1 items-center mr-2">
      <span
        onClick={goBackHandler}
        className={`${defaultStyleArrows} w-8 h-8 ${canGoBack ? "cursor-pointer hover:bg-gray-200" : ""}`}>
        <ArrowLeft isActiv={canGoBack} />
      </span>
      <span
        className={`${defaultStyleArrows} w-8 h-8 ${canGoForward ? "cursor-pointer hover:bg-gray-200" : ""}`}
        onClick={goForwardHandler}>
        <ArrowRight isActiv={canGoForward} />
      </span>
    </span>
  );
}

export default HeaderNavigation;
