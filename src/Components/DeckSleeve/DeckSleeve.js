//import { useState } from "react";
import './DeckSleeve.css';

const DeckSleeve = ( { tileType } ) => {
  return (
    <div className="DeckSleeve">
      <div className="title">{tileType}</div>
    </div>
  );
}

export default DeckSleeve;