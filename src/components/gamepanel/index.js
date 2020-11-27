import React from 'react'
import cx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded'
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered'

const useStyles = makeStyles(({ palette }) => ({
  card: {
    minWidth: 256,
    textAlign: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    margin: 8
  },
  heading: {
    fontWeight: 'bold',
    letterSpacing: '0.8px',
    marginTop: 8,
    marginBottom: 11,
    flex: 'auto',
    marginLeft: 5
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
    textAlign: 'center'

  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: '1px',
    color: '#038C65'
  },
  totalRound: {
    fontSize: 16,
    color: palette.grey[500]
  }
}))

const GamePanel = (props) => {
  const {direction, currentLevel, totalRound} = props
  const styles = useStyles()
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%'
  })

  const directionUpIcon = (
    <ArrowUpwardIcon />
  )
  const directionDownIcon = (
    <ArrowDownwardIcon />
  )

  return (
    <Box py={'10px'} px={2} alignItems={'center'}>
      <Divider />
      <Box />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Direction</p>
          <Avatar className={styles.avatar}>{direction === 'up' ? directionUpIcon : directionDownIcon}</Avatar>
        </Box>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Manche</p>
          <p className={styles.statValue}>{currentLevel}<span className={styles.totalRound}>/{totalRound}</span></p>
        </Box>
      </Box>
      <Divider />
    </Box>
  )
}

export default GamePanel
