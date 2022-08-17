const mysql = require("mysql");

var db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to db");
  }
});

module.exports = db;
