export const evalutetrick = (G, ctx) => {
  const winnerIndex = [...G.players.keys()].reduce((a, b) =>
    G.players[a].tally > G.players[b].tally ? a : b,
  );
  G.players[winnerIndex].tricks += 1;
  G.nextPlayer = winnerIndex;

  if (G.playedCards.length === ctx.numPlayers) {
    G.lastPlayedCards = G.playedCards;
    G.playedCards = [];
  }

  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i].tally = 0;
    G.players[i].playedcard = [];
    G.players[i].ready = true;
  }
};
