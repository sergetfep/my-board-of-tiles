import React, { useState, useEffect } from 'react';
import './App.css';
import shuffle from 'lodash.shuffle';
import { store } from './store';
import { Card } from './components/Card';

const cards = store.cards;

const doubleCards = shuffle([...cards, ...cards]);

export const App = () => {
  const [opened, setOpened] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (opened.length < 2) return;

    const firstCard = doubleCards[opened[0]];
    const secondCard = doubleCards[opened[1]];

    if(firstCard.color === secondCard.color) {
      setMatched((matched) => [...matched, firstCard.id]);
    }

  }, [opened]);

  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 800);
  }, [opened]);

  useEffect(() => {
    if (matched.length === cards.length) alert('Congratulations!'); 
  }, [matched])

  function flipCard(index) {
    setOpened(opened => [...opened, index]);
    setMoves((moves) => moves + 1);  
  }

  return <div className='app'>
    <p>
      {Math.floor(moves/2)}
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
