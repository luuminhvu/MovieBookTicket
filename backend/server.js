const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/dbconfig");
const userRouter = require("./routers/user");
const movieRouter = require("./routers/movie");
const ticketRouter = require("./routers/ticket");
const paymentRouter = require("./routers/payment");
const orderRouter = require("./routers/order");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();
dotenv.config();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/ticket", ticketRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/order", orderRouter);

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
