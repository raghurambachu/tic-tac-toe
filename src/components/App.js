import React from "react";
import Board from "./Board";
import MoveTo from "./MoveTo";

// App denotes the Game
class App extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleMoveTo = this.handleMoveTo.bind(this);
    this.state = {
      history: [
        {
          squares: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
          ],
        },
      ],
      step: 0,
      locations: [],
    };
  }

  calculateIfWinner(squares) {
    const winPossibilities = [
      ["00", "01", "02"],
      ["10", "11", "12"],
      ["20", "21", "22"],
      ["00", "10", "20"],
      ["01", "11", "21"],
      ["02", "12", "22"],
      ["00", "11", "22"],
      ["20", "11", "02"],
    ];
    for (let i = 0; i < winPossibilities.length; i++) {
      let [a, b, c] = winPossibilities[i];
      a = a.split("");
      b = b.split("");
      c = c.split("");
      if (
        squares[a[0]][a[1]] &&
        squares[a[0]][a[1]] === squares[b[0]][b[1]] &&
        squares[a[0]][a[1]] === squares[c[0]][c[1]]
      ) {
        return {
          winner: squares[a[0]][a[1]],
          winningSquares: winPossibilities[i],
        };
      }
    }
    return { winner: null, winningSquares: null };
  }

  handleClick(row, col) {
    const history = this.state.history;
    const coord = `${row},${col}`;
    const locations = [...this.state.locations, coord];

    const updateSquare = [...history[history.length - 1].squares].map((row) => [
      ...row,
    ]);
    if (this.calculateIfWinner(updateSquare).winner || updateSquare[row][col])
      return null;
    updateSquare[row][col] = this.state.step % 2 === 0 ? "X" : "O";

    this.setState(function (prevState) {
      return {
        history: [...prevState.history, { squares: updateSquare }],
        step: prevState.step + 1,
        locations,
      };
    });
  }

  handleMoveTo(step) {
    let history = this.state.history;
    let locations = this.state.locations;
    // There is no initial item in locations so slice is till step whereas in history, there is initialisation to null
    locations = locations.slice(0, step);
    history = history
      .slice(0, step + 1)
      .map((sqObj) => ({ squares: [...sqObj.squares.map((row) => [...row])] }));
    this.setState(function (prevState) {
      return {
        history: [...history],
        step: step,
        locations: [...locations],
      };
    });
  }

  render() {
    const history = this.state.history;
    const locations = this.state.locations;
    const current = history[history.length - 1].squares;
    let winnerObj = this.calculateIfWinner(current);
    let winner = winnerObj.winner;
    const isDrawn =
      this.state.history.length === 10 &&
      !this.calculateIfWinner(
        this.state.history[this.state.history.length - 1].squares
      ).winner &&
      "Match has been drawn";
    let status = winner
      ? `Won by ${winner}`
      : this.state.step === 9 && !winner
      ? "Game Over"
      : `Next turn : ${this.state.step % 2 === 0 ? "X" : "O"}`;
    return (
      <div className="min-h-screen bg-yellow-100 text-center ">
        <h2 className="text-5xl text-center font-bold tracking-tighter text-red-400 pt-4">
          Tic Tac Toe
        </h2>
        <div className="game flex flex-col items-center md:flex md:flex-row md:justify-center md:items-start pt-6">
          <Board
            squares={current}
            onClick={this.handleClick}
            winningSquares={winnerObj.winningSquares}
          />
          <div className="step md:ml-16">
            <span
              className={
                winner
                  ? "bg-green-400 inline-block  font-bold uppercase my-4  text-md p-2"
                  : " mt-8 mb-4 md:mt-0 md:mb-2 inline-block"
              }
            >
              {status}
            </span>
            <ul className="flex flex-col">
              {this.state.history.map((stateOfSquare, step) => {
                return (
                  <MoveTo
                    onClick={this.handleMoveTo}
                    key={step}
                    step={step}
                    length={this.state.history.length}
                    locations={locations}
                  />
                );
              })}
            </ul>
            <p>{isDrawn}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
