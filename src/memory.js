class MemoryGame {
  constructor(cards, numPlayers, numberOfCards) {
    if (!numberOfCards){
      numberOfCards = cards.length;
    }
    this.cards = cards.slice(0, numberOfCards).flatMap((element) => [element, element]);
    this.players = Array.from({ length: numPlayers }, (_, i) => ({
      id: i + 1,
      pairsClicked: 0,
      pairsGuessed: 0,
    }));
    this.currentPlayerIndex = Math.floor(Math.random() * this.players.length);

  }

  shuffleCards() {
    if (!this.cards) {
      return undefined;
    }

    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }

    return this.cards;
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  switchPlayer() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

  checkIfPair(card1, card2) {
    const currentPlayer = this.getCurrentPlayer();

    currentPlayer.pairsClicked++;
    if (card1 === card2) {
      currentPlayer.pairsGuessed += 1;
      return true;
    } else {
      return false;
    }
  }

  checkIfFinished() {
    const totalGuesses =
      this.players.reduce((acc, p) => acc + p.pairsGuessed, 0) * 2;
    return totalGuesses === this.cards.length;
  }
}
