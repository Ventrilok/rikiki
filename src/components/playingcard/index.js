import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const images = require.context('../../images/', true)
console.log(images('./3D.svg'))

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

  const cardSVG = card.length !== 0 ? images('./' + card.key.toUpperCase() + '.svg').default :  images('./RED_BACK.svg').default


  //  card.length !== 0 ? '../../images/cards/' + card.key + '.svg' : '../../images/cards/RED_BACK.svg'

  return (
<>
    <img
      className={styles.card}
      src={cardSVG}
      onClick={onClick}
    />
</>
  )
}

export default PlayingCard
