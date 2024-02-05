import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin.js";
import Login from "./pages/Login.js";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />


        </Routes>
      </BrowserRouter>
  );
}

export default App;
