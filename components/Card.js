import { React, useState, useEffect } from "react";
import Options from "./Options";

export default function Card(props) {
  const [reverse, setReverse] = useState(false);
  const [display, setDisplay] = useState(true);

  const reversalHandler = () => {
    setReverse(true);
  };

  return (
    <div className={props.position === props.dataIndex ? "" : " inactive"}>
      {reverse ? (
        <div className="card">
          {props.front} {props.back}
          <button
            onClick={() => {
              props.visible();
            }}
          >
            Next Card
          </button>
        </div>
      ) : (
        <div className="card">{props.front}</div>
      )}
      <Options
        visible={props.visible}
        reverse={reversalHandler}
        id={props.id}
      />
    </div>
  );
}
