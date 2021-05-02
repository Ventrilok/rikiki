import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import PlayingCard from '../playingcard';

const useStyles = makeStyles(() => ({
  hand: {
    display: 'inline-block',
    '& img:first-child': {
      marginLeft: '0px',
      paddingTop: '35px',
    },
    '& img': {
      marginLeft: ({ cardWidth, spacing }) => -cardWidth * (1.0 - spacing),
      paddingTop: '10px',
    },
    '& img:hover': {
      paddingTop: '0px',
      paddingBottom: '35px',
    },
  },
}));

const Hand = ({ cards, cardWidth, active, spacing, onPlayCard }) => {
  const styles = useStyles({ cardWidth, spacing, active });

  return (
    <Box className={styles.hand}>
      {cards.map((card, index) => (
        <PlayingCard
          card={card}
          cardWidth={cardWidth}
          onClick={() => onPlayCard(index)}
          key={card.key}
        />
      ))}
    </Box>
  );
};
export default Hand;
