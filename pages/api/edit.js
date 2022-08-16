import db from "../../lib/db";

export default function handler(req, res) {
  if (req.method == "PUT") {
    const { Front, Back, ID } = req.body.data;
    db.query(
      `UPDATE cards SET Front='${Front}', Back='${Back}' WHERE ID ='${ID}'`,
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
