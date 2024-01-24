import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Home from "../pages/home/Home.jsx";
import NotFound from "../pages/errors/NotFound.jsx";

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
        component: Home
    },
    {
        path: "*",
        component: NotFound,
    },
];

export default routers;
