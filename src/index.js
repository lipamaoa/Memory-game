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

const numPlayers=4;

const memoryGame = new MemoryGame(cards, numPlayers);
let selectedCards = [];
let currentPlayerIndex = 1;

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
  
  let div ='';
  memoryGame.players.forEach((player)=>{
    div +=`<div class="player${player.id}-score">
    <h2>Player ${player.id}</h2>
    <p>Pairs clicked: <span id="player${player.id}-pairs-clicked">0</span></p>
    <p>Pairs guessed: <span id="player${player.id}-pairs-guessed">0</span></p>
    </div>`
  })
  
  document.querySelector('.score-container').innerHTML= div;
  document.querySelector(`.player${currentPlayerIndex}-score`).classList.toggle("active-player");

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

        
        pairsGuessed = document.querySelector(`#player${currentPlayerIndex}-pairs-guessed`);
        pairsClicked = document.querySelector(`#player${currentPlayerIndex}-pairs-clicked`);
        
        let currentPlayer = memoryGame.getCurrentPlayer();
        pairsGuessed.textContent = currentPlayer.pairsGuessed;
        pairsClicked.textContent = currentPlayer.pairsClicked;

        if(!isMatch){
          document.querySelector(`.player${currentPlayerIndex}-score`).classList.toggle("active-player");
          memoryGame.switchPlayer();
          currentPlayerIndex = memoryGame.getCurrentPlayer().id;
          console.log(document.querySelector(`.player${currentPlayerIndex}-score`).classList.toggle("active-player"));
        }

        setTimeout(() => {
          if (isMatch) {
            if (memoryGame.checkIfFinished()) {
              alert(`Player ${currentPlayerIndex} Wins!!! Took you ${memoryGame.players[currentPlayerIndex].pairsClicked} clicks to find ${memoryGame.players[currentPlayerIndex].pairsGuessed} guesses.`);
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
