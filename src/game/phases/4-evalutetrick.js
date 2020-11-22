import { moves } from '../moves'
import { isAllPlayerReady } from '../../utils/utils'

export const evalutetrick = {
  moves: {
    evalutetrick: moves.evalutetrick
  },
  onBegin: (G, ctx) => {
    moves.evalutetrick(G, ctx)
  },
  onEnd: (G, ctx) => {
    for (let i = 0; i < ctx.numPlayers; i++) {
      G.players[i].playedcard = []
      G.players[i].ready = false
    }
    return G
  },
  endIf: (G, ctx) => {
    if (isAllPlayerReady(G.players)) {
      return { next: G.players[0].hand.length === 0 ? 'calculatescore' : 'playcard' }
    }
  }
}
