import React from 'react'
import '../../utils/cards.css'

const PlayingCard = ({ card, height, onClick }) => {
  const cardSVG =
    card.length !== 0 ? './cards/' + card.key + '.svg' : './cards/RED_BACK.svg'

  return (

    <img
      className='card'
      alt={cardSVG}
      src={cardSVG}
      onClick={onClick}
    />

  )
}

export default PlayingCard
