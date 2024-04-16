const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/dbconfig");
const userRouter = require("./routers/user");
const movieRouter = require("./routers/movie");
const ticketRouter = require("./routers/ticket");
const paymentRouter = require("./routers/payment");
const orderRouter = require("./routers/order");
const showtimeRouter = require("./routers/showtime");
const timeframeRouter = require("./routers/timeframe");
const cinemaRouter = require("./routers/cinema");
const seatRouter = require("./routers/seat");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/ticket", ticketRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/showtime", showtimeRouter);
app.use("/api/v1/timeframe", timeframeRouter);
app.use("/api/v1/cinema", cinemaRouter);
app.use("/api/v1/seat", seatRouter);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
