import db from "../../lib/db";

export default function handler(req, res) {
  if (req.method == "POST") {
    const { formData, id } = req.body;
    db.query(
      `INSERT INTO decks VALUES('${formData}', '${id}')`,
      (err, rows, fields) => {
        if (!err) {
          res.json("ok");
        } else {
          res.json("err");
        }
      }
    );
  }
}
