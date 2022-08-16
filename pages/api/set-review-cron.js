const schedule = require("node-schedule");
import db from "../../lib/db";

export default async function handler(req, res) {
  db.query("UPDATE decks SET isReviewDone=true ");
}
