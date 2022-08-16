import { React } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Index(props) {
  const router = useRouter();

  return (
    <>
      {!props.cards.length && (
        <>
          <p>This deck is empty</p>
        </>
      )}
      {props.cards.length &&
        props.cards.map((card, index) => {
          return (
            <div key={index}>
              <div>{card.Front}</div>
              <button
                onClick={() => {
                  router.push(
                    `/${router.query.userID}/${router.query.deckName}/edit-card/${card.ID}`
                  );
                }}
              >
                Edit Card
              </button>
            </div>
          );
        })}
      <button
        onClick={() => {
          router.push(
            `/${router.query.userID}/${router.query.deckName}/new-card`
          );
        }}
      >
        Add Words
      </button>
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
