import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Alert from '@material-ui/lab/Alert'
import Hand from '../hand'
import { filter } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import Layout, { Root, getHeader, getContent, getDrawerSidebar, getSidebarContent } from '@mui-treasury/layout'
import theme from '../../theme/theme.js'

import GamePanel from '../gamepanel'
import PlayerList from '../playerlist'
import BoardHeader from '../boardheader'
import BoardSideBar from '../boardsidebar'

import Chat from '../chat'

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

const useStyles = makeStyles(() => ({
  header: {
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, .10)',
    backgroundColor: '#fff'

  },
  body: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
    overflowY: 'auto',
    backgroundColor: 'rgb(3, 140, 101)'
  }

}))

const RikikiBoard = (props) => {
  const { G, ctx, moves, playerID, matchData, onExitMatch, sendChatMessage, chatMessages } = props
  const styles = useStyles()
  const isCurrentPlayer = (playerID === ctx.currentPlayer)

  function exchangeTrump (doExchange) {
    moves.exchangetrump(doExchange)
  }

  function announceBid (bid) {
    moves.bid(bid)
  }

  function playCard (index) {
    if (G.playedCards.length === 0) { // if there is no card played then, the player can play anything
      moves.playcard(index)
    } else {
      const playerCard = G.players[ctx.currentPlayer].hand[index] // Get the intended card to play
      const results = filter(G.players[ctx.currentPlayer].hand, ['suit', G.playedCards[0].suit]) // Check if player has any card of the suite of the 1st card thrown
      if (results.length > 0 && playerCard.suit == G.playedCards[0].suit) {
        moves.playcard(index)
      } else if (results.length === 0) {
        moves.playcard(index)
      }
    }
  }

  let msgGameOver = ''
  if (ctx.gameover) {
    msgGameOver = <h1>C'est fini !</h1>
  }

  const [centralDeck, setCentralDeck] = useState([])

  useEffect(() => {
    let timer
    if (ctx.phase === 'bid') {
      setCentralDeck([])
    } else {
      if (G.playedCards.length === 0) {
        setCentralDeck(G.lastPlayedCards)
        timer = setTimeout(() => { setCentralDeck([]) }, 1500)
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

  const canExchangeMsg = <Alert severity='warning' variant='filled'>Merci de patienter le temps qu'un joueur se décide à changer ou non son 2 d'atout</Alert>

  let msgFun = ''
  let totalBid = 0
  for (let i = 0; i < ctx.numPlayers; i++) {
    totalBid += G.players[i].bid
  }
  if (totalBid > G.currentLevel) {
    msgFun = 'Va falloir se battre, enfin si vous lisez encore ce message'
  } else {
    msgFun = 'On doit pas se battre '
  }

  return (
    <Root
      theme={theme} scheme={scheme} initialState={{
        sidebar: {
          primarySidebar: { collapsed: false },
          secondarySidebar: { open: true }
        }
      }}
    >
      <CssBaseline />
      <Header className={styles.header}>
        <Toolbar>
          <BoardHeader playerName={(typeof matchData !== 'undefined') ? matchData[playerID].name : G.players[0].name} onExitMatch={onExitMatch} />
        </Toolbar>
      </Header>

      <DrawerSidebar sidebarId='primarySidebar'>
        <SidebarContent>
          <GamePanel direction={G.direction} currentLevel={G.currentLevel} totalRound={G.totalRound} />
          <Box p='4px 16px 12px'>
            {msgGameOver}
            {ctx.phase === 'playcard' ? msgFun : ''}
          </Box>
          <PlayerList players={G.players} playerNames={matchData} currentPlayer={ctx.currentPlayer} />
        </SidebarContent>
      </DrawerSidebar>

      <DrawerSidebar sidebarId='secondarySidebar'>
        <BoardSideBar
          trump={G.trump}
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
        <Chat
          onSend={sendChatMessage}
          messages={chatMessages}
                  />
      </DrawerSidebar>

      <Content className={styles.body}>
        <Box p={2} bgcolor='#038C65' height='55vh'>
          {G.canExchange ? canExchangeMsg : ''}

          <div className='hand hhand active-hand'>
            {transitions.map(({ item, props, key }) =>
              <animated.img
                key={key}
                style={props}
                alt=''
                className='card'
                width={100}
                src={`./cards/${item.point}${item.suit}.svg`}
              />
            )}
          </div>
        </Box>
        <Container>
          <Hand cards={G.players[playerID].hand} cardWidth={120} spacing={0.25} active={isCurrentPlayer} onPlayCard={playCard} />
        </Container>
      </Content>

    </Root>
  )
}

export default RikikiBoard
