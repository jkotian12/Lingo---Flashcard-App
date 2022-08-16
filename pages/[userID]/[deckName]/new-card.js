import { useRouter } from "next/router";
import { useState, React, useEffect } from "react";
const axios = require("axios");

export default function NewCard() {
  const router = useRouter();
  const [postStatus, setPostStatus] = useState("");
  const [data, setData] = useState({
    front: "",
    back: "",
    type: "new",
    userID: router.query.userID,
    deck_set: router.query.deckName,
  });
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    setData({
      front: "",
      back: "",
      type: "new",
      userID: router.query.userID,
      deck_set: router.query.deckName,
    });
  }, [router.isReady]);

  const sendData = () => {
    axios
      .post("/api/cards", {
        data,
      })
      .then((res) => {
        if (res.data == "ok") {
          setPostStatus("ok");
          setData({
            front: "",
            back: "",
            type: "new",
            userID: router.query.userID,
            deck_set: router.query.deckName,
          });
        } else if (res.data == "err") {
          setPostStatus("err");
          setData({
            front: "",
            back: "",
            type: "new",
            userID: router.query.userID,
            deck_set: router.query.deckName,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {postStatus == "ok" && <p>Word added to Deck</p>}
      {postStatus == "err" && <p>Something went wrong</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendData();
        }}
      >
        <label htmlFor="front">Front</label>
        <input
          id="front"
          onChange={(e) => setData({ ...data, front: e.target.value })}
        ></input>
        <label htmlFor="back">Back</label>
        <input
          id="back"
          onChange={(e) => setData({ ...data, back: e.target.value })}
        ></input>
        <button type="submit">Add Word</button>
      </form>
    </>
  );
}
