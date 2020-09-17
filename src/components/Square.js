import React from "react";
import O from "../o.svg";
// import X from "../x.svg";

class Square extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.winningSquare
            ? "square w-16 h-16 flex justify-center items-center bg-green-500 text-white border-2 border-gray-700 font-bold text-2xl"
            : "square w-16 h-16 flex justify-center items-center border-2 border-gray-700 font-bold text-2xl"
        }
        onClick={() => this.props.onClick(this.props.row, this.props.col)}
      >
        {this.props.squares[this.props.row][this.props.col] === "X" ? (
          <span>X</span>
        ) : this.props.squares[this.props.row][this.props.col] === "O" ? (
          <img src={O} alt="O" />
        ) : null}
      </div>
    );
  }
}

export default Square;
