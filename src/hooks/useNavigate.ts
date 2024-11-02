import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAppNavigate = () => {
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
  const [isManual, setIsManual] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const MAX_LIMIT_HISTORY: number = 50;

  useEffect(() => {
    let history: string[] = localStorage.getItem("routesHistory")?.split(",") ?? [];
    let index: number = Number(localStorage.getItem("currentRouteIndex"));

    if (!isManual) {
      // Reset state
      if (checkPush(history, location.pathname)) {
        history.push(location.pathname);
        index = history.length - 1;
        if (history.length > MAX_LIMIT_HISTORY) {
          history.shift();
          index -= 1;
        }
        localStorage.setItem("routesHistory", history.join(","));
        localStorage.setItem("currentRouteIndex", index.toString());
      }
    } else {
      setIsManual(false);
    }

    updateNavigationState(history, index);
  }, [location.pathname]);

  const updateNavigationState = (history: string[], index: number) => {
    setCanGoBack(index > 0);
    setCanGoForward(index < history.length - 1);
  };

  const checkPush = (history: string[], path: string): boolean => {
    return history.length === 0 || history[history.length - 1] !== path;
  };

  const goBackHandler = () => {
    let history: string[] = localStorage.getItem("routesHistory")?.split(",") ?? [];
    let index: number = Number(localStorage.getItem("currentRouteIndex"));

    if (index > 0) {
      const newIndex = index - 1;
      localStorage.setItem("currentRouteIndex", newIndex.toString());

      setIsManual(true);
      navigate(history[newIndex]);
    }
  };

  const goForwardHandler = () => {
    let history: string[] = localStorage.getItem("routesHistory")?.split(",") ?? [];
    let index: number = Number(localStorage.getItem("currentRouteIndex"));

    if (canGoForward) {
      const newIndex = index + 1;
      localStorage.setItem("currentRouteIndex", newIndex.toString());

      setIsManual(true);
      navigate(history[newIndex]);
    }
  };

  return {
    canGoBack,
    canGoForward,
    goBackHandler,
    goForwardHandler,
  };
};
