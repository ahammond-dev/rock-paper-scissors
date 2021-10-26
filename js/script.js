function computerPlay(){
  let computerChoice = "";
  switch (Math.floor(Math.random() * 3)){
    case 0:
      computerChoice = "rock";
      break;
    case 1:
      computerChoice = "paper";
      break;
    case 2:
      computerChoice = "scissors";
      break;
  }
  return computerChoice;
}


function playRound(playerSelection, computerSelection){
  if (playerSelection === computerSelection){
    return "It's a Tie!";
  } else if (playerSelection === 'rock' && computerSelection === 'paper') {
    return "Computer Wins! Paper beat Rock.";
  } else if (playerSelection === 'rock' && computerSelection === 'scissors') {
    return "You Win! Rock beat Scissors.";
  } else if (playerSelection === 'paper' && computerSelection === 'scissors') {
    return "Computer Wins! Scissors beat Paper.";
  } else if (playerSelection === 'paper' && computerSelection === 'rock') {
    return "You Win! Paper beat Rock.";
  } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
    return "You Win! Scissors beat Paper.";
  } else if (playerSelection === 'scissors' && computerSelection === 'rock') {
    return "Computer Wins! Rock beat Scissors.";
  }
}


function game(){
  let results = '';
  let playerScore = 0;
  let computerScore = 0;
   
  for (i=1; i<=5; i++){
    const playerSelection = window.prompt("Rock, Paper, or Scissors?", "scissors").toLowerCase();
    const computerSelection = computerPlay();
    results = playRound(playerSelection, computerSelection);
    console.log("Player: " + playerSelection);
    console.log("Computer: " + computerSelection);
    if (results.includes("You Win!")){
      playerScore++;      
    } else if (results.includes("Computer Wins!")) {
      computerScore++;
    }
  }
  return "Score: Player = " + playerScore + " Computer = " + computerScore;
}



console.log(game());