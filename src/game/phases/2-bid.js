import { moves } from '../moves';
import { isAllPlayerReady } from '../../utils/utils';

export const bid = {
  next: 'playcard',
  turn: {
    order: {
      first: (G) => parseInt(G.nextBidder, 10),
      next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
    },
  },
  moves: {
    bid: moves.bid,
  },

  onEnd: (G, ctx) => {
    G.nextPlayer = G.nextBidder;
    G.nextBidder = (G.nextBidder + 1) % ctx.numPlayers;
    G.lastPlayedCards = [];
    for (let i = 0; i < ctx.numPlayers; i++) {
      G.players[i].ready = false;
    }
    return G;
  },
  endIf: (G) => isAllPlayerReady(G.players),
};
