export const bid = (G, ctx, bid) => {
  G.nbBids += 1
  G.players[ctx.currentPlayer].bid = parseInt(bid)
  G.players[ctx.currentPlayer].ready = true
  ctx.events.endTurn()
}
