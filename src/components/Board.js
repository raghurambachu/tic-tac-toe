import React from "react";
import Square from "./Square";

class Board extends React.Component {
  isWinningSquare(sq) {
    const winningSquares = this.props.winningSquares;
    if (!winningSquares) return false;
    return winningSquares.some((squareCoord) => squareCoord === sq);
  }

  renderSquare(row, col) {
    return (
      <Square
        key={`${row}${col}`}
        row={row}
        col={col}
        squares={this.props.squares}
        onClick={this.props.onClick}
        winningSquare={this.isWinningSquare(`${row}${col}`)}
      />
    );
  }

  render() {
    const squares = this.props.squares;

    const draw = squares.map((rowArr, row) => {
      return (
        <div key={row} className="board-row flex">
          {squares[row].map((square, col) => {
            return this.renderSquare(row, col);
          })}
        </div>
      );
    });

    return <div className="board">{draw}</div>;
  }
}

export default Board;
