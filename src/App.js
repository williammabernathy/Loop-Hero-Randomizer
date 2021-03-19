import { useState } from "react";
import './App.css';
import { tileType, placeholderDeck, roadCards, roadsideCards, landscapeCards, specialCards, goldCards } from './constants/constants';
//import DeckSleeve from './Components/DeckSleeve/DeckSleeve';

const App = () => {

  const [randomizedDeck, setRandomizedDeck] = useState(placeholderDeck);

  // randomize the deck
  const randomizeCards = (e) => {
    e.preventDefault();

    // get the amount of cards for each "sleeve"
    // this is per the actual documentation.....
    const roadTotal = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(2) + 1) + Math.ceil(2));
    const roadsideTotal = Math.floor(Math.random() * (Math.floor(9) - Math.ceil(2) + 1) + Math.ceil(2));
    const landscapeTotal = Math.floor(Math.random() * (Math.floor(5) - Math.ceil(2) + 1) + Math.ceil(2));
    const specialTotal = Math.floor(Math.random() * (Math.floor(4) - Math.ceil(1) + 1) + Math.ceil(1));
    const goldTotal = 1;

    // temp arrays to restore values after generating deck
    const roadCardsTemp = roadCards;
    const roadsideCardsTemp = roadsideCards;
    const landscapeCardsTemp = landscapeCards;
    const specialCardsTemp = specialCards;
    const goldCardsTemp = goldCards;

    // set up array of arrays containing generated totals and all card values
    var allCards = [roadCardsTemp, roadsideCardsTemp, landscapeCardsTemp, specialCardsTemp, goldCardsTemp];
    const allCardTotals = [roadTotal, roadsideTotal, landscapeTotal, specialTotal, goldTotal];

    // prepare array of arrays to populate and return
    const roadResults = [];
    const roadsideResults = [];
    const landscapeResults = [];
    const specialResults = [];
    const goldResults = [];
    var resultingCards = [roadResults, roadsideResults, landscapeResults, specialResults, goldResults];

    // populate randomized deck given generated data
    var i;
    for (i = 0; i < allCards.length; i++) {
      var j;
      var randomCard;
      //console.log(allCards[i].name + ' total = ' + allCardTotals[i]);
      for (j = 0; j < allCardTotals[i]; j++) {
        // generate random number from 0 to size of array
        randomCard = Math.floor(Math.random() * (Math.floor(allCards[i].length) - Math.ceil(0)) + Math.ceil(0));

        // add randomly selected card to array of arrays containing all selected cards
        resultingCards[i].push(allCards[i][randomCard]);

        // remove randomly selected card to avoid duplicates
        allCards[i].splice(randomCard, 1);
        
      }

    }

    // set the randomized deck as state
    setRandomizedDeck(resultingCards);
    //console.log(resultingCards);
  }

  return (
    <div className="App">
      <h1 className="title">Loop Hero Randomizer</h1>
      <button onClick={randomizeCards}>Randomize</button>
      <h2>Road</h2>
      {randomizedDeck[0]}
      <h2>Roadside</h2>
      <h2>Landscape</h2>
      <h2>Special</h2>
      <h2>Gold</h2>




      {/*
      The start of making it "pretty"
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
      */}
    
    </div>
  );
}

export default App;
