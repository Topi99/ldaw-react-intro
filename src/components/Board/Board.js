import React, { useState, useEffect } from "react";
import Square from "../Square";
import "./board.scss";

const Board = () => {
  const turns = {
    X: "X",
    O: "O",
  };

  const [ squares, setSquares ] = useState(Array(9).fill(null));
  const [ turn, setTurn ] = useState(turns.X);
  const [ lineN, setLineN ] = useState(0);
  const [ winner, setWinner ] = useState(null);
  const [ history, setHistory ] = useState([{squares, turn}]);

  useEffect(() => {
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

      let winner = null;

      lines.forEach((line, i) => {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          winner = squares[a];
          setLineN(i);
        }
      });

      return winner;
    };

    const winner = getWinner();
    if (winner) {
      setWinner(winner);
    }
  }, [squares]);

  const handleSquareClick = (value) => {
    const squaresCpy = [...squares];
    squaresCpy[value] = squaresCpy[value] ? squaresCpy[value] : turn;
    if (!winner) {
      setTurn(turn === turns.X ? turns.O : turns.X);
      setSquares(squaresCpy);
      const newHistory = history.concat({
        squares: squaresCpy,
        turn: turn === turns.X ? turns.O : turns.X
      });
      setHistory(newHistory);
    }
  };

  const travelTo = (i) => {
    const newSquares = history[i].squares;
    const newTurn = history[i].turn;
    setSquares(newSquares);
    setTurn(newTurn);
  }
  
  return (
    <div className="grid">
      <div className="board">
        {
          squares.map((squareValue, index) => 
            <Square
              value={squareValue}
              onClick={() => handleSquareClick(index)}
            />
          )
        }
        {winner && <div className={`winner line-${lineN}`}></div>}
      </div>
      <div className="timeTravel">
        {history.map((state, i) => (
          <div className='time' onClick={() => travelTo(i)}>
            Return to movement #{i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
