/* eslint-disable no-lone-blocks */
import { useState } from "react";
import './App.css';
import { tileType, minTotalCards, maxTotalCards, placeholderDeck, roadCards, roadsideCards, landscapeCards, specialCards, goldCards, classChoice } from './constants/constants';
//import DeckSleeve from './Components/DeckSleeve/DeckSleeve';

// randomize the deck
const randomizeCards = () => {
  //e.preventDefault();

  // loop to ensure constraints of 15 max and 7 min cards are met
  let roadTotal, roadsideTotal, landscapeTotal, specialTotal, goldTotal, classTotal, cardTotalSum;
  do {
    // get the amount of cards for each "sleeve"
    // this is per the actual documentation.....
    roadTotal = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(2) + 1) + Math.ceil(2));
    roadsideTotal = Math.floor(Math.random() * (Math.floor(9) - Math.ceil(2) + 1) + Math.ceil(2));
    landscapeTotal = Math.floor(Math.random() * (Math.floor(5) - Math.ceil(2) + 1) + Math.ceil(2));
    specialTotal = Math.floor(Math.random() * (Math.floor(4) - Math.ceil(1) + 1) + Math.ceil(1));

    cardTotalSum = roadTotal + roadsideTotal + landscapeTotal + specialTotal;
  } while (cardTotalSum > maxTotalCards || cardTotalSum < minTotalCards)

  goldTotal = 1;
  classTotal = 1;

  // temp arrays to restore values after generating deck
  let roadCardsTemp = roadCards.slice();
  let roadsideCardsTemp = roadsideCards.slice();
  let landscapeCardsTemp = landscapeCards.slice();
  let specialCardsTemp = specialCards.slice();
  let goldCardsTemp = goldCards.slice();
  let classChoiceTemp = classChoice.slice();

  // set up array of arrays containing generated totals and all card values
  let allCards = [roadCardsTemp, roadsideCardsTemp, landscapeCardsTemp, specialCardsTemp, goldCardsTemp, classChoiceTemp];
  let allCardTotals = [roadTotal, roadsideTotal, landscapeTotal, specialTotal, goldTotal, classTotal];

  // prepare array of arrays to populate and return
  let roadResults = [];
  let roadsideResults = [];
  let landscapeResults = [];
  let specialResults = [];
  let goldResults = [];
  let classResults = [];

  // empty 2d array to return for state change
  let resultingCards = [roadResults, roadsideResults, landscapeResults, specialResults, goldResults, classResults,
    cardTotalSum, roadTotal, roadsideTotal, landscapeTotal, specialTotal];

  // populate randomized deck given generated data
  var i;
  for (i = 0; i < allCards.length; i++) {
    var j;
    var randomCard;
    //console.log(allCards[i].name + ' total = ' + allCardTotals[i]);
    for (j = 0; j < allCardTotals[i]; j++) {
      // generate random number from 0 to size of array
      randomCard = Math.floor(Math.random() * (Math.floor(allCards[i].length) - Math.ceil(0)) + Math.ceil(0));

      // check if wheat field was selected and then add village if it hasn't been added yet
      if (i === 0 && allCards[0][randomCard] === "Wheat Fields") {
        if (allCards[0].indexOf("Village") > -1 && cardTotalSum < 14) {
          resultingCards[0].push("Village");
          resultingCards[0].push(allCards[i][randomCard]);
          allCards[0].splice(randomCard, 1);
          allCards[0].splice(allCards[i].indexOf("Village"), 1);
          resultingCards[6]++;      // card sum totals
          resultingCards[7]++;      // road totals
        }
        else if (cardTotalSum > 13) {
          // skip wheat field
          resultingCards[6]--;      // card sum totals
          resultingCards[7]--;      // roadside totals
          j++;
        }
        else {
          resultingCards[0].push(allCards[i][randomCard]);
          allCards[0].splice(randomCard, 1);
        }
      }
      // check if blood grove was selected and if conditions to select it are met
      else if (i === 1 && allCards[1][randomCard] === "Blood Grove") {
        // check if blood grove will be paired with grove
        if (resultingCards[0].indexOf("Grove") > -1) {
          resultingCards[1].push(allCards[1][randomCard]);
          allCards[1].splice(randomCard, 1);
        }
        else {
          // skip blood grove
          resultingCards[6]--;      // card sum totals
          resultingCards[8]--;      // roadside totals
          j++;
        }
      }
      else {
        // add randomly selected card to array of arrays containing all selected cards
        resultingCards[i].push(allCards[i][randomCard]);

        // remove randomly selected card(s) to avoid duplicates
        allCards[i].splice(randomCard, 1);
      }

    }

  }

  // set the randomized deck as state
  //console.log(resultingCards);
  return resultingCards;
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
      <h2>Total Cards: {randomizedDeck[6]}</h2>

      <h2>{tileType[0]} [{randomizedDeck[7]}]</h2>
      {randomizedDeck[0].join(' | ')}

      <h2>{tileType[1]} [{randomizedDeck[8]}]</h2>
      {randomizedDeck[1].join(' | ')}

      <h2>{tileType[2]} [{randomizedDeck[9]}]</h2>
      {randomizedDeck[2].join(' | ')}

      <h2>{tileType[3]} [{randomizedDeck[10]}]</h2>
      {randomizedDeck[3].join(' | ')}

      <h2>{tileType[4]}</h2>
      {randomizedDeck[4].join(' | ')}

      <h2>{tileType[5]}</h2>
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
