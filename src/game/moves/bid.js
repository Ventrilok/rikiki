export const bid = (G, ctx, bidValue, absoluteZero) => {
  G.nbBids += 1;
  G.players[ctx.currentPlayer].bid = parseInt(bidValue, 10);
  G.players[ctx.currentPlayer].absoluteZero = absoluteZero;
  G.players[ctx.currentPlayer].ready = true;
  ctx.events.endTurn();
};
