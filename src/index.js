const cards = [
  { name: "2", img: "2.jpg" },
  { name: "3", img: "3.jpg" },
  { name: "4", img: "4.jpg" },
  { name: "5", img: "5.jpg" },
  { name: "6", img: "6.jpg" },
  { name: "7", img: "7.jpg" },
  { name: "8", img: "8.jpg" },
  { name: "9", img: "9.jpg" },
  { name: "10", img: "10.jpg" },
  { name: "11", img: "11.jpg" },
  { name: "12", img: "12.jpg" },
  { name: "13", img: "13.jpg" },
  { name: "14", img: "14.jpg" },
  { name: "15", img: "15.jpg" },
  { name: "16", img: "16.jpg" },
  { name: "2", img: "2.jpg" },
  { name: "3", img: "3.jpg" },
  { name: "4", img: "4.jpg" },
  { name: "5", img: "5.jpg" },
  { name: "6", img: "6.jpg" },
  { name: "7", img: "7.jpg" },
  { name: "8", img: "8.jpg" },
  { name: "9", img: "9.jpg" },
  { name: "10", img: "10.jpg" },
  { name: "11", img: "11.jpg" },
  { name: "12", img: "12.jpg" },
  { name: "13", img: "13.jpg" },
  { name: "14", img: "14.jpg" },
  { name: "15", img: "15.jpg" },
  { name: "16", img: "16.jpg" },
];

const startButton = document.getElementById("start-button");
const playerSelect = document.getElementById("player-select");
const playersNumber = document.getElementById("players-num");
const restartButton = document.getElementById("restart-button");
const gameIntro= document.getElementById("game-intro");

startButton.addEventListener("click", (event) => {
  playersNumber.style.display = "none";
  gameIntro.style.display="none";
  startButton.style.display="none";

  const boardGame = document.getElementById("memory-board");
  boardGame.style.display = "block";

  const numPlayers = playerSelect.value;

  const memoryGame = new MemoryGame(cards, numPlayers);
  let selectedCards = [];
  let currentPlayerIndex = memoryGame.getCurrentPlayer().id;

  memoryGame.shuffleCards();
  let html = "";
  memoryGame.cards.forEach((pic) => {
    html += `
    <div class="card" data-card-name="${pic.name}">
    <div class="back" name="${pic.img}"></div>
    <div class="front" style="background-image: url(img/${pic.img});background-repeat: no-repeat;background-size: cover;"></div>
    </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector("#memory-board").innerHTML = html;

  let div = "";
  memoryGame.players.forEach((player) => {
    div += `<div class="player${player.id}-score">
    <h2>Player ${player.id}</h2>
    <p>Pairs clicked: <span id="player${player.id}-pairs-clicked">0</span></p>
    <p>Pairs guessed: <span id="player${player.id}-pairs-guessed">0</span></p>
    </div>`;
  });

  const scoreContainer = document.querySelector(".score-container");
  scoreContainer.innerHTML = div;
  document
    .querySelector(`.player${currentPlayerIndex}-score`)
    .classList.toggle("active-player");

  // Bind the click event of each element to a function
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      console.log(`Card clicked: ${card}`);

      // Prevent selecting more than 2 cards
      if (selectedCards.length == 2) {
        return;
      }

      card.classList.toggle("turned");

      selectedCards.push(card);

      if (selectedCards.length == 2) {
        const firstCardName = selectedCards[0].getAttribute("data-card-name");
        const secondCardName = selectedCards[1].getAttribute("data-card-name");

        const isMatch = memoryGame.checkIfPair(firstCardName, secondCardName);

        pairsGuessed = document.querySelector(
          `#player${currentPlayerIndex}-pairs-guessed`
        );
        pairsClicked = document.querySelector(
          `#player${currentPlayerIndex}-pairs-clicked`
        );

        let currentPlayer = memoryGame.getCurrentPlayer();
        pairsGuessed.textContent = currentPlayer.pairsGuessed;
        pairsClicked.textContent = currentPlayer.pairsClicked;

        if (!isMatch) {
          document
            .querySelector(`.player${currentPlayerIndex}-score`)
            .classList.toggle("active-player");
          memoryGame.switchPlayer();
          currentPlayerIndex = memoryGame.getCurrentPlayer().id;
          console.log(
            document
              .querySelector(`.player${currentPlayerIndex}-score`)
              .classList.toggle("active-player")
          );
        }

        setTimeout(() => {
          if (isMatch) {
            selectedCards[0].classList.add(`match${currentPlayerIndex}`);
            selectedCards[1].classList.add(`match${currentPlayerIndex}`);

            if (memoryGame.checkIfFinished()) {
              const newP = document.createElement("p");
              const newContent = document.createTextNode(
                `Player ${currentPlayerIndex} Wins!!! Took you ${memoryGame.players[currentPlayerIndex].pairsClicked} clicks to find ${memoryGame.players[currentPlayerIndex].pairsGuessed} guesses.`
              );

              const message = newP.appendChild(newContent);

              const endScreen = document.querySelector(".end-screen");
              console.log("endScreen");
              endScreen.style.display = "block";
              endScreen.appendChild(message);

              restartButton.addEventListener("click", () => {
                endScreen.style.display = "none";
                boardGame.style.display = "none";
                scoreContainer.style.display = "none";
                playersNumber.style.display = "block";
              });
            }
          } else {
            selectedCards[0].classList.toggle("turned");
            selectedCards[1].classList.toggle("turned");
          }
          selectedCards = [];
        }, 500);
      }
    });
  });
});
