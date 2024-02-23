import React from "react";
import { Route, Routes } from "react-router";
import CamPage from "./webCamPage";
import Registration from "./registration";
import Admin from "./admin";

export default function FileAreaPage() {
  return (
    <div id="fileAreaPage">
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/video/:id" element={<CamPage />} />
      </Routes>
    </div>
  );
}
