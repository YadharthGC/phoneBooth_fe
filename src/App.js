import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FileAreaPage from "./components/fileArea";

function App() {
  return (
    <div className="phoneBoothPage">
      <Router>
        <Routes>
          <Route path="/*" element={<FileAreaPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
