import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const images = require.context('../../images/', true);

const useStyles = makeStyles(() => ({
  card: {
    width: ({ cardWidth }) => cardWidth,
    margin: 0,
    padding: 0,
    border: 0,
  },
}));

const PlayingCard = ({ card, cardWidth, onClick }) => {
  const styles = useStyles({ cardWidth });

  const cardSVG =
    card.length !== 0
      ? images(`./${card.key.toUpperCase()}.svg`).default
      : images('./RED_BACK.svg').default;

  return <img className={styles.card} src={cardSVG} onClick={onClick} />;
};

export default PlayingCard;
