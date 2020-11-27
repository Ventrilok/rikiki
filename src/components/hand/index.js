import React from 'react'
import PlayingCard from '../playingcard'
import '../../utils/cards.css'

const Hand = ({ cards, cardSize, layout, onPlayCard }) => {
  return (

    <div className='hand active-hand hhand-compact'>
      {cards.map((card, index) => (
        <PlayingCard card={card} height={cardSize} onClick={() => onPlayCard(index)} key={card.key} />
      ))}
    </div>

  )
}

export default Hand
