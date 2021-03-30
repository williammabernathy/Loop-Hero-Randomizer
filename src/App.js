/* eslint-disable no-lone-blocks */
import { useState, useEffect } from "react";
import './App.css';
import { tileType, minTotalCards, maxTotalCards, placeholderDeck, roadCards, roadsideCards, landscapeCards, specialCards, goldCards, classChoice, totalCards } from './constants/constants';
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
    cardTotalSum];

  // populate randomized deck given generated data
  var i;
  for (i = 0; i < allCards.length; i++) {
    var j;
    var randomCard;
    for (j = 0; j < allCardTotals[i]; j++) {
      // generate random number from 0 to size of array
      randomCard = Math.floor(Math.random() * (Math.floor(allCards[i].length) - Math.ceil(0)) + Math.ceil(0));

      // check if wheat field was selected and then add village if it hasn't been added yet
      if (allCards[i][randomCard] === "Wheat Fields") {
        if (allCards[0].indexOf("Village") > -1 && cardTotalSum < 14) {
          resultingCards[0].push("Village");
          resultingCards[0].push(allCards[i][randomCard]);
          allCards[0].splice(randomCard, 1);
          allCards[0].splice(allCards[i].indexOf("Village"), 1);
        }
        else if (cardTotalSum > 13) {
          // skip wheat field, too many cards for wheat fields AND village
          continue;
        }
        else {
          resultingCards[0].push(allCards[i][randomCard]);
          allCards[0].splice(randomCard, 1);
        }
      }
      // check if blood grove was selected and if conditions to select it are met
      else if (allCards[i][randomCard] === "Blood Grove") {
        // check if blood grove will be paired with grove
        if (resultingCards[0].indexOf("Grove") > -1) {
          resultingCards[1].push(allCards[1][randomCard]);
          allCards[1].splice(randomCard, 1);
        }
        else {
          // skip blood grove
          continue;
        }
      }
      else {
        // add randomly selected card to array of arrays containing all selected cards
        resultingCards[i].push(allCards[i][randomCard]);

        // remove randomly selected card(s) to avoid duplicates
        allCards[i].splice(randomCard, 1);
      }

      // catches to ensure roads and roadsides don't break upper and lower limits
      if (i === 0 && resultingCards[0].length < 2) {
        j--;
      }
      else if (i === 0 && resultingCards[0].length === 6) {
        break;
      }

      if (i === 1 && resultingCards[1].length < 2) {
        j--;
      }
      else if (i === 1 && resultingCards[1].length === 9) {
        break;
      }

    }

  }

  resultingCards[6] = resultingCards[0].length + resultingCards[1].length + resultingCards[2].length + resultingCards[3].length;

  // set the randomized deck as state
  //console.log(resultingCards);
  return resultingCards;
}

// randomize the chapter from 1-4
const randomizeChapter = () => {
  let randomChapter = Math.floor(Math.random() * (Math.floor(4) - Math.ceil(1) + 1) + Math.ceil(1));

  return randomChapter;
}

{/* 
  Main Component
*/}
const App = () => {

  // states used through app
  // our randomized deck, the randomized chapter and the page font
  const [randomizedDeck, setRandomizedDeck] = useState(placeholderDeck);
  const [randomizedChapter, setRandomizedChapter] = useState(0);
  const [pageFont, setPageFont] = useState('ARCADECLASSIC');
  const [pictures, setPictures] = useState(totalCards);

  useEffect(() => {   
    var i;   
    for (i = 0; i < pictures.length; i++) {
      pictures[i].forEach((image) => {
        new Image().src = require(`./assets/${image}.webp`).default;
      });

      /*var j;
      for (j = 0; j < pictures[i].length; j++) {
        
      }*/
    }
  }, [pictures]);

  // update the page font using event handler
  const changeFont = (event) => {
    setPageFont(event.target.value);
  }

  return (
    <div className="App" style={{ fontFamily: pageFont }}>
      <h1 className="title">Loop Hero Randomizer</h1>

      <div>
        <select className="fontSelect" value={pageFont} onChange={changeFont} style={{ fontFamily: pageFont }}>
          <option value="ARCADECLASSIC">Retro</option>
          <option value="roboto">Simple</option>
          <option value="dyslex">Dyslexic</option>
        </select>
      </div>

      <table className="table">
        <tbody>

          <tr>
            <th>
              <h2 className="cardsColumnsTitle">Cards</h2>
              <button className="randomizeButton" style={{ fontFamily: pageFont }} onClick={() => setRandomizedDeck(randomizeCards)}>Randomize</button>
            </th>
          </tr>

          <tr>
            <div className="cardsColumns">
              <h2>Total Cards: [{randomizedDeck[6]}]</h2>
              <h2>{tileType[0]} [{randomizedDeck[0].length}]</h2>
              {randomizedDeck[0].map((card, index) => (<img className="cardImage" key={index} src={require(`./assets/${card}.webp`).default} alt={card} />))}

              <h2>{tileType[1]} [{randomizedDeck[1].length}]</h2>
              {randomizedDeck[1].map((card, index) => (<img className="cardImage" key={index} src={require(`./assets/${card}.webp`).default} alt={card} />))}

              <h2>{tileType[2]} [{randomizedDeck[2].length}]</h2>
              {randomizedDeck[2].map((card, index) => (<img className="cardImage" key={index} src={require(`./assets/${card}.webp`).default} alt={card} />))}

              <h2>{tileType[3]} [{randomizedDeck[3].length}]</h2>
              {randomizedDeck[3].map((card, index) => (<img className="cardImage" key={index} src={require(`./assets/${card}.webp`).default} alt={card} />))}

              <h2>{tileType[4]}</h2>
              {randomizedDeck[4].map((card, index) => (<img className="cardImage" key={index} src={require(`./assets/${card}.webp`).default} alt={card} />))}

              <h2>{tileType[5]}</h2>
              {randomizedDeck[5].map((card, index) => (<img className="cardImage" key={index} src={require(`./assets/${card}.webp`).default} alt={card} />))}
            </div>
          </tr>
          <tr>
            <th>
              <h2 className="otherColumnTitle">Other</h2>
            </th>
          </tr>
          <tr>
            <td className="otherColumn">
              <button className="randomizeButton" style={{ fontFamily: pageFont }} onClick={() => setRandomizedChapter(randomizeChapter)}>Randomize</button>
              <h2>Chapter : [{randomizedChapter}]</h2>
            </td>
          </tr>

        </tbody>
      </table>

      <footer className="simpleFooter">Code at: <a href="https://github.com/williammabernathy/Loop-Hero-Randomizer"> https://github.com/williammabernathy/Loop-Hero-Randomizer </a></footer>

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
