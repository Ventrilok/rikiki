import { isAllPlayerReady } from '../../utils/utils';

export const calculatescore = {
  next: 'draw',
  onBegin: (G, ctx) => {
    for (let i = 0; i < ctx.numPlayers; i++) {
      let score = 0;
      if (G.players[i].absoluteZero && G.players[i].tricks === 0) {
        score = 20;
      } else if (G.players[i].absoluteZero && G.players[i].tricks !== 0) {
        score = -20;
      } else {
        // Calculate the score
        if (G.players[i].bid === G.players[i].tricks) {
          score = 10;
          if (G.players[i].bid > 0) {
            score += 2 * G.players[i].tricks;
          }
        } else {
          score += -2 * Math.abs(G.players[i].tricks - G.players[i].bid);
        }
      }
      G.players[i].score += score;
      G.players[i].ready = true;
    }
    return G;
  },
  onEnd: (G, ctx) => {
    for (let i = 0; i < ctx.numPlayers; i++) {
      G.players[i].ready = false;
    }
    return G;
  },
  endIf: (G) => isAllPlayerReady(G.players),
};
