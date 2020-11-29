import React from 'react'
import PlayerListItem from '../playerlistitem'

const PlayerList = (props) => {
  const { players, currentPlayer, playerNames } = props
  return players.map((item, index) => (
    <PlayerListItem
      key={item.name} playerName={(typeof playerNames === 'undefined') ? item.name : playerNames[index].name} active={currentPlayer === index.toString()} {...item}
    />
  ))
}
export default PlayerList
