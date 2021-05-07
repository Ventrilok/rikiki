import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import cx from 'clsx';

const useStyles = makeStyles(() => ({
  root: ({ active }) => ({
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
    ...(active && {
      backgroundColor: '#038C65',
    }),
    height: 60,
  }),

  avatar: ({ active }) => ({
    width: 40,
    height: 40,
    marginRight: 12,
    ...(active && {
      backgroundColor: '#fff',
      color: '#038C65',
    }),
    ...(!active && {
      backgroundColor: '#038C65',
      color: '#fff',
    }),
  }),
  primary: ({ active }) => ({
    color: '#fff',
    ...(!active && {
      color: '#000',
    }),
    ...(active && {
      fontWeight: 'bold',
    }),
  }),
  secondary: ({ active }) => ({
    fontSize: 13,
    color: '#fff',
    ...(!active && {
      color: '#000',
    }),
  }),
  float: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -10,
    transform: 'translate(-50%, -50%)',
  },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: '#F2CB05',
    borderRadius: '50%',
  },
}));

const PlayerListItem = ({ active, tricks, bid, score, playerName, absoluteZero, hold }) => {
  const info = `${bid == null ? '-' : tricks} pli${+(tricks > 1) ? 's' : ''} • enchère: ${
    bid == null ? '-' : bid
  }`;
  const playerNameEnhanced = `${playerName} ${absoluteZero ? '🥶' : ''}`;
  const styles = useStyles({ active });

  return (
    <Box px={1}>
      <ListItem className={styles.root}>
        <Avatar className={styles.avatar}>{score}</Avatar>
        <ListItemText
          primary={playerNameEnhanced}
          secondary={info}
          primaryTypographyProps={{ noWrap: true }}
          secondaryTypographyProps={{ noWrap: true }}
          classes={{ primary: styles.primary, secondary: styles.secondary }}
        />
        <Box position="relative">{hold && <div className={cx(styles.float, styles.dot)} />}</Box>
      </ListItem>
    </Box>
  );
};

export default PlayerListItem;
