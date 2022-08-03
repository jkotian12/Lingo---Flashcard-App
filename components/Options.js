import { React, useContext, useState } from "react";
import cardContext from "../store/cardContext";

export default function Options(props) {
  const ctx = useContext(cardContext);
  const [display, setDisplay] = useState(true);

  return (
    <>
      <div className={display ? "" : "inactive"}>
        <button
          onClick={() => {
            setDisplay(false);
            props.reverse();
            ctx.setDifficulty("easy", props.id);
          }}
        >
          Easy
        </button>
        <button
          onClick={() => {
            setDisplay(false);
            props.reverse();
            ctx.setDifficulty("medium", props.id);
          }}
        >
          Medium
        </button>
        <button
          onClick={() => {
            setDisplay(false);
            props.reverse();
            ctx.setDifficulty("hard", props.id);
          }}
        >
          Hard
        </button>
      </div>
    </>
  );
}
