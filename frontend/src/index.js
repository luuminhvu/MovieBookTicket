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
const store = configureStore({
  reducer: {
    loading: loadingSlice,
    auth: authSlice,
    movie: movieSlice,
    seat: seatSlice,
    show: showTimeSlice,
  },
});
store.dispatch(loadingUserLogin());
store.dispatch(fetchMovies());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
