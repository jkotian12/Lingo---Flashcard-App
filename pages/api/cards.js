// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../lib/db";

export default function handler(req, res) {
  if (req.method === "GET") {
    db.query("SELECT * FROM card", (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  }
}
