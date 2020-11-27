import React , { useState } from 'react'
import cx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import CheckIcon from '@material-ui/icons/Check'
import PlayingCard from '../playingcard'
import Hand from '../hand'


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
      p={'14px'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      className={styles.sectionHeader}
    >
      <Typography className={styles.settingHead}>{children}</Typography>
    </Box>
  )
}

const BoardSideBar = (props) => {
  const { trump, players, currentLevel,isLastPlayer, phase, canExchange, isCurrentPlayer,lastPlayedCards, onExchangeCard} = props
  const styles = useStyles()


  let totalBid = 0
  for (let i = 0; i < players.length; i++) {
    totalBid += players[i].bid
  }

  const forbbidenBid = currentLevel - totalBid
  const possibleBids = Array.from(Array(currentLevel+1).keys())

  if(isLastPlayer)
  {
    let removed = possibleBids.splice(forbbidenBid, 1)
  }

  const [bid, setBid] = useState([]);


  function decreaseBid(){
    if (bid.length === 0)
    {
      setBid((forbbidenBid !=0) ? 0 :1)
    }
    else if (possibleBids.includes(bid-1))
        setBid(bid-1)
    else if (bid-2>=0){
        setBid(bid-2)
    }
  }

  function increaseBid(){
    if (bid.length === 0)
    {
      setBid((forbbidenBid !=0) ? 0 :1)
    }
    else if (possibleBids.includes(bid+1))
        setBid(bid+1)
    else if (bid+2<=currentLevel){
        setBid(bid+2)
    }

  }
 function Bidder(){
   return(
     <>
     <SectionHeader opened>Enchères</SectionHeader>
     <Box pb={2} align={'center'}>
       <div className={styles.root}>
         <IconButton className={styles.iconBtn} onClick={() => decreaseBid()} >
           <Remove />
         </IconButton>
         <span className={styles.value}>{bid}</span>
         <IconButton className={styles.iconBtn} onClick={() => increaseBid()}>
           <Add />
         </IconButton>
         <>
         &nbsp;
         </>
         <IconButton className={styles.iconBtn} color="primary" onClick={() => props.onBid(bid)}>
           <CheckIcon />
         </IconButton>
       </div>
     </Box>
     <Divider />
     </>
   )
 }

function LastPlayedCard()
{
  return(
    <>
    <SectionHeader opened>Dernière Pli</SectionHeader>
    <Box pb={2} align={'center'}>
      <Hand cards={lastPlayedCards} cardSize={50} layout={'stack'} />
    </Box>
    <Divider />    
    </>
  )
}

function ExchangeTrump()
{
  return(
    <>
    <SectionHeader opened>Echanger l'atout?</SectionHeader>
    <Box pb={2} align={'center'}>
    <Button className={styles.btn} variant={'outlined'} onClick={() => { onExchangeCard(true) }}>
    Oui
    </Button>
    <Button className={styles.btn} variant={'outlined'} onClick={() => { onExchangeCard(false)}}>
    Non
    </Button>    
    </Box>
    <Divider />    
    </>
  )
}


  return (
    <div>        
      <Box p={'14px 14px 16px 14px'} textAlign={'center'}>
        <Typography className={styles.title} variant={'h1'} align={'center'}>
          Atout
        </Typography>
        <PlayingCard card={trump} height={160}/>
      </Box>
      <Divider />
      {phase ==='draw' && canExchange  && <ExchangeTrump/>}
      {phase ==='bid'  && isCurrentPlayer && <Bidder/>}
      {phase ==='playcard'  && <LastPlayedCard/>
    }
    </div>
  )
}

export default BoardSideBar
