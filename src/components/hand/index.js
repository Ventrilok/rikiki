import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PlayingCard from '../playingcard'

const useStyles = makeStyles(() => ({
  hand: {
    padding: 0,
    marginLeft: '0px',
    paddingTop: '10px',
    display: 'inline-block',
    '& img:first-child': {
      marginLeft: '0px',
      paddingTop: '15px'
    },
    '& img': {
      marginLeft: ({ cardWidth, spacing }) => -cardWidth * (1.0 - spacing),
      paddingTop: '10px'
    },
    '& img:hover': {
      paddingTop: '0px',
      paddingBottom: '15px'
    }
  }

}))

const Hand = ({ cards, cardWidth, active, spacing, onPlayCard }) => {
  const styles = useStyles({ cardWidth, spacing, active })

  return (
    <div className={styles.hand}>
      {cards.map((card, index) => (
        <PlayingCard card={card} cardWidth={cardWidth} onClick={() => onPlayCard(index)} key={card.key} />
      ))}
    </div>
  )
}
export default Hand
