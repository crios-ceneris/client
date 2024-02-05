import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin.js";
import Login from "./pages/Login.js";
import General from "./pages/General.js";
import Tecnico from "./pages/Tecnico.js";
import Supervisor from "./pages/Supervisor.js";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/supervisor" element={<Supervisor />} />
            <Route path="/tecnico" element={<Tecnico />} />
            <Route path="/general" element={<General />} />




        </Routes>
      </BrowserRouter>
  );
}

export default App;
