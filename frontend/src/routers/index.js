import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Home from "../pages/home/Home.jsx";
import NotFound from "../pages/errors/NotFound.jsx";
import Detail from "../pages/detail/Detail.jsx";
import BookDate from "../pages/booking/BookDate.jsx";
import BookSeat from "../pages/booking/BookSeat.jsx";
import Checkout from "../pages/booking/Checkout.jsx";
import PaymentSuccess from "../pages/booking/Success.jsx";
import Order from "../pages/order/Order.jsx";
import Profile from "../pages/profile/Profile.jsx";
import Cinema from "../pages/cinema/CInema.jsx";

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
    path: "/movie/bookings/:id/seats/:date",
    component: BookSeat,
  },
  {
    path: "/movie/checkout",
    component: Checkout,
  },
  {
    path: "payment/result",
    component: PaymentSuccess,
  },
  {
    path: "/orders",
    component: Order,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/cinema",
    component: Cinema,
  },
  {
    path: "*",
    component: NotFound,
  },
];

export { routers };
