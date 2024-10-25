import { Icon } from "components/Icon";
import { useAppNavigate } from "hooks/useNavigate";
import { ReactElement } from "react";

function HeaderNavigation(): ReactElement {
  const { canGoBack, canGoForward, goBackHandler, goForwardHandler } = useAppNavigate();

  return (
    <span className="flex gap-5">
      {canGoBack ? (
        <Icon
          iconName="arrow-left-activ"
          className="w-4 h-4 cursor-pointer"
          onClick={goBackHandler}
        />
      ) : (
        <Icon iconName="arrow-left" className="w-4 h-4" onClick={goBackHandler} />
      )}
      {canGoForward ? (
        <Icon
          iconName="arrow-right-activ"
          className="w-4 h-4 cursor-pointer"
          onClick={goForwardHandler}
        />
      ) : (
        <Icon iconName="arrow-right" className="w-4 h-4" onClick={goForwardHandler} />
      )}
    </span>
  );
}

export default HeaderNavigation;
