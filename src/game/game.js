import { setup } from './setup'
import { moves } from './moves'
import { phases } from './phases'

const Rikiki = {
  name: 'Rikiki',
  setup,
  moves,
  phases,
  endIf: (G) => {
    if (G.direction === 'down' && G.currentLevel === 0) {
      return 'end game'
    }
  }
}

export default Rikiki
