import React from 'react'
import { Lobby } from 'boardgame.io/react'
import Rikiki from '../game/game'
import RikikiBoard from '../components/board'
import OnlineLobby from './onlinelobby'

Rikiki.minPlayers = 2
Rikiki.maxPlayers = 10

const { protocol, hostname, port } = window.location
const server = `${protocol}//${hostname}:${port}`
const importedGames = [{ game: Rikiki, board: RikikiBoard }]

function MyLobby (props) {
  return (
    <Lobby
      gameServer={server}
      lobbyServer={server}
      debug={false}
      refreshInterval='15000'
      gameComponents={importedGames}
      renderer={({
        errorMsg,
        gameComponents,
        matches,
        phase,
        playerName,
        runningMatch,
        handleEnterLobby,
        handleCreateMatch,
        handleJoinMatch,
        handleLeaveMatch,
        handleExitLobby,
        handleRefreshMatches,
        handleStartMatch,
        handleExitMatch
      }) => (
        <OnlineLobby
          errorMsg={errorMsg}
          gameComponents={gameComponents}
          matches={matches}
          phase={phase}
          playerName={playerName}
          runningMatch={runningMatch}
          onEnterLobby={handleEnterLobby}
          onCreateMatch={handleCreateMatch}
          onJoinMatch={handleJoinMatch}
          onLeaveMatch={handleLeaveMatch}
          onExitLobby={handleExitLobby}
          onRefreshMatches={handleRefreshMatches}
          onStartMatch={handleStartMatch}
          onExitMatch={handleExitMatch}
        />
      )}
    />
  )
}

export default MyLobby
