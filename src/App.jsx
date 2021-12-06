import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Agenda } from "./components/Agenda";
import { Menu } from "./components/Menu";
import { Login } from "./components/Login";

function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/agenda" element={<Agenda />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
