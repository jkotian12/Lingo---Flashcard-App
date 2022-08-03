import { React, useEffect, useState, useContext } from "react";
import Card from "./Card";
import cardContext from "../store/cardContext";
const axios = require("axios");

export default function Decklist() {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState(0);

  const setVisibility = () => {
    setPosition(position++);
  };

  const difficultyHandler = (difficulty, id) => {
    console.log(difficulty);
    setData(
      data.map((ele) => {
        if (ele.ID === id) {
          return { ...ele, type: difficulty };
        }
        return ele;
      })
    );
  };

  useEffect(() => {
    axios
      .get("/api/cards")
      .then((res) => {
        if (res.data) {
          setData(res.data.sort(() => (Math.random() > 0.5 ? 1 : -1)));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <cardContext.Provider
      value={{ cardData: data, setDifficulty: difficultyHandler }}
    >
      {data.map((ele, index) => {
        return (
          <div key={index}>
            <Card
              position={position}
              dataIndex={index}
              visible={setVisibility}
              id={ele.ID}
              front={ele.Front}
              back={ele.Back}
            />
          </div>
        );
      })}
    </cardContext.Provider>
  );
}
