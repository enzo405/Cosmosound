import { type ReactElement } from "react";

function Sidebar(): ReactElement {
  return (
    <div className="bg-red-500 h-screen min-w-40 w-full flex flex-row justify-center items-center">
      <img className="m-1 w-8 h-8" src="./src/assets/img/cosmosound.svg" alt="CosmoSound" />
      CosmoSound
    </div>
  );
}

export default Sidebar;
