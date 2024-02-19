const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/dbconfig");
const userRouter = require("./routers/user");
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
