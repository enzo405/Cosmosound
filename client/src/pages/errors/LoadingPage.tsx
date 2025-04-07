import Loading from "./../../components/Loading";
import { ReactElement } from "react";

export default function LoadingPage(): ReactElement {
  return (
    <div className="bg-body-bg h-screen w-screen flex justify-center items-center text-center">
      <Loading />
    </div>
  );
}
