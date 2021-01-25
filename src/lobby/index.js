import React from 'react'
import { Lobby } from 'boardgame.io/react'
import Rikiki from '../game/game'
import RikikiBoard from '../components/board'
import OnlineLobby from './onlinelobby'

Rikiki.minPlayers = 2
Rikiki.maxPlayers = 10

function MyLobby (props) {
  return (
    <Lobby
      gameServer=' http://489462128e8d.ngrok.io'
      lobbyServer=' http://489462128e8d.ngrok.io'
      // gameServer='http://84.226.191.92:2468'
      // lobbyServer='http://84.226.191.92:2468'
      debug={false}
      refreshInterval='15000'
      gameComponents={[
        {
          game: Rikiki,
          board: RikikiBoard
        }
      ]}
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
