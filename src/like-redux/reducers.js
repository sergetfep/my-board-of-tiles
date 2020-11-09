export const ZEROING = 'ZEROING';
export const SET_OPENED = 'SET_OPENED';
export const SET_MATCHED = 'SET_MATCHED';
export const SET_MOVES = 'SET_MOVES';


export function openedReducer(opened, action) {
  switch (action.type) {
    case ZEROING:
      return [];
      case SET_OPENED:
      return [
        ...opened, 
        action.index];
    default:
      throw new Error();
  }
}
  
export function matchedReducer(matched, action) {
  switch (action.type) {
      case SET_MATCHED:
      return [
        ...matched, 
        action.firstCardId];
    default:
      throw new Error();
  }
}
  
export function movesReducer(moves, action) {
  switch (action.type) {
      case SET_MOVES:
      return moves + 1;
    default:
      throw new Error();
  }
}