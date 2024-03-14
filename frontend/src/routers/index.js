import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Home from "../pages/home/Home.jsx";
import NotFound from "../pages/errors/NotFound.jsx";
import Detail from "../pages/detail/Detail.jsx";
import BookDate from "../pages/booking/BookDate.jsx";
import BookSeat from "../pages/booking/BookSeat.jsx";

const routers = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/",
    component: Home,
  },
  {
    path: "/movie/:id",
    component: Detail,
  },
  {
    path: "/movie/bookings/:id",
    component: BookDate,
  },
  {
    path: "/movie/bookings/:id/seats",
    component: BookSeat,
  },
  {
    path: "*",
    component: NotFound,
  },
];

export default routers;
