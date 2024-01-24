import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import routers from "./routers";
import Header from "./components/common/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {routers.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
