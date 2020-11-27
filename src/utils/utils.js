export const isAllPlayerReady = (players) => {
  for (let i = 0; i < players.length; i++) {
    if (!players[i].ready) {
      return false
    }
  }
  return true
}

export const sortHand = (hand) => {
  return hand.sort((a, b) => {
    const suitOrder = ['c', 'd', 's', 'h']
    const asuitIndex = suitOrder.indexOf(a.suit)
    const bsuitIndex = suitOrder.indexOf(b.suit)
    if (asuitIndex === bsuitIndex) return a.value - b.value
    return asuitIndex - bsuitIndex
  })
}
