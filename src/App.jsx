import { useState } from "react";
import "./App.css";

function App() {
  const [choice, setChoice] = useState("");
  const [result, setResult] = useState("");
  const [flipping, setFlipping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const flipCoin = () => {
    if (!choice) {
      alert("Please choose Heads or Tails before flipping!");
      return;
    }

    setFlipping(true);
    setResult("");
    setGameOver(false);

    setTimeout(() => {
      const flipResult = Math.random() < 0.5 ? "Heads" : "Tails";
      setResult(flipResult);
      setFlipping(false);
      setGameOver(true);

      if (choice === flipResult) {
        setWins((prev) => prev + 1);
      } else {
        setLosses((prev) => prev + 1);
      }

      // ✅ Auto reset after 2 seconds to ask again
      setTimeout(() => {
        setChoice("");
        setResult("");
        setGameOver(false);
      }, 500);
    }, 1500);
  };

  return (
    <div className="container">
      <h1>🪙 Coin Flip Challenge</h1>

      <div className="screen">
        <h2 className={flipping ? "spin" : ""}>
          {flipping ? "..." : result || "?"}
        </h2>
      </div>

      <div>
        <button
          onClick={() => !flipping && !gameOver && setChoice("Heads")}
          disabled={flipping || gameOver}
          style={{
            background:
              choice === "Heads"
                ? "linear-gradient(45deg, #00d4ff, #007bff)"
                : "linear-gradient(45deg, #007bff, #00d4ff)",
          }}
        >
          Heads
        </button>
        <button
          onClick={() => !flipping && !gameOver && setChoice("Tails")}
          disabled={flipping || gameOver}
          style={{
            background:
              choice === "Tails"
                ? "linear-gradient(45deg, #00d4ff, #007bff)"
                : "linear-gradient(45deg, #007bff, #00d4ff)",
          }}
        >
          Tails
        </button>
      </div>

      <button onClick={flipCoin} disabled={flipping}>
        {flipping ? "Flipping..." : "Flip Coin 🪙"}
      </button>

      <div className="scoreboard">
        <h3>🏆 Wins: {wins}</h3>
        <h3>💀 Losses: {losses}</h3>
        {result && (
          <h3
            style={{
              color: choice === result ? "#00ff88" : "#ff4c4c",
            }}
          >
            {choice === result ? "✅ You Win!" : "❌ You Lose!"}
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
