import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./plugins/i18n";
import loadingSlice from "./stores/loadingSlice";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice, { loadingUserLogin } from "./stores/authSlice";
import movieSlice, { fetchMovies } from "./stores/movieSlice";
import seatSlice from "./stores/seatSlice";
import showTimeSlice from "./stores/showTimeSlice";
import orderSlice from "./stores/orderSlice";
import showSlice from "./stores/showSlice";
import timeFrameSlice from "./stores/timeFrameSlice";
import cinemaSlice from "./stores/cinemaSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
const store = configureStore({
  reducer: {
    loading: loadingSlice,
    auth: authSlice,
    movie: movieSlice,
    seat: seatSlice,
    show: showTimeSlice,
    order: orderSlice,
    showTime: showSlice,
    timeFrame: timeFrameSlice,
    cinema: cinemaSlice,
  },
});
store.dispatch(loadingUserLogin());
store.dispatch(fetchMovies());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="788929503764-tb6i823r4c2lf3m1mtcp419no22gaaaf.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
