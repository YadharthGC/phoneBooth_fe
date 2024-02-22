import React from "react";
import { Route, Routes } from "react-router";
import RegisterPage from "./registerPage";
import AdminPage from "./adminPage";
import VideoPage from "./videoPage";
import CamPage from "./webCamPage";
import UsersPage from "./usersPage";

export default function FileAreaPage() {
  return (
    <div id="fileAreaPage">
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/video/:id" element={<CamPage />} />
      </Routes>
    </div>
  );
}
