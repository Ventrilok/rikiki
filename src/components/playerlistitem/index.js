import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(({ palette }) => ({
  root: ({ active }) => ({
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
    ...(active && {
      backgroundColor: '#038C65',
    }),

  }),

  avatar: ({ active }) => ({
    width: 50,
    height: 50,
    marginRight: 12,
    ...(active && {
        backgroundColor:'#fff',
        color:'#038C65'
    }), 
    ...(!active && {
        backgroundColor:'#038C65'
    }), 
  }),
  primary: ({ active }) => ({
    color: '#fff',
    ...(!active && {
      color: '#000',
    }),
    ...(active && {
      fontWeight: 'bold'
    }),    
  }),
  secondary: ({ active }) => ({
    fontSize: 13,
    color: '#fff',
    ...(!active && {
      color: '#000',
    }), 
  }),
}));

const PlayerListItem = ({
  active,
  tricks,
  bid,
  score,
  playerName
}) => {
  const info = ((bid == null) ? '-' : tricks) + ' pli'+ ( + (tricks>1) ? 's':'') + ' • enchère: ' + ((bid == null) ? '-' : bid);
  const styles = useStyles({ active });

  return (
    <Box px={1}>
      <ListItem className={styles.root}>
        <Avatar className={styles.avatar}>{score}</Avatar>
        {(
          <>
            <ListItemText
              primary={playerName}
              secondary= {info}
              primaryTypographyProps={{ noWrap: true }}
              secondaryTypographyProps={{ noWrap: true }}
              classes={{ primary: styles.primary, secondary: styles.secondary }}
            />
          </>
        )}
      </ListItem>
    </Box>
  );
};

export default PlayerListItem;
