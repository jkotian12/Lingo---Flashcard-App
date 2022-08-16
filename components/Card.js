import { React, useState, useEffect } from "react";
import Options from "./Options";

export default function Card(props) {
  //State for showing or hiding the answer
  const [reverse, setReverse] = useState(false);

  //function for showing the answer
  const reversalHandler = () => {
    setReverse(true);
  };

  return (
    <div>
      {reverse ? (
        <div className={`card ${props.info.type}`}>
          {props.info.Front} {props.info.Back}
          <button
            onClick={() => {
              props.visible();
              setReverse(false);
            }}
          >
            Next Card
          </button>
        </div>
      ) : (
        <>
          <div className={`card ${props.info.type}`}>{props.info.Front}</div>
          <Options
            visible={props.visible}
            reverse={reversalHandler}
            id={props.info.ID}
          />
        </>
      )}
    </div>
  );
}
