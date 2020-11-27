import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import Hand from '../hand'

import { filter } from 'lodash'
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles'
import Layout, {
  Root,
  getHeader,
  getContent,
  getDrawerSidebar,
  getSidebarContent,
  getCollapseBtn,
  getStandardScheme
} from '@mui-treasury/layout'

import theme from '../../theme/theme.js'

import GamePanel from '../gamepanel'
import PlayerList from '../playerlist'
import BoardHeader from '../boardheader'
import BoardSideBar from '../boardsidebar'
import CentralDeck from '../centraldeck'

const scheme = Layout()

scheme.configureHeader(builder => {
  builder.registerConfig('xs', {
    position: 'fixed',
    clipped: true,
    initialHeight: 64
  })
})

scheme.configureEdgeSidebar(builder => {
  builder
    .create('primarySidebar', { anchor: 'left' })
    .registerPermanentConfig('xs', {
      width: 250,
      collapsible: true,
      collapsedWidth: 72,
      autoExpanded: true
    })

  builder
    .create('secondarySidebar', { anchor: 'right' })
    .registerPersistentConfig('sm', {
      width: 250,
      collapsible: false,
      persistentBehavior: 'fit'
    })
})

const Header = getHeader(styled)
const Content = getContent(styled)
const DrawerSidebar = getDrawerSidebar(styled)
const SidebarContent = getSidebarContent(styled)

const msgGameOver = ''
const useStyles = makeStyles(() => ({
  header: {
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, .10)',
    backgroundColor: '#fff'

  },
  body: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
    overflowY: 'auto',
    backgroundColor: '#fff'
  }

}))

const RikikiBoard = (props) => {
  const {G, ctx, moves, playerID, matchData, onExitMatch} = props
  const styles = useStyles()
  const isCurrentPlayer = (playerID === ctx.currentPlayer)

  function exchangeTrump (doExchange) {
    moves.exchangetrump(doExchange)
  }

  function announceBid (bid) {
    moves.bid(bid)
  }

  function playCard (index) {
    if (G.playedCards.length === 0) {
      moves.playcard(index)
    } else {
      const playerCard = G.players[ctx.currentPlayer].hand[index]
      const results = filter(G.players[ctx.currentPlayer].hand, ['suit', G.playedCards[0].suit])
      if (results.length > 0 && playerCard.suit == G.playedCards[0].suit) {
        moves.playcard(index)
      } else if (results.length === 0) {
        moves.playcard(index)
      }
    }
  }

  let msgGameOver = ''
  if (ctx.gameover) {
    msgGameOver = <h1>Game Over</h1>
  }

  const [centralDeck, setCentralDeck] = useState([])

  useEffect(() => {
    let timer
    if (ctx.phase === 'playcard') {
      if (G.playedCards.length === 0) {
        setCentralDeck(G.lastPlayedCards)
        timer = setTimeout(() => { setCentralDeck([]) }, 2000)
      } else if (G.playedCards.length > 0) {
        setCentralDeck(G.playedCards)
      } else {
        {
          setCentralDeck([])
        }
      }
    }

    return () => {
      clearTimeout(timer)
    }
  }, [G.playedCards])

  const transitions = useTransition(centralDeck, card => card.key, {
    initial: { opacity: 1 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  return (
    <Root theme={theme} scheme={scheme} initialState={{
      sidebar: {
        primarySidebar: { collapsed: false },
        secondarySidebar: { open: true }
      }
    }}>>
      <CssBaseline />
      <Header className={styles.header}>
        <Toolbar>
          <BoardHeader playerName={G.players[playerID].name} onExitMatch={onExitMatch} />
        </Toolbar>
      </Header>

      <DrawerSidebar sidebarId={'primarySidebar'}>
        <SidebarContent>
          <GamePanel direction={G.direction} currentLevel={G.currentLevel} totalRound={G.totalRound} />
          <Box p={'4px 16px 12px'}>
            {ctx.phase}{msgGameOver} <br />
            {G.canExchange ? matchData[G.playerCanExchange].name + ' peut échanger son 2 d\'atout' : ''}
          </Box>
          <PlayerList players={G.players} playerNames={matchData} currentPlayer={ctx.currentPlayer} />
        </SidebarContent>
      </DrawerSidebar>

      <DrawerSidebar sidebarId={'secondarySidebar'}>
        <BoardSideBar trump={G.trump}
          players={G.players}
          phase={ctx.phase}
          currentLevel={G.currentLevel}
          onBid={announceBid}
          isLastPlayer={G.nbBids + 1 === ctx.numPlayers}
          isCurrentPlayer={isCurrentPlayer}
          lastPlayedCards={G.lastPlayedCards}
          playerCanExchange={G.playerCanExchange}
          canExchange={G.canExchange}
          onExchangeCard={exchangeTrump}
          playerID={playerID}

          />
      </DrawerSidebar>

      <Content className={styles.body}>
        <Box p={2} bgcolor='#038C65' height='55vh'>
          <div className='hand hhand active-hand'>
            {transitions.map(({ item, props, key }) =>
              <animated.img
                key={key}
                style={props}
                alt=''
                className='card'
                src={`./cards/${item.point}${item.suit}.svg`}
        />
)}
          </div>
        </Box>
        <Hand cards={G.players[playerID].hand} cardSize={150} layout={'stack'} onPlayCard={playCard} />
      </Content>

    </Root>
  )
}

export default RikikiBoard
