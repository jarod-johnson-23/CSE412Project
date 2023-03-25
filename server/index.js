const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const Axios = require("axios");

const sql_db = mysql.createConnection({
  host: "cse412database.chylenqwhiyb.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "ffieKdSipxmS2299!!",
  database: "CSE412ProjectDatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.listen(3307, () => {
  console.log("database running on port 3307");
});

app.get("/get-users", (req, res) => {
  const sqlSelect = "SELECT * FROM Users";

  sql_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
