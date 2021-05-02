import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(() => ({
  settingHead: {
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.34)',
    fontWeight: 'bold',
    fontSize: 13,
    '& + *': {
      color: 'rgba(0,0,0,0.34)',
      fontSize: 28,
    },
  },
}));

const SectionHeader = ({ children }) => {
  const styles = useStyles();
  return (
    <Box
      p="14px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className={styles.sectionHeader}
    >
      <Typography className={styles.settingHead}>{children}</Typography>
    </Box>
  );
};

const ExitLobby = ({ onExitLobby }) => (
  <div>
    <SectionHeader>Options</SectionHeader>
    <Box pb={2}>
      <Box
        height="44px"
        pl="14px"
        pr="12px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2">Quitter le jeu</Typography>
        <IconButton
          color="primary"
          onClick={() => {
            onExitLobby();
          }}
        >
          <ExitToApp />
        </IconButton>
      </Box>
    </Box>
    <Divider />
  </div>
);

export default ExitLobby;
