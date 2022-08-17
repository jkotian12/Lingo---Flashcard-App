import db from "../../lib/db";
import axios from "axios";
import capitalizeFirstLetter from "../../utils/capitaliseFirstLetter";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { formData, id } = req.body;
    const capitalized = capitalizeFirstLetter(formData);
    const native = await axios.post("http://localhost:8080", {
      capitalized,
    });
    db.query(
      `INSERT INTO decks VALUES('${capitalized}', '${id}', 0, '${native.data}')`,
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
