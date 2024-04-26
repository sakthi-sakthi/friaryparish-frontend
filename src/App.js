import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout";
import Home from "./home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<MainLayout />}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
