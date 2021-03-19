//import { useState } from "react";
import './App.css';
import DeckSleeve from './Components/DeckSleeve/DeckSleeve';

const App = () => {
  const tileType = ["Road", "Roadside", "Landscape", "Special", "Golden"]
  return (
    <div className="App">
      <h1>Loop Hero Randomizer</h1>
      <ul>
        {tileType.map((item, index) => 
          <li>
            <DeckSleeve key={index} 
              tileType={item}
            />
          </li>
          )
        }
      </ul>
    </div>
  );
}

export default App;
