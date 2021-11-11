function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setupGame(rpsArray){
  const container = document.querySelector('#container');
  const list = document.createElement('ul');
  for (i = 0; i < rpsArray.length; i++){
    const listItem = document.createElement('li');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = rpsArray[i];
    const image = document.createElement('img');
    image.src = 'img/' + rpsArray[i] + '.png';
    image.alt = rpsArray[i];
    modal.appendChild(image);
    listItem.appendChild(modal);
    list.appendChild(listItem);
  }
  container.appendChild(list);
  
  if (rpsArray[1] !== 'vs'){
    const buttons = document.querySelectorAll('.modal');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        results = playRound(button.id, computerPlay());
        updateScoreboard(results);
      });
    });
  }
}


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


// Had to move this outside of playRound() because async was causing the return value in playRound() to be delayed
async function screenUpdate(playerSelection, computerSelection, resultsText){
  let messageHTML = '<div class="animate results">';
  let resultsTextArray = [];
  resultsTextArray = Array.from(resultsText);
  for (i = 0; i < resultsTextArray.length; i++){
    if (resultsTextArray[i] !== ' ') {
      messageHTML += "<span>" + resultsTextArray[i] + "</span>";
    } else {
      messageHTML += "&nbsp;";
    }
  }
  messageHTML += "</div>";

  const container = document.querySelector('#container');
  container.innerHTML = '';
  setupGame([playerSelection, 'vs', computerSelection]);
  await sleep(1500);
  container.innerHTML = '';
  const message = document.createElement('h1');
  message.innerHTML = messageHTML
  container.appendChild(message);
  await sleep(2500);
  container.innerHTML = '';
  setupGame(rps);
  isGameOver();
}


function playRound(playerSelection, computerSelection){
  let resultsText = '';

  if (playerSelection === computerSelection){
    resultsText = "It's a Tie!";
  } else if (playerSelection === 'rock' && computerSelection === 'paper') {
    resultsText = "Computer Wins! Paper beat Rock.";
  } else if (playerSelection === 'rock' && computerSelection === 'scissors') {
    resultsText = "You Win! Rock beat Scissors.";
  } else if (playerSelection === 'paper' && computerSelection === 'scissors') {
    resultsText = "Computer Wins! Scissors beat Paper.";
  } else if (playerSelection === 'paper' && computerSelection === 'rock') {
    resultsText = "You Win! Paper beat Rock.";
  } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
    resultsText = "You Win! Scissors beat Paper.";
  } else if (playerSelection === 'scissors' && computerSelection === 'rock') {
    resultsText = "Computer Wins! Rock beat Scissors.";
  }
  screenUpdate(playerSelection, computerSelection, resultsText);
  return resultsText;
}


function updateScoreboard(results){
  if (results.includes("You Win!")){
    playerScore++;      
  } else if (results.includes("Computer Wins!")) {
    computerScore++;
  }
  const player = document.querySelector('#playerScore');
  player.textContent = "Player: " + playerScore;
  const computer = document.querySelector('#computerScore');
  computer.textContent ="Computer: " + computerScore;
}


function isGameOver(){
  const container = document.querySelector('#container');
  if (playerScore === 5) {
    endGame("player");
  } else if (computerScore === 5) {
    endGame("computer");
  }
}


function endGame(winner){
  const container = document.querySelector('#container');
  container.innerHTML = '';
  const h1 = document.createElement('h1');
  if (winner === 'player'){
    h1.innerHTML = '<div class="animate gameOver"><span>G</span><span>A</span><span>M</span><span>E</span>&nbsp;<span>O</span><span>V</span><span>E</span><span>R</span><br><span>Y</span><span>o</span><span>u</span>&nbsp;<span>W</span><span>I</span><span>N</span><span>!</span></div>';
  } else {
    h1.innerHTML = '<div class="animate gameOver"><span>G</span><span>A</span><span>M</span><span>E</span>&nbsp;<span>O</span><span>V</span><span>E</span><span>R</span><br><span>Y</span><span>o</span><span>u</span>&nbsp;<span>L</span><span>O</span><span>S</span><span>E</span><span>!</span></div>';
  }
  container.appendChild(h1);
  const playAgainDiv = document.createElement('div');
  playAgainDiv.className = "playAgain";
  const playAgainButton = document.createElement('button');
  playAgainButton.innerText = 'Play Again?';
  playAgainButton.addEventListener('click', () => {
    location.reload();
  });
  container.appendChild(playAgainDiv);
  playAgainDiv.appendChild(playAgainButton);
}


let playerScore = 0;
let computerScore = 0;
let rps = ['rock', 'paper', 'scissors'];
setupGame(rps);


