import React, { useEffect, useState } from "react";
import divider from "./divider.svg";
import randButton from "./icon-dice.svg";

const initData = {
  id: 5342,
  message:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem fugiat asperiores vero mollitia quisquam incidunt quo iusto rerum? Temporibus, facere!",
  prevId: 0,
};

function Advice() {
  const [advice, setAdvice] = useState(initData);
  const [id, setId] = useState(1);

  function get_rand(max_num) {
    const randNum = Math.floor(Math.random() * max_num) + 1;
    return randNum;
  }

  localStorage.clear();

  useEffect(
    function () {
      fetch(`https://api.adviceslip.com/advice`)
        .then((resp) => {
          if (resp.ok) return resp.json();
          throw new Error("Oops!, Something went wrong");
        })
        .then((data) => {
          if (advice.prevId === data.slip.id) {
            alert("Please wait, we are preparing new advice for you!");
          } else {
            setAdvice({
              ...advice,
              id: data.slip.id,
              message: data.slip.advice,
              prevId: data.slip.id,
            });
          }
        })
        .catch((e) => {
          alert(e.message);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  return (
    <div className="container">
      <div className="advice-info">
        <small>
          ADVICE <span className="advice-num">#{advice.id}</span>
        </small>
      </div>
      <p className="quote-text"> {advice.message}</p>
      <div className="divider">
        <img src={divider} alt="divider" />
      </div>
      <div className="btn-wrapper" onClick={() => setId(() => get_rand(200))}>
        <img
          src={randButton}
          alt="generate new quote"
          className="rand-button"
        />
      </div>
    </div>
  );
}

export default Advice;