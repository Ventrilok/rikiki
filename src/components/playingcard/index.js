import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  card: {
    width: ({ cardWidth }) => cardWidth,
    margin: 0,
    padding: 0,
    border: 0
  }
}))

const PlayingCard = ({ card, cardWidth, onClick }) => {
  const styles = useStyles({ cardWidth })

  const cardSVG =
    card.length !== 0 ? './cards/' + card.key + '.svg' : './cards/RED_BACK.svg'

  return (
    <img
      className={styles.card}
      alt={cardSVG}
      src={cardSVG}
      onClick={onClick}
    />

  )
}

export default PlayingCard
