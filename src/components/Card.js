export const Card = ({index, card, isFlipped, flipCard}) => {
    return (
      <button 
        className={`card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => flipCard(index)}
      >
        <div className='inner'>
          <div className={`front ${card.color}`}></div>
          <div className='back'></div>
        </div>  
      </button>
    )   
  }