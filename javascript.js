
//Create a function computerPlay where it randomly returns a string with either 'Rock', 'Paper', or Scissors
function computerPlay(){
    const computerSelection = Math.floor(Math.random() * 3);

    switch(computerSelection) {
        case 0:
            return 'Rock';
        case 1:
            return 'Paper';
        case 2:
            return 'Scissors';
    }

}

//Create a function rps that takes two parameters, playerSelection and computerSelection.
function playRound(userSelection, computerSelection) {

    //Assign a value to userSelection and computerSelection
    const userNum = setValueToSelection(userSelection);
    const computerNum = setValueToSelection(computerSelection);

    //Sum userNum and computerNum to determine combination of rock, paper, and scissors
    const sum = userNum + computerNum;

    //Rock = 0, Paper = 1, Scissors = 2
    //Adding the sum checks for computerSelection
    switch (sum) {
        case 0:
            return 'You tie!';
        case 1: // Checks for paper
            return (userNum == 1) ? 'You win! Paper beats rock.' : 'You lose! Paper beats rock.';
        case 2: // Checks for a tie, and scissors
            return (userNum == 0) ? 'You win! Rock beats scissors.': 
                    (userNum == 1) ? 'You tie!' : 'You lose! Rock beats scissors.';
        case 3:
            return (userNum == 2) ? 'You win! Scissors beats paper.' : 'You lose! Scissors beats paper.';
        case 4:
            return 'You tie!';
    }
}

//Changes the string to have only first character uppercase.
function changeFirstCharUpperCase (string) {
    string = string.toLowerCase();
    string = string.substr(0,1).toUpperCase() + string.substr(1);
    return string;
}

function setValueToSelection(string) {
    switch (string) {
        case 'Rock':
            return 0;
        case 'Paper':
            return 1;
        case 'Scissors':
            return 2;
    }
}

function appropriateAnswer(userSelection) {
    return (userSelection == 'Rock' || userSelection == 'Paper' || userSelection == 'Scissors') ? true : false;
}

setup();

let score = 0;
let computerScore = 0;

const scoreUpdater = document.querySelector('h2');
scoreUpdater.textContent = `Player: ${score} Computer: ${computerScore}`;

function appendResults(string) {
    const results = document.querySelector('ul');
    const log = document.createElement('li');
    log.textContent = string;
    log.setAttribute('id', 'result');
    results.appendChild(log);
}

function game(choice) {
    let result = '';
    let computerChoice = computerPlay();

    if(appropriateAnswer(choice)) {
        result = playRound(choice, computerChoice);
        switch (result.substr(4,1)) {
            case 'w':
                score++;
                scoreUpdater.textContent = `Player: ${score} Computer: ${computerScore}`;
                appendResults(`You win! ${choice} beats ${computerChoice}`);
                updateScroll();
                checkEnd('win');
                break;
            case 'l':
                computerScore++;
                scoreUpdater.textContent = `Player: ${score} Computer: ${computerScore}`;
                appendResults(`You lose! ${computerChoice} beats ${choice}`);
                updateScroll();
                checkEnd('lose');
                break;
            case 't':
                appendResults('It is a tie');
                updateScroll();
                break;
        }
    } else {
            //Provides error message and reverts attempt for input
            console.log('Please enter a valid answer. (rock, paper, or scissors)');
    }
}

//game() is put inside another function to randomize every game, rather than
//set one instance to the button.
function playGame(choice) {
    game(choice)
}

function setup() {
    const rockButton = document.createElement('button');
    const paperButton = document.createElement('button');
    const scissorsButton = document.createElement('button');
    const buttonContainer = document.querySelector('#button-container');

    rockButton.setAttribute('id', 'rock');
    paperButton.setAttribute('id', 'paper');
    scissorsButton.setAttribute('id', 'scissors');

    rockButton.textContent = 'Rock';
    paperButton.textContent = 'Paper';
    scissorsButton.textContent = 'Scissors';

    buttonContainer.appendChild(rockButton);
    buttonContainer.appendChild(paperButton);
    buttonContainer.appendChild(scissorsButton);


    const rockSelector = document.querySelector('#rock');
    const paperSelector = document.querySelector('#paper');
    const scissorsSelector = document.querySelector('#scissors');

    rockSelector.addEventListener('click', () => playGame('Rock'));
    paperSelector.addEventListener('click', () => playGame('Paper'));
    scissorsSelector.addEventListener('click', () => playGame('Scissors'));
}

function gameOver(string) {
    const gameOver = document.querySelector('#results-container');
    const gameOverText = document.createElement('h1');
    gameOverText.textContent = `Game Over! You ${string}!`;
    gameOverText.setAttribute('id', 'end-text');

    scoreUpdater.classList.toggle('active');

    gameOver.appendChild(gameOverText);
    
    const resultsLog = document.querySelector('#results-log');
    while(resultsLog.hasChildNodes()) {
        resultsLog.removeChild(resultsLog.firstChild);
    }

    const buttons = document.querySelector('#button-container');
    while(buttons.hasChildNodes()) {
        buttons.removeChild(buttons.firstChild);
    }

    resetGame();

}

function resetGame() {
    const endText = document.querySelector('#results-container');
    const buttonContainer = document.querySelector('#button-container');
    const resetButton = document.createElement('button');
    resetButton.setAttribute('id', 'reset');
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', () => {

        endText.removeChild(document.querySelector('#end-text'));
        buttonContainer.removeChild(document.querySelector('#reset'));
        document.querySelector('h2').classList.toggle('active');

        score = 0;
        computerScore = 0;
        scoreUpdater.textContent = `Player: ${score} Computer: ${computerScore}`;

        setup();

    });
    buttonContainer.appendChild(resetButton);
}

function updateScroll() {
    const scroll = document.querySelector('#results-log');
    scroll.scrollTop = scroll.scrollHeight;
}

function checkEnd(string) {
    if (score == 5) {
        gameOver(string);
    }
    else if (computerScore == 5) {
        gameOver(string);
    }
}