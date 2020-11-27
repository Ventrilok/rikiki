import { sortHand } from '../../utils/utils'

export const exchangetrump = (G, ctx, doExchange) => {
  if (doExchange) {
    const exchangedCard = G.players[G.playerCanExchange].hand[G.exchangeCardIndex]
    G.players[G.playerCanExchange].hand.splice(G.exchangeCardIndex, 1, G.trump)
    G.trump = exchangedCard

    // Sort the hand after exchanging the card
    sortHand(G.players[G.playerCanExchange].hand)
  }
  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i].ready = true
  }

  // Reset exchange trump card mechanisim
  G.canExchange = false
  G.exchangeCardIndex = -1
}
