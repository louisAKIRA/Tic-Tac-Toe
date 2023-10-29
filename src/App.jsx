/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import { useState } from "react";
import "./App.scss";

const winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const calWinner = (gameState) => {
  let winner;
  for (let i = 0; i < winStates.length; i++) {
    const winState = winStates[i];
    if (
      gameState[winState[0]] === gameState[winState[1]] &&
      gameState[winState[1]] === gameState[winState[2]] &&
      Boolean(gameState[winState[0]])
    ) {
      winner = gameState[winState[0]];
    }
  }
  return winner;
};

function App() {
  const [gameState, setGameState] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [player, setPlayer] = useState("X");

  const winner = calWinner(gameState);

  const isTie = !winner && gameState.filter((state) => state).length === 9;

  const onCellClick = (index) => {
    if (gameState[index] !== "" || Boolean(winner) || isTie) {
      return;
    }
    const newGameState = [...gameState];
    newGameState[index] = player;
    setGameState(newGameState);
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  };

  const restartGame = () => {
    setGameState(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
  };

  return (
    <>
      <section>
        <div className="container">
          <h1>Tic Tac Toe</h1>
          <br />
          {winner ? (
            <h2>Congrat {winner} is win</h2>
          ) : isTie ? (
            <h2>Game is Tie</h2>
          ) : (
            <h2>Player {player} , It's your turn</h2>
          )}
          <div className="tableGame">
            {gameState.map((cellNumber, index) => {
              return (
                <div onClick={() => onCellClick(index)} className="item">
                  {cellNumber}
                </div>
              );
            })}
          </div>
          <div className="buttomRestart">
            <button onClick={restartGame}>Restart</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
