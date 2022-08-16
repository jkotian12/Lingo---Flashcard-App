import db from "../../lib/db";

export default function handler(req, res) {
  if (req.method == "POST") {
    db.query(
      `SELECT * FROM decks WHERE user = '${req.body.id}'`,
      (err, rows, fields) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      }
    );
  }
}
