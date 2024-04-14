import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { routers, routerAdmin } from "./routers";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoadingLayout from "./components/common/Loading";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Sidebar from "./pages/admin/Dashboard/Dashboard";
import ShowTime from "./pages/admin/Showtime/Showtime";
import TimeFrame from "./pages/admin/TimeFrame/TimeFrame";
import Movie from "./pages/admin/Movie/Movie";
import User from "./pages/admin/User/User";

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
        <Route path="/admin" element={<Sidebar />}>
          <Route path="show" element={<ShowTime />} />
          <Route path="time-frame" element={<TimeFrame />} />
          <Route path="movie" element={<Movie />} />
          <Route path="user" element={<User />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
