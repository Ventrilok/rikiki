import { moves } from '../moves';
import { isAllPlayerReady } from '../../utils/utils';

export const draw = {
  start: true,
  next: 'bid',
  moves: {
    draw: moves.draw,
  },
  onBegin: (G, ctx) => {
    moves.draw(G, ctx);
    return G;
  },
  onEnd: (G, ctx) => {
    G.lastPlayedCards = [];
    for (let i = 0; i < ctx.numPlayers; i++) {
      G.players[i].ready = false;
      G.players[i].hold = false;
    }
    return G;
  },
  endIf: (G) => isAllPlayerReady(G.players),
};
