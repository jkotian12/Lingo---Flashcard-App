import { React, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
const axios = require("axios");

export default function Edit(props) {
  const [data, setData] = useState([]);
  const [postStatus, setPostStatus] = useState("");
  const router = useRouter();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.put("/api/edit", { data, ID: router.query.card }).then((res) => {
      if (res.data == "ok") {
        setPostStatus("ok");
      } else if (res.data == "err") {
        setPostStatus("err");
      }
    });
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    props.cards.map((element) => {
      if (element.ID == router.query.card) {
        setData(element);
        return;
      }
      return;
    });
  }, [router.isReady]);
  console.log(props);
  return (
    <>
      {postStatus == "ok" && <p>Edited Succesfully</p>}
      {postStatus == "err" && <p>Something went wrong</p>}
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="front">Front</label>
        <input
          defaultValue={data.Front}
          id="front"
          onChange={(e) => setData({ ...data, Front: e.target.value })}
        ></input>
        <label htmlFor="back">Back</label>
        <input
          defaultValue={data.Back}
          id="back"
          onChange={(e) => setData({ ...data, Back: e.target.value })}
        ></input>
        <button type="submit">Submit changes</button>
      </form>
    </>
  );
}

export async function getServerSideProps(context) {
  const data = await axios.post(`http://localhost:3000/api/cards`, {
    type: "fetch",
    deck_set: context.params.deckName,
  });
  return { props: { cards: data.data } };
}
