const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);
let selectedCards = [];
let pairsClicked = null;
let pairsGuessed = null;

window.addEventListener('load', (event) => {
  memoryGame.shuffleCards();
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  pairsGuessed = document.querySelector('#pairs-guessed');
  pairsClicked = document.querySelector('#pairs-clicked');

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      console.log(`Card clicked: ${card}`);

      // Prevent selecting more than 2 cards
      if (selectedCards.length == 2) {
        return;
      }

      card.classList.toggle("turned");
      selectedCards.push(card);

      if (selectedCards.length == 2) {
        const firstCardName = selectedCards[0].getAttribute('data-card-name');
        const secondCardName = selectedCards[1].getAttribute('data-card-name');

        const isMatch = memoryGame.checkIfPair(firstCardName, secondCardName);

        pairsGuessed.textContent = memoryGame.pairsGuessed;
        pairsClicked.textContent = memoryGame.pairsClicked;

        setTimeout(() => {
          if (isMatch) {
            if (memoryGame.checkIfFinished()) {
              alert(`You Win!!! Took you ${memoryGame.pairsClicked} clicks to find ${memoryGame.pairsGuessed} guesses.`);
            }
          }
          else {
            selectedCards[0].classList.toggle("turned");
            selectedCards[1].classList.toggle("turned");
          }
          selectedCards = [];
        }, 500);
      }
    });
  });
});
