import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import { Log } from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combination";
import GameOver from "./components/Gameover";

const gameBoardStyle = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function updatesymbol(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player1",
    Y: "Player2",
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = updatesymbol(gameTurns);

  let gameBoard = [...gameBoardStyle.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;
  let nameWonPlayer;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
      nameWonPlayer = players[firstSquareSymbol];
    }
  }

  let hasDraw;
  if (gameTurns.length === 9 && !winner) {
    hasDraw = true;
  } else {
    hasDraw = false;
  }

  function handleReamtch() {
    setGameTurns([]);
  }

  function handleWonNamePlayer(symbol, playerName) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: playerName,
      };
    });
  }
  function handleActivePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = updatesymbol(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="player1"
            symbol="X"
            isActive={activePlayer === "X"}
            changeWonName={handleWonNamePlayer}
          />
          <Player
            name="player2"
            symbol="O"
            isActive={activePlayer === "O"}
            changeWonName={handleWonNamePlayer}
          />
        </ol>
        <Gameboard onSelect={handleActivePlayer} board={gameBoard} />
      </div>
      {(winner || hasDraw) && (
        <GameOver
          winner={winner}
          restart={handleReamtch}
          nameOfWonPlayer={nameWonPlayer}
        />
      )}
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
