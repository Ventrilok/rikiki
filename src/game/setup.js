import { deckSize, points, suits } from '../utils/constants'

const createPlayer = (idx) => ({
  id: idx,
  name: 'Player ' + idx,
  ready: false,
  bid: null,
  tricks: 0,
  score: 0,
  tally: 0,
  hand: [],
  playedcard: []

})

function createPlayers (num) {
  const players = []
  for (let i = 0; i < num; i++) {
    players[i] = createPlayer(i)
  }
  return players
}

const createCard = (suit, point, value) => ({
  key: (point + suit).toUpperCase(),
  suit,
  point,
  value
})

function createDeck () {
  const deck = Array.prototype.concat.apply(
    [],
    suits.map((suit) =>
      points.map((points) => {
        switch (points) {
          case 'J':
            return createCard(suit, points, 11)
            break
          case 'Q':
            return createCard(suit, points, 12)
            break
          case 'K':
            return createCard(suit, points, 13)
            break
          case 'A':
            return createCard(suit, points, 14)
            break
          default:
            return createCard(suit, points, points)
            break
        }
      })
    )
  )

  return deck
}

export function setup (ctx) {
  const Game = {
    nbBids: 0,
    nextBidder: 0,
    nextPlayer: 0,
    canExchange: false,
    playerCanExchange: 0,
    exchangeCardIndex: 0,
    totalRound: Math.floor(deckSize / ctx.numPlayers),
    currentLevel: 24,
    direction: 'up',
    trump: [],
    playedCards: [],
    lastPlayedCards: [],
    players: createPlayers(ctx.numPlayers),
    deck: createDeck()
  }

  return Game
}
