const buttons = document.querySelectorAll("button");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const winnerSpan = document.getElementById("winner");
const playerChoiceDisplay = document.getElementById("player-choice-display");
const computerChoiceDisplay = document.getElementById(
  "computer-choice-display",
);
const roundWinnerDisplay = document.getElementById("round-winner-display");
const historyBody = document.getElementById("history-body");

let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomChoice = Math.floor(Math.random() * choices.length);
  return choices[randomChoice];
}

function getHumanChoice() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (playerScore >= 5 || computerScore >= 5) return;

      const humanChoice = button.id;
      const computerChoice = getComputerChoice();
      const result = playRound(humanChoice, computerChoice);
      const displayWinner = getDisplayWinner(result);

      score(result);
      updateCurrentRound(humanChoice, computerChoice, displayWinner);
      addHistoryRow(humanChoice, computerChoice, displayWinner);
      checkWinner();
    });
  });
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "tie";
  }

  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    return "player";
  }

  return "computer";
}

function getDisplayWinner(result) {
  if (result === "player") return "You";
  if (result === "computer") return "Computer";
  return "Tie";
}

function score(result) {
  if (result === "player") {
    playerScore++;
  } else if (result === "computer") {
    computerScore++;
  }

  playerScoreSpan.textContent = `Player Score: ${playerScore}`;
  computerScoreSpan.textContent = `Computer Score: ${computerScore}`;
}

function updateCurrentRound(humanChoice, computerChoice, displayWinner) {
  playerChoiceDisplay.textContent = `You chose: ${humanChoice}`;
  computerChoiceDisplay.textContent = `Computer chose: ${computerChoice}`;
  roundWinnerDisplay.textContent = `Winner: ${displayWinner}`;
}

function addHistoryRow(humanChoice, computerChoice, displayWinner) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${roundNumber}</td>
    <td>${humanChoice}</td>
    <td>${computerChoice}</td>
    <td>${displayWinner}</td>
  `;

  historyBody.appendChild(row);
  roundNumber++;
}

function checkWinner() {
  if (playerScore === 5) {
    winnerSpan.textContent = "Congratulations! You win!";
    setTimeout(resetGame, 1500);
  } else if (computerScore === 5) {
    winnerSpan.textContent = "Computer wins! Better luck next time.";
    setTimeout(resetGame, 1500);
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 1;

  playerScoreSpan.textContent = "Player Score: 0";
  computerScoreSpan.textContent = "Computer Score: 0";
  winnerSpan.textContent = "";
  playerChoiceDisplay.textContent = "You chose: -";
  computerChoiceDisplay.textContent = "Computer chose: -";
  roundWinnerDisplay.textContent = "Winner: -";
  historyBody.innerHTML = "";
}

function playGame() {
  getHumanChoice();
}

playGame();
