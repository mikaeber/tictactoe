import React from "react";

import confetti from "canvas-confetti";

export default function Board({ numbClicks, squares, arrayChecks, onPlay }) {
  const result = calculateWinner(squares);
  const winner = result.winner;
  const line = result.line;

  function handleClick(index) {
    if (squares[index] || numbClicks >= arrayChecks.length) return;
    const newSquares = squares.slice();
    newSquares[index] = arrayChecks[numbClicks];
    onPlay(newSquares);
  }

  function triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  React.useEffect(() => {
    if (winner) {
      triggerConfetti();
    }
  }, [winner]);

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
      <div className="text">
        {numbClicks === arrayChecks.length || winner
          ? `Game finished! ${winner ? `${winner} won!` : "No winner!"}`
          : `Next up: ${arrayChecks[numbClicks]}`}
      </div>
    </>
  );
}

function Square({ value, onClick }) {
  return (
    <button onClick={onClick} className={value ? "square-clicked" : "square"}>
      {value}
    </button>
  );
}

<script>alert('hello')</script>;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}
