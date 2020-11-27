import { store } from './store';
import shuffle from 'lodash.shuffle';

export const SET_OPENED = 'SET_OPENED';
export const RESET_OPENED = 'RESET_OPENED';
export const SET_MATCHED = 'SET_MATCHED';
export const RESET_MATCHED = 'RESET_MATCHED';
export const INCREASE_MOVES = 'INCREASE_MOVES';
export const RESET_MOVES = 'RESET_MOVES';
export const SET_STATUS = 'SET_STATUS';
export const SHUFFLE = 'SHUFFLE';

export function openedReducer(opened, action) {
  switch (action.type) {
    case RESET_OPENED:
      return [];
    case SET_OPENED:
      return [...opened, action.index];
    default:
      throw new Error();
  }
}

export function matchedReducer(matched, action) {
  switch (action.type) {
    case SET_MATCHED:
      return distinct([...matched, action.firstCardId]);
    case RESET_MATCHED:
      return [];
    default:
      throw new Error();
  }
}

export function movesReducer(moves, action) {
  switch (action.type) {
    case INCREASE_MOVES:
      return moves + 1;
    case RESET_MOVES:
      return 0;
    default:
      throw new Error();
  }
}

export function hasFinishedReducer(_, action) {
  switch (action.type) {
    case SET_STATUS:
      return action.hasFinished;
    default:
      throw new Error();
  }
}

export function shuffleDoubleCards(_, action) {
  switch (action.type) {
    case SHUFFLE:
      const cards = store.cards;
      return shuffle([...cards, ...cards]);
    default:
      throw new Error();
  }
}

function distinct(arr) {
  return arr.reduce((arr, value) => {
    if (!arr.includes(value)) arr.push(value);
    return arr;
  }, []);
}
