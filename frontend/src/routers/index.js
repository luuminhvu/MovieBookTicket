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
import Movie from "../pages/movie/Movie.jsx";
import About from "../pages/about/About.jsx";
import Active from "../pages/active/Active.jsx";
import Show from "../pages/show/Show.jsx";
import News from "../pages/news/News.jsx";
import PaymentMomo from "../pages/booking/PaymentMomo.jsx";
import Coupon from "../pages/coupon/Coupon.jsx";
import NewsDetails from "../pages/news/NewsDetail.jsx";

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
    path: "payment/result/momo",
    component: PaymentMomo,
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
    path: "/film",
    component: Movie,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/activate",
    component: Active,
  },
  {
    path: "/show",
    component: Show,
  },
  {
    path: "/news",
    component: News,
  },
  {
    path: "/news/:id",
    component: NewsDetails,
  },
  {
    path: "/coupons",
    component: Coupon,
  },
  {
    path: "*",
    component: NotFound,
  },
];

export { routers };
