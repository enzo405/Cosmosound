import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header/Header";

function Root(): ReactElement {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
