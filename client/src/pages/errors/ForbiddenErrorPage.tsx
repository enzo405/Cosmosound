import { routesConfig } from "config/app-config";
import { useEffect, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function ForbiddenErrorPage(): ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    const eyef = document.getElementById("eyef");
    let cx = eyef?.getAttribute("cx");
    let cy = eyef?.getAttribute("cy");

    const handleMouseMove = (evt: MouseEvent) => {
      let x = evt.clientX / window.innerWidth;
      let y = evt.clientY / window.innerHeight;

      root.style.setProperty("--mouse-x", x.toString());
      root.style.setProperty("--mouse-y", y.toString());

      cx = (115 + 30 * x).toString();
      cy = (50 + 30 * y).toString();
      eyef?.setAttribute("cx", cx);
      eyef?.setAttribute("cy", cy);
    };

    const handleTouchMove = (touchHandler: TouchEvent) => {
      let x = touchHandler.touches[0].clientX / window.innerWidth;
      let y = touchHandler.touches[0].clientY / window.innerHeight;

      root.style.setProperty("--mouse-x", x.toString());
      root.style.setProperty("--mouse-y", y.toString());
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-1/3 h-1/3 mt-10 flex flex-col justify-center items-center">
        <svg id="robot-error" viewBox="0 0 210 120" role="img">
          <defs>
            <clipPath id="white-clip">
              <circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="20" />
            </clipPath>
            <text id="text-s" className="text-[120px]" y="106">
              403
            </text>
          </defs>
          <path
            className="fill-primary-orange"
            d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6"
          />
          <use xlinkHref="#text-s" x="-0.5px" y="-1px" fill="black"></use>
          <use xlinkHref="#text-s" fill="#2b2b2b"></use>
          <g id="robot">
            <g id="eye-wrap" className="overflow-hidden">
              <use xlinkHref="#white-eye"></use>
              <circle
                id="eyef"
                className="eye"
                clipPath="url(#white-clip)"
                fill="#000"
                stroke="#2aa7cc"
                strokeWidth="2"
                strokeMiterlimit="10"
                cx="130"
                cy="65"
                r="11"
              />
              <ellipse id="white-eye" fill="#2b2b2b" cx="130" cy="40" rx="18" ry="12" />
            </g>
            <circle className="fill-[#444]" cx="105" cy="32" r="2.5" id="tornillo" />
            <use xlinkHref="#tornillo" x="50"></use>
            <use xlinkHref="#tornillo" x="50" y="60"></use>
            <use xlinkHref="#tornillo" y="60"></use>
          </g>
        </svg>
        <span className="text-dark-custom font-semibold text-xl flex flex-col gap-1">
          You cannot see this page.
          <button
            type="button"
            onClick={() => navigate(routesConfig.home.path)}
            className="border-2 border-dark-glassy px-4 py-2 rounded-xl hover:bg-dark-glassy">
            Go Back Home
          </button>
        </span>
      </div>
    </div>
  );
}

export default ForbiddenErrorPage;
