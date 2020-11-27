import React, { useEffect, useReducer } from 'react';
import './App.css';
import { store } from './like-redux/store';
import { Card } from './components/Card';
import {
  matchedReducer,
  movesReducer,
  openedReducer,
  hasFinishedReducer,
  shuffleDoubleCards,
  SHUFFLE,
  RESET_OPENED,
  SET_OPENED,
  SET_MATCHED,
  INCREASE_MOVES,
  RESET_MATCHED,
  RESET_MOVES,
  SET_STATUS,
} from './like-redux/reducers';

export const App = () => {
  const [opened, setOpened] = useReducer(openedReducer, []);
  const [matched, setMatched] = useReducer(matchedReducer, []);
  const [moves, setMoves] = useReducer(movesReducer, 0);
  const [hasFinished, setHasFinished] = useReducer(hasFinishedReducer, false);
  const [doubleCards, setDoubleCards] = useReducer(shuffleDoubleCards, []);

  useEffect(() => {
    setDoubleCards({ type: SHUFFLE });
  }, []);
  useEffect(() => {
    if (opened.length < 2) return;

    const firstCard = doubleCards[opened[0]];
    const secondCard = doubleCards[opened[1]];

    if (firstCard.color === secondCard.color) {
      setMatched({ type: SET_MATCHED, firstCardId: firstCard.id });
    }
  }, [opened, doubleCards]);

  useEffect(() => {
    if (opened.length === 2)
      setTimeout(() => setOpened({ type: RESET_OPENED }), 800);
  }, [opened]);

  useEffect(() => {
    if (matched.length === store.cards.length) {
      setTimeout(setHasFinished({ type: SET_STATUS, hasFinished: true }), 800);
      alert('Congratulations!');
    }
  }, [matched]);

  function flipCard(index) {
    if (!hasFinished) {
      setOpened({ type: SET_OPENED, index });
      setMoves({ type: INCREASE_MOVES });
    }
  }

  function reset() {
    setMatched({ type: RESET_MATCHED });
    setMoves({ type: RESET_MOVES });
    setOpened({ type: RESET_OPENED });
    setHasFinished({ type: SET_STATUS, hasFinished: false });
    setTimeout(() => setDoubleCards({ type: SHUFFLE }), 1000);
  }

  const rounds = Math.floor(moves / 2);

  return (
    <div className="app">
      <div>
        <button className="reset-btn" onClick={reset}>
          Reset
        </button>
      </div>
      <p>
        {rounds}
        <strong> rounds</strong>
      </p>
      <div className="cards">
        {doubleCards.map((card, index) => {
          let isFlipped = false;

          if (opened.includes(index)) isFlipped = true;
          if (matched.includes(card.id)) isFlipped = true;

          return (
            <Card
              key={index}
              index={index}
              card={card}
              isFlipped={isFlipped}
              flipCard={flipCard}
            />
          );
        })}
      </div>
    </div>
  );
};
