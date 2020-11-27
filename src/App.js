import React from 'react'
import { Client } from 'boardgame.io/react'
import { Local } from 'boardgame.io/multiplayer'
import Rikiki from './game/game'
import RikikiBoard from './components/board'

const RikikiClient = Client(
  {
    game: Rikiki,
    board: RikikiBoard,
    // multiplayer: Local()
    numPlayers: 1
  }
)

const App = () => (
  <div>
    <RikikiClient playerID='0' />

  </div>
)

export default App
