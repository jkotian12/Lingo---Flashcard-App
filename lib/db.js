const mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Proctorate2506",
  database: "srs",
});
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to db");
  }
});

module.exports = db;
