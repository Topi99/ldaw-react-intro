import React, { useState } from "react";
import Square from "../Square";
import "./board.scss";

const Board = () => {
  const turns = {
    X: "X",
    O: "O",
  };

  const [ squares, setSquares ] = useState(Array(9).fill(null));
  const [ turn, setTurn ] = useState(turns.X);

  const handleSquareClick = (value) => {
    const squaresCpy = [...squares];
    squaresCpy[value] = squaresCpy[value] ? squaresCpy[value] : turn;
    const winner = getWinner();
    setTurn(turn === turns.X ? turns.O : turns.X);
    setSquares(squaresCpy);
    if (winner) {
      alert(winner);
    }
  };

  const getWinner = () => {
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

    lines.forEach((line) => {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    });

    return null;
  };
  
  return (
    <div className="board">
      {
        squares.map((squareValue, index) => 
          <Square
            value={squareValue}
            onClick={() => handleSquareClick(index)}
          />
        )
      }
    </div>
  );
};

export default Board;
