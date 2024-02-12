import './App.css';
import React from 'react'

// importamos páginas
import Login from "./pages/Login.js"
import Admin from './pages/Admin.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="*" element={<Login />}></Route>
      </Routes>
    </Router>
  )
}
export default App