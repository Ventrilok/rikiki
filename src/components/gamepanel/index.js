import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';

const useStyles = makeStyles(({ palette }) => ({
  avatar: {
    width: 30,
    height: 30,
    margin: 3,
    backgroundColor: palette.grey[500],
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    margin: 0,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: '1px',
    color: '#038C65',
  },
  totalRound: {
    fontSize: 14,
    color: palette.grey[500],
  },
}));

const GamePanel = (props) => {
  const { direction, currentLevel, totalRound } = props;
  const styles = useStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });

  const directionUpIcon = <ArrowUpwardIcon />;
  const directionDownIcon = <ArrowDownwardIcon />;

  return (
    <Box py="10px" px={1} alignItems="center">
      <Divider />
      <Box display="flex">
        <Box p={2} flex="auto" className={borderedGridStyles.item}>
          <div className={styles.statLabel}>Manche</div>
          <div className={styles.statValue}>
            {currentLevel}
            <span className={styles.totalRound}>/{totalRound}</span>
          </div>
        </Box>
        <Box p={2} flex="auto">
          <div className={styles.statLabel}>Direction</div>
          <Avatar className={styles.avatar} style={{ marginLeft: '40%' }}>
            {direction === 'up' ? directionUpIcon : directionDownIcon}
          </Avatar>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default GamePanel;
