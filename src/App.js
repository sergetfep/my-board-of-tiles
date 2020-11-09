import React, { useEffect, useReducer } from 'react';
import './App.css';
import shuffle from 'lodash.shuffle';
import { store } from './like-redux/store';
import { Card } from './components/Card';
import { matchedReducer, movesReducer, openedReducer, ZEROING, SET_OPENED, SET_MATCHED, SET_MOVES } from './like-redux/reducers';

const cards = store.cards;

const doubleCards = shuffle([...cards, ...cards]);

export const App = () => {
  const [opened, setOpened] = useReducer(openedReducer, []);
  const [matched, setMatched] = useReducer(matchedReducer, []);
  const [moves, setMoves] = useReducer(movesReducer, 0);

  useEffect(() => {
    if (opened.length < 2) return;

    const firstCard = doubleCards[opened[0]];
    const secondCard = doubleCards[opened[1]];

    if(firstCard.color === secondCard.color) {
      setMatched({type: SET_MATCHED, firstCardId: firstCard.id})
    }

  }, [opened]);

  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened({type: ZEROING}), 800);

  }, [opened]);

  useEffect(() => {
    if (matched.length === cards.length) alert('Congratulations!'); 
  }, [matched])

  function flipCard(index) {
    setOpened({type: SET_OPENED, index});
    setMoves({type: SET_MOVES});
  }
  const rounds = Math.floor(moves/2);

  return <div className='app'>
    <p>
      {rounds}
      <strong> rounds</strong>
    </p>
    <div className='cards'>
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
      )
    })}
    </div>
  </div>
}
