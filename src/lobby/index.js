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
      // gameServer='http://2d3fb389ed5f.ngrok.io'
      // lobbyServer='http://2d3fb389ed5f.ngrok.io'
      gameServer='http://192.168.1.23:2468'
      lobbyServer='http://192.168.1.23:2468'
      debug={false}
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
