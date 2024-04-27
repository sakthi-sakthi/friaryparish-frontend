import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout";
import Home from "./home";
import History from "./pages/AboutUs/History";
import PriestMessage from "./pages/AboutUs/PriestMessage";
import Clergy from "./pages/AboutUs/Clergy";
import NewsLetter from "./pages/AboutUs/NewsLetter";
import Association from "./pages/Associations/Association";
import MassCalendar from "./pages/Calendar/MassCalendar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<MainLayout />}>
          <Route path="about-us" element={<History />} />
          <Route path="history" element={<History />} />
          <Route path="parish-priest-message" element={<PriestMessage />} />
          <Route path="parish-clergy" element={<Clergy />} />
          <Route path="parish-pastoral-council" element={<History />} />
          <Route path="mass-booking" element={<History />} />
          <Route path="news-letters" element={<NewsLetter />} />
          {/* Association section routing */}
          <Route path="lector-ministry" element={<Association />} />
          <Route path="altar-service" element={<Association />} />
          <Route path="liturgy-committee" element={<Association />} />
          <Route path="music-ministry" element={<Association />} />
          <Route path="prayer-group" element={<Association />} />
          <Route path="divine-spark" element={<Association />} />
          <Route path="kristanjali-news" element={<Association />} />
          <Route path="legion-mary" element={<Association />} />
          <Route path="assisi-malar" element={<Association />} />
          <Route path="secular-order" element={<Association />} />
          <Route path="vincent-de-paul" element={<Association />} />
          <Route path="prison-ministry" element={<Association />} />
          <Route path="family-cell" element={<Association />} />
          <Route path="mother-theresa" element={<Association />} />
          <Route path="jesus-youth" element={<Association />} />
          <Route path="living-clay" element={<Association />} />
          <Route path="education-aid" element={<Association />} />
          <Route path="family-welfare" element={<Association />} />
          <Route path="sunday-school" element={<Association />} />
          {/* Mass Calendar section routing */}
          <Route path="liturgy-calendar" element={<MassCalendar />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
