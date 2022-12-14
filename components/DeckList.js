import { React, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Card from "../components";
import cardContext from "../store/cardContext";
const axios = require("axios");

export default function Decklist() {
  //State for data fetched from db
  //This state is also changed to send to db after review
  const [data, setData] = useState([]);

  //State to check if initial render
  const [isInitial, setIsInitial] = useState(true);

  //State for array element to be displayed from the "data" state
  const [position, setPosition] = useState(data.length);

  //Variables to check if review is done
  let isDeckDone = position < data.length;

  //function to change the array element to be displayed after user reads card
  const setVisibility = () => {
    setPosition((prevState) => {
      return prevState + 1;
    });
  };

  //function to change the difficulty of a card
  const difficultyHandler = (difficulty, id) => {
    setData(
      data.map((ele) => {
        if (ele.ID === id) {
          return { ...ele, type: difficulty };
        }
        return ele;
      })
    );
  };

  //useEffect that runs once review is done and send data to db
  useEffect(() => {
    if (isInitial) {
      setIsInitial((prev) => !prev);
      return;
    }
    const postData = async () => {
      axios
        .put("/api/cards", data)
        .then((res) => {
          if (res.data) {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    postData();
  }, [isDeckDone]);

  //useEffect for fetching data from db
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/api/cards")
        .then((res) => {
          if (res.data) {
            setData(res.data.sort(() => (Math.random() > 0.5 ? 1 : -1)));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return (
    <cardContext.Provider
      value={{ cardData: data, setDifficulty: difficultyHandler }}
    >
      {data.length ? (
        isDeckDone && isReviewDone ? (
          <>
            <Card
              index={position}
              visible={setVisibility}
              info={data[position]}
            />
          </>
        ) : (
          <p>You have finished your review for today</p>
        )
      ) : (
        <p>This deck has no cards</p>
      )}
    </cardContext.Provider>
  );
}
