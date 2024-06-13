import React from "react";
import Board from "./BoardLogic.js";

export default function Game() {
  const [history, setHistory] = React.useState([Array(9).fill(null)]);
  const [numbClicks, setNumbClicks] = React.useState(0);
  const currentSquares = history[numbClicks];

  const arrayChecks = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

  function onPlay(newSquares) {
    setNumbClicks(numbClicks + 1);
    const nextHistory = [...history.slice(0, numbClicks + 1), newSquares];
    setHistory(nextHistory);
    // setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setNumbClicks(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else if (move === 0) {
      description = "Restart the game";
    }
    return (
      move !== 0 && (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      )
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          numbClicks={numbClicks}
          squares={currentSquares}
          arrayChecks={arrayChecks}
          onPlay={onPlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
