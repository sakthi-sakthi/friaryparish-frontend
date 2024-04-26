import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./../components/header";
import Footer from "../components/footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "66.5vh", padding: "10px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
