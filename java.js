function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomChoice = Math.floor(Math.random() * choices.length);
  return choices[randomChoice];
}

function getHumanChoice() {
  let choice = prompt("Please choose rock, paper, or scissors:").toLowerCase();
  while (!["rock", "paper", "scissors"].includes(choice)) {
    choice = prompt(
      "Invalid choice. Please choose rock, paper, or scissors:",
    ).toLowerCase();
  }
  return choice;
}

function playRound(computerFn, humanFn) {
  const computerChoice = getComputerChoice();

  const humanChoice = getHumanChoice();
  console.log(`Computer chose: ${computerChoice}`);
  console.log(`You chose: ${humanChoice}`);
  if (computerChoice === humanChoice) {
    return "It's a tie!";
  } else if (
    (computerChoice === "rock" && humanChoice === "scissors") ||
    (computerChoice === "paper" && humanChoice === "rock") ||
    (computerChoice === "scissors" && humanChoice === "paper")
  ) {
    return `You lose! ${computerChoice} beats ${humanChoice}.`;
  } else {
    return `You win! ${humanChoice} beats ${computerChoice}.`;
  }
}

function playGame() {
  const rounds = 5;
  let playerScore = 0;
  let computerScore = 0;

  for (let i = 0; i < rounds; i++) {
    const result = playRound(getComputerChoice, getHumanChoice);
    console.log(result);
    if (result.toLowerCase().includes("win")) {
      playerScore++;
    } else if (result.toLowerCase().includes("lose")) {
      computerScore++;
    }
  }
  if (playerScore > computerScore) {
    console.log(
      `You win the game! Final score: ${playerScore} - ${computerScore}`,
    );
  } else if (computerScore > playerScore) {
    console.log(
      `You lose the game! Final score: ${playerScore} - ${computerScore}`,
    );
  } else {
    console.log(
      `The game is a tie! Final score: ${playerScore} - ${computerScore}`,
    );
  }
}
playGame();
