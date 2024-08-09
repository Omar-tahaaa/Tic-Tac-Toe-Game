export default function GameOver({ winner, restart, nameOfWonPlayer }) {
    return (
      <div id="game-over">
        <h2>Game Over</h2>
        {winner && <p>{nameOfWonPlayer} is winner</p>}
        {!winner && <p>it's a draw</p>}
        <p>
          <button onClick={restart}>Reamtch</button>
        </p>
      </div>
    );
  }
  