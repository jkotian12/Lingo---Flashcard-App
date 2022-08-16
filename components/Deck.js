import React from "react";
import { useRouter } from "next/router";

export default function Deck(props) {
  const router = useRouter();

  return (
    <>
      <p>{props.name}</p>
      <button
        onClick={() => {
          router.push(`/${router.query.userID}/${props.name}`);
        }}
      >
        All Cards
      </button>
      <button
        onClick={() => {
          router.push(`/${router.query.userID}/review/${props.name}`);
        }}
      >
        Review
      </button>
      <button
        onClick={() => {
          router.push(`/${router.query.userID}/${props.name}/new-card`);
        }}
      >
        Add Cards
      </button>
    </>
  );
}
