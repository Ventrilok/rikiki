import React, { useState } from 'react'
import cx from 'clsx'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import { Column, Row, Item } from '@mui-treasury/components/flex'
import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'
import { server } from '../utils/constants'

import { LobbyClient } from 'boardgame.io/client'

const useMatchStyles = makeStyles(() => ({
  text: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  name: {
    fontWeight: 600,
    fontSize: '1rem',
    color: '#122740'
  },
  caption: {
    fontSize: '0.875rem',
    color: '#758392',
    marginTop: -4
  },
  btn: {
    borderRadius: 20,
    padding: '0.125rem 0.75rem',
    borderColor: '#becddc',
    fontSize: '0.75rem',
    marginRight: 5
  }
}))

const MatchListItem = ({match, playerName, onJoinMatch, onLeaveMatch, onStartMatch }) => {
  function handleJoin (matchID) {
    onJoinMatch(matchID, findFreeSeat(match.players).id)
  }

  function handlePlay (matchID) {
    // console.log(matchID, `${findPlayerSeat(match.players, playerName).id}`, match.players.length)
    onStartMatch(matchID, `${findPlayerSeat(match.players, playerName).id}`, match.players.length)
  }
  function handleLeave (matchID) {
    onLeaveMatch(matchID)
  }

  const findFreeSeat = (players) => players.find((player) => !player.name)
  const freeSeat = findFreeSeat(match.players) // position of the free seat in the given match

  const findPlayerSeat = (players, playerName) => players.find((player) => player.name === playerName)
  const playerSeat = findPlayerSeat(match.players, playerName)

  const alreadyJoined = false

  const styles = useMatchStyles()
  return (
    <Row gap={2} p={2.5}>
      <Row wrap grow gap={0.5} minWidth={0}>
        <Item grow minWidth={0}>
          <div className={cx(styles.name, styles.text)}>{match.matchID}</div>
          <div>
            {match.players.map((aPlayer, index) => (
              <span key={match.matchID + '-player-' + index}>
                <Chip label={aPlayer.name || '...'} icon={<FaceIcon />} />
              &nbsp;
              </span>
          ))}

          </div>
        </Item>
        <Item position={'middle'}>
          {freeSeat && !playerSeat && !alreadyJoined && (
            <Button className={styles.btn} variant={'outlined'} onClick={() => { handleJoin(match.matchID) }}>
            Rejoindre
          </Button>)}

          {!freeSeat && playerSeat && (
            <Button className={styles.btn} variant={'outlined'} onClick={() => { handlePlay(match.matchID) }}>
            Jouer
          </Button>
          )}
          {playerSeat && (
            <Button className={styles.btn} variant={'outlined'} onClick={() => { handleLeave(match.matchID) }}>
            Quitter
          </Button>)}
        </Item>
      </Row>
    </Row>
  )
}

export default MatchListItem
