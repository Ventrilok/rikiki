import { setup } from './setup';
import { moves } from './moves';
import { exchangetrump } from './moves/exchangetrump';
import { phases } from './phases';

const Rikiki = {
  name: 'Rikiki',
  setup,
  moves,
  phases,
  turn: {
    stages: {
      exchangeTrump: {
        moves: { exchangetrump },
      },
    },
  },

  endIf: (G) => {
    if (G.direction === 'down' && parseInt(G.currentLevel, 10) === 1) {
      return 'end game';
    }
  },
};

export default Rikiki;
