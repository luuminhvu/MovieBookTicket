import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { routers } from "./routers";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoadingLayout from "./components/common/Loading";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Sidebar from "./pages/admin/Dashboard/Layout";
import ShowTime from "./pages/admin/Showtime/Showtime";
import TimeFrame from "./pages/admin/TimeFrame/TimeFrame";
import Movie from "./pages/admin/Movie/Movie";
import User from "./pages/admin/User/User";
import Cinema from "./pages/admin/Cinema/Cinema";
import CinemaHall from "./pages/admin/Cinema/CinemaHall";
import Seat from "./pages/admin/Cinema/Seat";
import Order from "./pages/admin/Order/Order";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import SliderSetting from "./pages/admin/Slide/Slider";
import News from "./pages/admin/News/News";
import EditNews from "./pages/admin/News/EditNews";
import AddNews from "./pages/admin/News/AddNew";
import Vouchers from "./pages/admin/Vouchers/Vouchers";
import UserVoucher from "./pages/admin/Vouchers/UserVoucher";

function App() {
  const isLoading = useSelector((state) => state.loading.loading);
  const isAdmin = useSelector((state) => state.auth.role);
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
        {isAdmin === "admin" && (
          <Route path="/admin" element={<Sidebar />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="showtime" element={<ShowTime />} />
            <Route path="timeframe" element={<TimeFrame />} />
            <Route path="movie" element={<Movie />} />
            <Route path="user" element={<User />} />
            <Route path="cinema" element={<Cinema />} />
            <Route path="cinemahall" element={<CinemaHall />} />
            <Route path="seat" element={<Seat />} />
            <Route path="order" element={<Order />} />
            <Route path="slider" element={<SliderSetting />} />
            <Route path="news/add" element={<AddNews />} />
            <Route path="news" element={<News />} />
            <Route path="news/:id" element={<EditNews />} />
            <Route path="vouchers" element={<Vouchers />} />
            <Route path="voucher-user" element={<UserVoucher />} />
          </Route>
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
