import React from 'react'
import EnterLobby from './enterlobby'
import MatchArea from './matcharea'

const OnlineLobby = ({errorMsg,phase, playerName, gameComponents, matches,runningMatch, onEnterLobby, onCreateMatch, onJoinMatch, onLeaveMatch, onStartMatch, onExitLobby,onRefreshMatches, onExitMatch}) => {
  const selectedGameName = gameComponents[0].game.name

  const handleLoginClick = (name) => {
    onEnterLobby(name)
  }

  const handleCreateMatch = (nbPlayers) => {
    onCreateMatch(selectedGameName, nbPlayers)
  }

  const handleJoinMatch = (matchID, playerID) => {
    onJoinMatch(selectedGameName, matchID, playerID.toString())
  }

  const handleLeaveMatch = (matchID) => {
    onLeaveMatch(selectedGameName, matchID)
  }

  const handleExitLobby = () => {
    onExitLobby()
  }

  const handleRefreshMatches =() => {
    onRefreshMatches()
  }

const handleExitMatch = () => 
{
  onExitMatch()
}
  const handleStartMatch = (matchID, playerID, numPlayers) => {
    onStartMatch(selectedGameName, {
      matchID: matchID,
      playerID: playerID,
      numPlayers
    })
  }

  if (phase === 'enter') {
    return (
      <EnterLobby
        playerName={playerName}
        onEnter={handleLoginClick}
    />
    )
  }

  if (phase === 'list') {
    return (
      <MatchArea
        errorMsg={errorMsg}
        playerName={playerName}
        matches={matches}
        onCreateMatch={handleCreateMatch}
        onJoinMatch={handleJoinMatch}
        onLeaveMatch={handleLeaveMatch}
        onStartMatch={handleStartMatch}
        onExitLobby={handleExitLobby}
        onRefreshMatches={handleRefreshMatches}
      />
    )
  }

  if (phase === 'play') {
    return (
      <>
        {runningMatch && (
          <runningMatch.app
            matchID={runningMatch.matchID}
            playerID={runningMatch.playerID}
            credentials={runningMatch.credentials}
            onExitMatch={onExitMatch}
          />
        )}
      </>
    );
  }

  return 'Phase is unknown...';
  
}

export default OnlineLobby
