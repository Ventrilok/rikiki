# Rikiki

Rikiki is a simple trick-taking game build on React and Boardgame.io frameworks.
The game is based is based on a particular distribution of the cards.
In the first round, only two cards are dealt to each player, then three in the second round, four in the third round, etc.

The maximum number of cards in the hand depends on the number of players based on the following rule:

- 13 cards maximum with 4 players,
- 10 with 5 players,
- 8 with 6 players,
- 7 with 7 players,
- 6 with 8 players.

Once this maximum hand of cards has been dealt, it will be reduced by one card at each turn to finish with only two cards.
The game is then over.

Turn over the first card of the deck. The color of this card represents the trump card.

# Game Rules

## Goal

To score the maximum number of points by making trick contracts.

## Card Values

The value of the cards is standard, Ace is superior to King. Trump is higher than the other suits.

## Bidding Phase
Each player in turn must announce how many tricks s/he intends to make.
Be careful, the sum of the tricks announced by the players can never be equal to the number of tricks that can be made!

### Exemple

In the first round, for example, the sum of the tricks cannot be equal to 1. If a player announces 1 trick, and all the others pass, the last player will be obliged to announce 1 trick too.

This quirk of the rules means that the announcements will always be either higher or lower than the number actually achievable and this will inevitably result in the failure of one or more players...

### Absolute Zero
When players have 7 or more cards, they can try the absolute zero, which allows players to win or lose 20 points if they succeed in doing 0 trick.

This is particularly useful when player are behind... or really want to win :)

## Playing Phase

Once the bidding is over, the player to the right of the dealer plays a card.
Then each player does the same. The card with the highest value wins the trick.
You must supply the suit if you can.
If you can't make a trick, you can cut (play a trump) or discard (play another suit). If you discard, the value of your card is not taken into account.

##Scoring
A successful contract (the player makes the exact number of tricks announced) gives +10 points for the contract and +2 for each trick made.
A lost contract gives -10 points for each trick more or less than the announced contract.

---

## About this project

The aim of this project was to learn react and create a simple multiplayer card game in a period of lockdown.

- [boardgame.io](https://boardgame.io/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
