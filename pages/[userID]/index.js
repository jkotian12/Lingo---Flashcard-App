import { React, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Deck from "../../components/Deck";

export default function Index(props) {
  const router = useRouter();
  const id = router.query.userID;

  const [formData, setFormData] = useState("");
  const [decks, setDecks] = useState(props.decks);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/add-deck", { formData, id })
      .then((res) => {
        if (res.data == "ok") {
          axios.post("/api/decks", { id }).then((response) => {
            console.log(response);
            setDecks(response.data);
          });
        } else if (res.data == "err") {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        {decks.map((deck, index) => {
          return <Deck key={index} name={deck.deck_name} />;
        })}
      </div>
      <form onSubmit={submitHandler}>
        <label htmlFor="new-deck">Deck name</label>
        <input
          onChange={(e) => {
            setFormData(e.target.value);
          }}
          id="new-deck"
          type="text"
        />
        <button>Add New Deck</button>
      </form>
    </>
  );
}
export async function getServerSideProps(context) {
  const data = await axios.post(`http://localhost:3000/api/decks`, {
    id: context.params.userID,
  });

  return { props: { decks: data.data } };
}
