import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import CheckIcon from '@material-ui/icons/Check'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ palette }) => ({
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

const Bidder = ({ currentLevel, players, isLastPlayer, onBid }) => {
  const styles = useStyles()

  let totalBid = 0
  for (let i = 0; i < players.length; i++) {
    totalBid += players[i].bid
  }

  const forbbidenBid = currentLevel - totalBid
  const possibleBids = Array.from(Array(currentLevel + 1).keys())

  if (isLastPlayer) {
    const removed = possibleBids.splice(forbbidenBid, 1)
  }

  const [bid, setBid] = useState([])

  function decreaseBid () {
    if (bid.length === 0) {
      setBid((forbbidenBid !== 0) ? 0 : 1)
    } else if (possibleBids.includes(bid - 1)) { setBid(bid - 1) } else if (bid - 2 >= 0) {
      setBid(bid - 2)
    }
  }

  function increaseBid () {
    if (bid.length === 0) {
      setBid((forbbidenBid !== 0) ? 0 : 1)
    } else if (possibleBids.includes(bid + 1)) { setBid(bid + 1) } else if (bid + 2 <= currentLevel) {
      setBid(bid + 2)
    }
  }

  function validateBid () {
    if (!Array.isArray(bid)) { onBid(bid) }
  }

  return (
    <Box mb={2} align='center'>
      <div className={styles.root}>
        <IconButton className={styles.iconBtn} onClick={() => decreaseBid()}>
          <Remove />
        </IconButton>
        <span className={styles.value}>{bid}</span>
        <IconButton className={styles.iconBtn} onClick={() => increaseBid()}>
          <Add />
        </IconButton>
        &nbsp;
        <IconButton className={styles.iconBtn} disabled={Array.isArray(bid)} color='primary' onClick={() => validateBid()}>
          <CheckIcon />
        </IconButton>
      </div>
    </Box>
  )
}

export default Bidder
