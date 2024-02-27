import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import routers from "./routers";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoadingLayout from "./components/common/Loading";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  const isLoading = useSelector((state) => state.loading.loading);

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <LoadingLayout isLoading={isLoading} />
      <Header />
      <Routes>
        {routers.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
