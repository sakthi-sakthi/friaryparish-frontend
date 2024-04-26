import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./../components/header";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";
const MainLayout = () => {
  let location = useLocation();
  const url = location.pathname;
  const [pageTitle, setPageTitle] = useState("");
  useEffect(() => {
  const path = {
    "/history": "History",
    "/our-vision": "Our Vision",
  };
  setPageTitle(path[url] ? path[url] : url);
}, [url]);
  return (
    <>
      <Header />
      <div style={{ minHeight: "66.5vh" }}>
      <div className="home-mother">
  <div className="container" style={{ padding: 30 }}>
    <h3 className="entry-title motherhouse">
      <a href="/motherhouse">{pageTitle}</a>
    </h3>
    <div className="brudcrums">
      <a href="/">Home &nbsp;»&nbsp; </a>
      <span className="pagename">{pageTitle}</span>
    </div>
  </div>
</div>

        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
