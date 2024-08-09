import { useState } from "react";

export default function Player({ name, symbol, isActive, changeWonName }) {
  const [inputValue, setInputValue] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleClick() {
    setIsEditing((isEditing) => !isEditing);
    if (isEditing) {
      changeWonName(symbol, inputValue);
    }
  }
  function handleChangeInput(event) {
    setInputValue(event.target.value);
  }

  let playerName = <span className="player-name">{inputValue}</span>;

  if (isEditing) {
    playerName = (
      <input
        type="text"
        required
        value={inputValue}
        onChange={handleChangeInput}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}