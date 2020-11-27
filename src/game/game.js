import { setup } from './setup'
import { moves } from './moves'
import { exchangetrump } from './moves/exchangetrump'
import { phases } from './phases'

const Rikiki = {
  name: 'Rikiki',
  setup,
  moves,
  phases,
  turn: {
    stages: {
      exchangeTrump: {
        moves: { exchangetrump }
      }
    }
  },

  endIf: (G) => {
    if (G.direction === 'down' && G.currentLevel === 0) {
      return 'end game'
    }
  }
}

export default Rikiki
