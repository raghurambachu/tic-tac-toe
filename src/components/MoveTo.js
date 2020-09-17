import React from "react";

function MoveTo(props) {
  return (
    <div className="flex items-center">
      <button
        className="bg-orange-500 p-2 my-2"
        onClick={() => {
          props.onClick(props.step);
        }}
      >
        {props.step === 0 && props.length === 1
          ? "Have'nt started the game yet"
          : ` Move to step : ${+props.step}`}
      </button>
      <p
        className={
          props.step === props.length - 1
            ? "text-green-500 ml-4 font-bold text-lg "
            : "text-green-500 ml-4 font-light"
        }
      >
        {!!props.step &&
          ((props.step - 1) % 2 === 0
            ? `X added at ${props.locations[props.step - 1]} `
            : `O added at ${props.locations[props.step - 1]}`)}
      </p>
    </div>
  );
}

export default MoveTo;
