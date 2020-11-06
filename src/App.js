import './App.css';
import React, { useState } from 'react';  //Line 2:17:  'useState' is defined but never used  no-unused-vars (Wieso???)

/*TODO:
ID bei der Erstellung generieren und nicht im Namen anzeigen
Achievement-Liste
Redux statt alerts
Überprüfung auf doppelte Namen
Übersetzung in Typescript
*/

var idCount = 1;
var deleteCount = 0;
var createCount = 0;

function Deck({ deck, index, removeDeck }) {
  return (
    <div className="deck">
      {deck.name}
      {deck.id}
      <div>
      <button onClick={() => removeDeck(index)}>x</button>
      </div>
    </div>
  );
};

function DeckForm({ addDeck }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addDeck(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {

  const [decks, setDecks] = React.useState([
    //ID wird im Namen angezeigt (muss noch gefixt werden)
    { name: "Deck 1", id: 1}, 
    { name: "Deck 2", id: 2},
    { name: "Deck 3", id: 3},
  ]);

  const addDeck = name => {
    const newDecks = [...decks, { name }];
    //aktuell noch alerts, redux store + Liste auf Seite fehlt
    if (createCount === 0) {
      alert("Erstes Deck erstellt!");
    }
    if (createCount === 9) {
      alert("Zehntes Deck erstellt!");
    } 
    //Dem Deck soll eine ID zugewiesen werden
    //const newDecks = [...decks, { id = idCount }];
    idCount++;
    createCount++;
    setDecks(newDecks);
  };

  const removeDeck = index => {
    const newDecks = [...decks];
    if (deleteCount === 0) {
      alert("Erstes Deck gelöscht!");
    }
    deleteCount++;
    newDecks.splice(index, 1);
    setDecks(newDecks);
  };
  
  return (
    <div className="app">
      <div className="deck-list">
        {decks.map((deck, index) => (
          <Deck
            key={index}
            index={index}
            deck={deck}
            removeDeck={removeDeck}
          />
        ))}
        <DeckForm addDeck={addDeck} />
      </div>
    </div>
  );
}

export default App;