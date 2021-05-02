import React from 'react';
import { Client } from 'boardgame.io/react';
import Rikiki from './game/game';
import RikikiBoard from './components/board';

const RikikiClient = Client({
  game: Rikiki,
  board: RikikiBoard,
  numPlayers: 1,
  debug: false,
});

const App = () => <RikikiClient playerID="0" />;

export default App;
