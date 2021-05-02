import { moves } from '../moves';
import { isAllPlayerReady } from '../../utils/utils';

export const playcard = {
  next: 'evalutetrick',
  moves: {
    playcard: moves.playcard,
  },
  turn: {
    order: {
      first: (G) => parseInt(G.nextPlayer, 10),
      next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
    },
  },
  onBegin: (G) => G,
  onEnd: (G, ctx) => {
    for (let i = 0; i < ctx.numPlayers; i++) {
      G.players[i].ready = false;
    }
    return G;
  },
  endIf: (G) => isAllPlayerReady(G.players),
};
