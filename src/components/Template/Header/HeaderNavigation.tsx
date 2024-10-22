import { Icon } from "components/Icon";
import { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function HeaderNavigation(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

  useEffect(() => {
    setCanGoBack(location.key !== "default");
  }, [location, history]);

  const goBackHandler = () => {
    if (canGoBack) navigate(-1);
  };

  const goForwardHandler = () => {
    navigate(+1);
  };

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
      <Icon
        iconName="arrow-right-activ"
        className="w-4 h-4 cursor-pointer"
        onClick={goForwardHandler}
      />
    </span>
  );
}

export default HeaderNavigation;
