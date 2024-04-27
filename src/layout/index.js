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
      "/parish-priest-message": "Parish Priest Message",
      "/parish-clergy": "Parish Clergy",
      "/parish-pastoral-council": "Parish Pastoral Council",
      "/news-letters": "NewsLetter",
      "/lector-ministry": "Lector Ministry",
      "/altar-service": "Altar Service",
      "/liturgy-committee" : "Liturgy Committee",
      "/music-ministry" : "Music Ministry",
      "/prayer-group": "Apostolic Prayer Group",
      "/divine-spark": "Divine Spark",
      "/kristanjali-news" : "Kristanjali News",
      "/legion-mary" : "Legion Mary",
      "/assisi-malar" : "Assisi Malar",
      "/secular-order" : "Secular Franciscan Order",
      "/vincent-de-paul" : "Vincent De Paul",
      "/prison-ministry" : "Prison Ministry",
      "/family-cell" : "Family Cell",
      "/mother-theresa" : "Santha Mother Theresa Sevadarshigalu",
      "/jesus-youth" : "Jesus Youth",
      "/living-clay" : "Living Clay",
      "/liturgy-calendar" : "Liturgy Calendar",
      "/education-aid" : "Education Aid",
      "/family-welfare" : "Family Welfare",
      "/sunday-school" : "Sunday School",
      '/mass-booking': "Mass Booking",
      "/voice": "Voice",
      "/associations" : "Associations",
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
              <a href={pageTitle}>{pageTitle}</a>
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
