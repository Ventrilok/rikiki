export const playcard = (G, ctx, idx) => {
  const playedSuit = G.players[ctx.currentPlayer].hand[idx].suit
  const trump = G.trump

  let coef = 0
  if (G.playedCards.length === 0 && trump.suit !== playedSuit) {
    coef = 1
  } else if (trump.suit === playedSuit) {
    coef = 100
  } else if (playedSuit === G.playedCards[0].suit) {
    coef = 1
  }

  G.players[ctx.currentPlayer].tally = G.players[ctx.currentPlayer].hand[idx].value * coef
  G.playedCards.push(G.players[ctx.currentPlayer].hand[idx])
  G.players[ctx.currentPlayer].playedcard = G.players[ctx.currentPlayer].hand[idx]
  G.players[ctx.currentPlayer].hand.splice(idx, 1)
  G.players[ctx.currentPlayer].ready = true
  ctx.events.endTurn()
}
