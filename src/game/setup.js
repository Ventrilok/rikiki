import { deckSize, points, suits } from '../utils/constants';

const createPlayer = (idx) => ({
  id: idx,
  name: `Player ${idx}`,
  ready: false,
  absoluteZero: false,
  hold: false,
  bid: null,
  tricks: 0,
  score: 0,
  tally: 0,
  hand: [],
  playedcard: [],
});

function createPlayers(num) {
  const players = [];
  for (let i = 0; i < num; i++) {
    players[i] = createPlayer(i);
  }
  return players;
}

const createCard = (suit, point, value) => ({
  key: point + suit,
  suit,
  point,
  value,
});

function createDeck() {
  const deck = Array.prototype.concat.apply(
    [],
    suits.map((suit) =>
      points.map((point) => {
        switch (point) {
          case 'J':
            return createCard(suit, point, 11);
          case 'Q':
            return createCard(suit, point, 12);
          case 'K':
            return createCard(suit, point, 13);
          case 'A':
            return createCard(suit, point, 14);
          default:
            return createCard(suit, point, point);
        }
      }),
    ),
  );
  return deck;
}

export function setup(ctx) {
  const Game = {
    nbBids: 0,
    nextBidder: 0,
    nextPlayer: 0,
    canExchange: false,
    playerCanExchange: 0,
    exchangeCardIndex: 0,
    totalRound: Math.floor(deckSize / ctx.numPlayers),
    currentLevel: 1,
    direction: 'up',
    trump: [],
    playedCards: [],
    lastPlayedCards: [],
    players: createPlayers(ctx.numPlayers),
    deck: createDeck(),
  };
  return Game;
}
