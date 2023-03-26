const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const Axios = require("axios");
const { config } = require("dotenv");

config();

const sql_db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.listen(3307, () => {
  console.log("database running on port 3307");
});

app.get("/get-users", (req, res) => {
  const sqlSelect = "SELECT * FROM Users LIMIT 5";

  sql_db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
