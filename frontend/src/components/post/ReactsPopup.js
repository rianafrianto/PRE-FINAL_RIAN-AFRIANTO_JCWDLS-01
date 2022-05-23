import { useState } from "react";
import { reactPost } from "../../functions/post";
import { useSelector } from "react-redux";
const reactsArray = [
  {
    name: "like",
    image: "../../../reacts/like.gif",
  },
];

export default function ReactsPopup({ visible, setVisible, reactHandler }) {
  return (
    <>
      {visible && (
        <div
          className="reacts_popup"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          {reactsArray.map((react, i) => (
            <div
              className="react"
              key={i}
              onClick={() => reactHandler(react.name)}
            >
              <img src={react.image} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
