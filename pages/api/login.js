import db from "../../lib/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, email } = req.body;
    db.query(
      `SELECT * FROM user WHERE username= '${username}' pass='${password}')`,
      (err, rows, fields) => {
        if (!err) {
          console.log(fields);
        } else {
          console.log(err);
        }
      }
    );
  }
}
