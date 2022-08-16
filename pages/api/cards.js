import db from "../../lib/db";
import { v4 as uuidv4 } from "uuid";

export default function handler(req, res) {
  if (req.method == "POST") {
    if (req.body.type == "fetch") {
      db.query(
        `SELECT * FROM cards WHERE deck_set = '${req.body.deck_set}';`,
        (err, rows, fields) => {
          if (!err) {
            res.json(rows);
          } else {
            res.send(err);
          }
        }
      );

      return;
    }

    const { front, back, type, deck_set, userID } = req.body.data;
    const id = uuidv4();
    db.query(
      `INSERT INTO cards VALUES('${front}', '${back}', '${type}', '${id}', '${deck_set}', '${userID}')`,
      (err, rows, fields) => {
        if (!err) {
          res.json("ok");
        } else {
          res.json("err");
        }
      }
    );
  }

  if (req.method === "PUT") {
    req.body.forEach((card) => {
      const { Front, type } = card;
      db.query(
        `UPDATE cards SET type='${type}' WHERE Front ='${Front}'`,
        (err, rows, fields) => {
          if (!err) {
          } else {
            console.log(err);
          }
        }
      );
    });
  }
}
