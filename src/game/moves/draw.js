import { deckSize } from '../../utils/constants'

export const draw = (G, ctx) => {
  // Calculate where we stand
  if (G.direction === 'up') {
    if (G.currentLevel < G.totalRound) {
      G.currentLevel++
    } else if ((G.currentLevel = G.totalRound)) {
      G.direction = 'down'
      G.currentLevel--
    }
  } else if (G.currentLevel >= 1) {
    G.currentLevel--
  }

  // Calculate if a trump is needed on this round
  const nbCardToDraw = ctx.numPlayers * G.currentLevel
  let toAddForTrump = 1
  if (nbCardToDraw === deckSize) {
    toAddForTrump = 0
  }

  // Draw card to each players
  const drawingDeck = ctx.random.Shuffle(G.deck).slice(0, nbCardToDraw + toAddForTrump)
  while (drawingDeck.length - toAddForTrump) {
    for (let i = 0; i < ctx.numPlayers; i++) {
      G.players[i].hand.push(drawingDeck.pop())
    }
  }

  // Select the trump card if needed
  let trump = []
  if (toAddForTrump === 1) {
    trump = drawingDeck.pop()
  }
  G.trump = trump

 // reset nbBids as nobody bidded
  G.nbBids = 0

  // Initiate player's settings
  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i].bid = null
    G.players[i].tally = 0
    G.players[i].tricks = 0
    G.players[i].playedcard = []
    G.players[i].ready = true
    G.players[i].hand.sort((a, b) => {
      const suitOrder = ['c', 'd', 's', 'h']
      const asuitIndex = suitOrder.indexOf(a.suit)
      const bsuitIndex = suitOrder.indexOf(b.suit)
      if (asuitIndex === bsuitIndex) return a.value - b.value
      return asuitIndex - bsuitIndex
    })
  }
}
