import { useState } from "react";
import './App.css';
import { tileType, maxTotalCards, placeholderDeck, roadCards, roadsideCards, landscapeCards, specialCards, goldCards, classChoice } from './constants/constants';
//import DeckSleeve from './Components/DeckSleeve/DeckSleeve';

// randomize the deck
const randomizeCards = (e) => {
  //e.preventDefault();

  // loop to ensure max total card limit of 15 isn't breached
  var roadTotal, roadsideTotal, landscapeTotal, specialTotal, goldTotal, classTotal;
  var cardTotalSum;
  do {
    // get the amount of cards for each "sleeve"
    // this is per the actual documentation.....
    roadTotal = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(2) + 1) + Math.ceil(2));
    roadsideTotal = Math.floor(Math.random() * (Math.floor(9) - Math.ceil(2) + 1) + Math.ceil(2));
    landscapeTotal = Math.floor(Math.random() * (Math.floor(5) - Math.ceil(2) + 1) + Math.ceil(2));
    specialTotal = Math.floor(Math.random() * (Math.floor(4) - Math.ceil(1) + 1) + Math.ceil(1));
    goldTotal = 1;
    classTotal = 1;
    cardTotalSum = roadTotal + roadsideTotal + landscapeTotal + specialTotal;
    console.log(cardTotalSum);
  } while (cardTotalSum > maxTotalCards)

  // temp arrays to restore values after generating deck
  const roadCardsTemp = roadCards;
  const roadsideCardsTemp = roadsideCards;
  const landscapeCardsTemp = landscapeCards;
  const specialCardsTemp = specialCards;
  const goldCardsTemp = goldCards;
  const classChoiceTemp = classChoice;

  // set up array of arrays containing generated totals and all card values
  const allCards = [roadCardsTemp, roadsideCardsTemp, landscapeCardsTemp, specialCardsTemp, goldCardsTemp, classChoiceTemp];
  const allCardTotals = [roadTotal, roadsideTotal, landscapeTotal, specialTotal, goldTotal, classTotal];

  // prepare array of arrays to populate and return
  const roadResults = [];
  const roadsideResults = [];
  const landscapeResults = [];
  const specialResults = [];
  const goldResults = [];
  const classResults = [];
  const resultingCards = [roadResults, roadsideResults, landscapeResults, specialResults, goldResults, classResults];

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
  return resultingCards;
  //console.log(resultingCards);
}

{/* 
  Main Component
*/}
const App = () => {

  const [randomizedDeck, setRandomizedDeck] = useState(placeholderDeck);

  return (
    <div className="App">
      <h1 className="title">Loop Hero Randomizer</h1>
      <button onClick={() => setRandomizedDeck(randomizeCards)}>Randomize</button>
      {console.log(randomizedDeck)}
      <h2>Road</h2>
      {randomizedDeck[0].join(' | ')}
      <h2>Roadside</h2>
      {randomizedDeck[1].join(' | ')}
      <h2>Landscape</h2>
      {randomizedDeck[2].join(' | ')}
      <h2>Special</h2>
      {randomizedDeck[3].join(' | ')}
      <h2>Gold</h2>
      {randomizedDeck[4].join(' | ')}
      <h2>Class</h2>
      {randomizedDeck[5].join(' | ')}




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
