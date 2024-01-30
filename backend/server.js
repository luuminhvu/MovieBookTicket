const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require("msnodesqlv8");
const config = require("./config/dbconfig");
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

sql.query(config, "SELECT * FROM Users", (err, rows) => {
  if (err) {
    console.log(err);
  } else {
    console.log(rows);
    sql.query(
      config,
      "INSERT INTO Users (Username, Password, Role ,Email) VALUES ('admin', 'admin', 'admin', 'admin@gmail.com')",
      (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      }
    );
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
