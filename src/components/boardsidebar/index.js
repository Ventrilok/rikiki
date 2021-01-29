import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import PlayingCard from '../playingcard'
import Hand from '../hand'
import Bidder from '../bidder'

const useStyles = makeStyles(({ palette }) => ({
  title: {
    marginTop: 14,
    marginBottom: 14,
    fontSize: 22,
    fontWeight: 'bold'
  },
  sectionHeader: {
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.08)'
    }
  },
  settingHead: {
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.34)',
    fontWeight: 'bold',
    fontSize: 13,
    '& + *': {
      color: 'rgba(0,0,0,0.34)',
      fontSize: 28
    }
  },
  settingLabel: {
    fontSize: 13
  },
  settingIcon: {
    padding: 6,
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.04)',
    width: 32,
    height: 32
  },
  blue: {
    color: 'rgb(0, 153, 255)',
    background: 'none'
  },

  root: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 4,
    borderRadius: 40,
    border: '1px solid',
    borderColor: palette.grey[300]
  },
  iconBtn: {
    padding: 8,
    '& svg': {
      fontSize: 16
    }
  },
  value: {
    padding: '0px 8px'
  },
  btn: {
    borderRadius: 20,
    padding: '0.125rem 0.75rem',
    borderColor: '#becddc',
    fontSize: '0.75rem',
    marginRight: 5
  }
}))

const SectionHeader = ({ children }) => {
  const styles = useStyles()
  return (
    <Box
      p='14px'
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      className={styles.sectionHeader}
    >
      <Typography className={styles.settingHead}>{children}</Typography>
    </Box>
  )
}

const BoardSideBar = (props) => {
  const { trump, players, playerID, playerCanExchange, currentLevel, isLastPlayer, phase, canExchange, isCurrentPlayer, lastPlayedCards, onBid, onExchangeCard} = props
  const styles = useStyles()



  function LastPlayedCard () {
    return (
      <>
        <SectionHeader opened>Dernier Pli</SectionHeader>
        <Box pb={2} align='center'>
          <Hand cards={lastPlayedCards} cardWidth={80} spacing={0.25} layout='stack' />
        </Box>
        <Divider />
      </>
    )
  }

  function ExchangeTrump () {
    return (
      <>
        <SectionHeader opened>Echanger l'atout?</SectionHeader>
        <Box pb={2} align='center'>
          <Button className={styles.btn} variant='outlined' onClick={() => { onExchangeCard(true) }}>
            Oui
          </Button>
          <Button className={styles.btn} variant='outlined' onClick={() => { onExchangeCard(false) }}>
            Non
          </Button>
        </Box>
        <Divider />
      </>
    )
  }

  return (
    <div>
      <Box p='14px 14px 16px 14px' textAlign='center'>
        <Typography className={styles.title} variant='h1' align='center'>
          Atout
        </Typography>
        <PlayingCard card={trump} cardWidth={100} />
      </Box>
      <Divider />

      {phase === 'draw' && canExchange && playerID.toString() === playerCanExchange.toString() && <ExchangeTrump />}
      {phase === 'bid' && isCurrentPlayer && <><SectionHeader opened>Enchères</SectionHeader><Bidder currentLevel={currentLevel} players={players} isLastPlayer={isLastPlayer} onBid={onBid} /><Divider /></>}
      {phase === 'playcard' && <LastPlayedCard />}
    </div>
  )
}

export default BoardSideBar
