import React, { Fragment } from 'react'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'
import { makeStyles } from '@material-ui/core/styles'
import { Column, Row, Item } from '@mui-treasury/components/flex'

import MatchListItem from './matchlistitem'

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    overflow: 'hidden'
  },
  header: {
    backgroundColor: '#fff'
  },
  headline: {
    color: '#122740',
    fontSize: '1.25rem',
    fontWeight: 600
  },
  actions: {
    color: '#BDC9D7'
  },
  divider: {
    backgroundColor: '#d9e2ee',
    margin: '0 20px'
  }
}))

const MatchList = ({ matches, playerName, onJoinMatch, onLeaveMatch, onStartMatch, onRefreshMatches }) => {
  const styles = useStyles()

  return (
    <>
      <Column p={0} gap={0} className={styles.card}>
        <Row wrap p={2} alignItems='baseline' className={styles.header}>
          <Item stretched className={styles.headline}>Liste des matches</Item>
          <Item className={styles.actions}>
            <IconButton className={styles.iconBtn} onClick={() => { onRefreshMatches() }}>
              <RefreshIcon />
            </IconButton>
          </Item>
        </Row>
        {matches.map((match, index) => (
          <Fragment key={index}>
            <MatchListItem match={match} playerName={playerName} onJoinMatch={onJoinMatch} onLeaveMatch={onLeaveMatch} onStartMatch={onStartMatch} key={match.MatchID} />
            <Divider variant='middle' className={styles.divider} />
          </Fragment>
        ))}
      </Column>
    </>
  )
}

export default MatchList
