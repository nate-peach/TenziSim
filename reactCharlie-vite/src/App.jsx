import React from 'react';
import Die from './Die';
import Confetti from 'react-confetti'
import './style.css';
import { nanoid } from 'nanoid';

function App() {

function generateNewDie() {
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid()
  };
};

function allNewDice() {
  let randomNums = [];
  for (let i = 0; i < 10; i++) {
    randomNums.push(generateNewDie());
  };
  return randomNums;
};

const [randomDice, setRandomDice] = React.useState(allNewDice());

function handleKeep(dieId) {
  setRandomDice(oldDice => oldDice.map(die => 
    die.id === dieId ? {
        ...die,
        isHeld: !die.isHeld
      }
      : die
    )
  );
};

const diceElements = randomDice.map(num => 
  <Die 
  key={num.id}
  value={num.value}
  isHeld={num.isHeld}
  holdDie={() => handleKeep(num.id)} 
  />
);

function handleRoll() {
  if (victory) { 
    setRandomDice(allNewDice())
    setVictory(false);
  }
  else
    setRandomDice(prevDice => prevDice.map(oldDie => 
    oldDie.isHeld ? oldDie : generateNewDie()
      )
    );
};

const [victory, setVictory] = React.useState(false);

React.useEffect(() => {
  let checker = randomDice[0].value;
  for (let singleDie of randomDice) {
    if (singleDie.value != checker) {
      return;
    }
  };
  setVictory(true);
  if (victory == true) {
    console.log('Victory!');
  }
  }, [randomDice]
);

  return (
      <main>
        {victory && <Confetti />}
        <section className='dice'>
          {diceElements}
        </section>
        <button className='roll-button' onClick={handleRoll}>
          {victory ? "Restart" : "Roll"}
        </button>
      </main>
  )
}

export default App