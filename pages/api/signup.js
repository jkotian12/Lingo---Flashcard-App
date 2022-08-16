import db from "../../lib/db";
import { v4 as uuidv4 } from "uuid";

export default function handler(req, res) {
  const id = uuidv4();
  if (req.method == "POST") {
    const { username, password } = req.body;
    db.query(
      `INSERT INTO user VALUES('${id}', '${username}',  '${password}')`,
      (err, rows, fields) => {
        if (!err) {
          res.json({ status: "ok", id });
        } else {
          res.json("err", err);
        }
      }
    );
  }
}
