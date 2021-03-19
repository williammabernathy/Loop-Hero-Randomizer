/* eslint-disable no-lone-blocks */
import { useState } from "react";
import './App.css';
import { tileType, minTotalCards, maxTotalCards, placeholderDeck, roadCards, roadsideCards, landscapeCards, specialCards, goldCards, classChoice } from './constants/constants';
//import DeckSleeve from './Components/DeckSleeve/DeckSleeve';

// randomize the deck
const randomizeCards = (e) => {
  //e.preventDefault();

  // loop to ensure max total card limit of 15 isn't breached or min total limit of 7 isn't lower
  var roadTotal, roadsideTotal, landscapeTotal, specialTotal, goldTotal, classTotal;
  var cardTotalSum;
  do {
    // get the amount of cards for each "sleeve"
    // this is per the actual documentation.....
    roadTotal = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(2) + 1) + Math.ceil(2));
    roadsideTotal = Math.floor(Math.random() * (Math.floor(9) - Math.ceil(2) + 1) + Math.ceil(2));
    landscapeTotal = Math.floor(Math.random() * (Math.floor(5) - Math.ceil(2) + 1) + Math.ceil(2));
    specialTotal = Math.floor(Math.random() * (Math.floor(4) - Math.ceil(1) + 1) + Math.ceil(1));
    cardTotalSum = roadTotal + roadsideTotal + landscapeTotal + specialTotal;
    console.log(cardTotalSum);
  } while (cardTotalSum > maxTotalCards || cardTotalSum < minTotalCards)

  goldTotal = 1;
  classTotal = 1;

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
  const resultingCards = [roadResults, roadsideResults, landscapeResults, specialResults, goldResults, classResults,
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
      if (allCards[i][randomCard] === "Wheat Fields") {
        if (allCards[i].indexOf("Village") > -1) {
          resultingCards[i].push("Village");
          resultingCards[i].push(allCards[i][randomCard]);
          allCards[i].splice(allCards[i].indexOf("Village"), 1);
          allCards[i].splice(randomCard, 1);
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
  console.log(resultingCards);
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

      <h2>Road [{randomizedDeck[7]}]</h2>
      {randomizedDeck[0].join(' | ')}
      <h2>Roadside [{randomizedDeck[8]}]</h2>
      {randomizedDeck[1].join(' | ')}
      <h2>Landscape [{randomizedDeck[9]}]</h2>
      {randomizedDeck[2].join(' | ')}
      <h2>Special [{randomizedDeck[10]}]</h2>
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
