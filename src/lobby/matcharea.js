import React, { useState } from 'react'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles} from '@material-ui/core/styles'
import theme from '../theme/theme.js'
import MatchCreator from './matchcreator'
import ExitLobby from './exitlobby'
import PlayerPlate from './playerplate'
import MatchList from './matchlist'

import LobbyHeader from './lobbyheader'

import Layout, { Root, getHeader, getDrawerSidebar, getSidebarContent, getContent, getStandardScheme} from '@mui-treasury/layout'

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
})

const Header = getHeader(styled)
const DrawerSidebar = getDrawerSidebar(styled)
const SidebarContent = getSidebarContent(styled)
const Content = getContent(styled)

const useStyles = makeStyles(() => ({
  header: {
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, .10)',
    backgroundColor: '#ffffff'
  }
}))

const MatchArea = ({errorMsg, playerName, matches, onCreateMatch, onJoinMatch, onLeaveMatch, onStartMatch, onExitLobby, onRefreshMatches}) => {
  const styles = useStyles()
  return (
    <Root theme={theme} scheme={scheme} initialState={{
      sidebar: {
        primarySidebar: { collapsed: false },
        secondarySidebar: { open: true }
      }
    }}>
      <CssBaseline />
      <Header className={styles.header}>
        <Toolbar >
          <LobbyHeader />
        </Toolbar>
      </Header>
      <DrawerSidebar sidebarId='primarySidebar'>
        <SidebarContent>
          <PlayerPlate playerName={playerName} />
          <MatchCreator onCreateMatch={onCreateMatch} />
          <ExitLobby onExitLobby={onExitLobby} />
          <Typography variant={'body1'} color={'error'}>
            {errorMsg}
          </Typography>
        </SidebarContent>
      </DrawerSidebar>

      <Content>
        <MatchList matches={matches} playerName={playerName} onJoinMatch={onJoinMatch} onLeaveMatch={onLeaveMatch} onStartMatch={onStartMatch} onRefreshMatches={onRefreshMatches} />
      </Content>

    </Root>

  )
}
export default MatchArea
