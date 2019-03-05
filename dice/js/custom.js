// JS Loader/Checker
function dirJS() {
	let titleElt = document.getElementById('titleSpan');
	let dirElt = document.getElementById('dirSpan');
	titleElt.textContent = "🎲 Guess The Number! 🎲";
	dirElt.textContent = "Guess the Number is a game of chance that involves absolutely no skill. In this game the computer will roll a 6 sided die. Your job is to predict the result that will be rolled. Each guess costs $10, and you start the game with $50. If you guess incorrectly, you will lose the $10. But if you guess correctly you will win $10 (basic) or $60 (targeted). The game ends when you run out of money, or when you choose to leave this webpage!";
}

// Responsive Menu Loading
function menuReload() {
	let navListElt = document.getElementById('navList');
	let menu_offset = "margin-bottom: " + navListElt.offsetHeight + "px";
	let menuFixElt = document.getElementById('menufix');
	menuFixElt.setAttribute("style", menu_offset);
}

// Create Event Listeners for Buttons/Hover Areas
function addListeners() {
	let titleDivElt = document.getElementById('titleDiv')
	titleDivElt.addEventListener('mouseover', function () { showDir() });
	titleDivElt.addEventListener('mouseout', function () { hideDir() });
	document.getElementById('odd').addEventListener('click', function () { bet('odd') });
	document.getElementById('even').addEventListener('click', function () { bet('even') });
	document.getElementById('1').addEventListener('click', function () { bet('1') });
	document.getElementById('2').addEventListener('click', function () { bet('2') });
	document.getElementById('3').addEventListener('click', function () { bet('3') });
	document.getElementById('4').addEventListener('click', function () { bet('4') });
	document.getElementById('5').addEventListener('click', function () { bet('5') });
	document.getElementById('6').addEventListener('click', function () { bet('6') });
	document.getElementById('play').addEventListener('click', function () { hidePlay() });
	hidePlay();

	let historyElt = document.getElementById('history')
	historyElt.addEventListener('click', function () { showHistory() });
}


// Element Show/Hiding
// Directions
function showDir() {
	let dirElt = document.getElementById('dir');
	dirElt.style.display = "block";
}

function hideDir() {
	let dirElt = document.getElementById('dir');
	dirElt.style.display = "none";
}

// History
function showHistory() {
	let historyElt = document.getElementById('historyText');
	if (historyElt.style.display === "block") {
		historyElt.style.display = "none";
	}
	else {
		historyElt.style.display = "block";
	}
}

// Play Again
function showPlay() {
	if (bank > 0) {
		let buttonsElt = document.getElementById('buttons');
		buttonsElt.style.display = "none";
		let playElt = document.getElementById('playAgain');
		playElt.style.display = "block";
	}
	// No more money case (stop play)
	else {
		let buttonsElt = document.getElementById('buttons');
		buttonsElt.style.display = "none";
		let playBElt = document.getElementById('play');
		playBElt.style.display = "none";
		let endElt = document.getElementById('end');
		endElt.style.display = "block";
	}
}

function hidePlay() {
	let buttonsElt = document.getElementById('buttons');
	buttonsElt.style.display = "flex";
	let playElt = document.getElementById('playAgain');
	playElt.style.display = "none";
	let endElt = document.getElementById('end');
	endElt.style.display = "none";
}

// First bet DNE, hide it.
function hideBet() {
	let betElt = document.getElementById('bet');
	betElt.style.display = "none";
}


// Result Loaders for Game
function loadBank() {
	let valueElt = document.getElementById('value');
	valueElt.textContent = bank;
}

function loadBet(bet) {
	// Always show bet
	let betElt = document.getElementById('bet');
	betElt.style.display = "block";
	let choiceElt = document.getElementById('choice');
	choiceElt.textContent = bet;
}

function loadDice(value) {
	let diceElt = document.getElementById('dice');
	diceElt.src = "assets/dice-" + value + ".png";
}

function loadResult(winStatus) {
	let resultElt = document.getElementById('result'); 
	let betElt = document.getElementById('bet'); 
	if (winStatus) {
		resultElt.textContent = " - You WIN! 🙂";
		betElt.style.background = "darkgreen";
	}
	else {
		resultElt.textContent = " - You Lose! 🙁";
		betElt.style.background = "darkblue";
	}
}

// (Load) Add History
function addHistory(guess, die, result, bank) {
	let historyTElt = document.getElementById('historyText');
	
	if (betNumber === 1) {
		// New Histroy
		let historyString = `Roll ${betNumber}: You bet ${guess}, and you ${result}, because the roll was a ${die}. Your bank ended up with $${bank}. <br>`;
		historyTElt.innerHTML= historyString;
		betNumber++;
	}
	else {
		// Add to beginning
		let historyString = `Roll ${betNumber}: You bet ${guess}, and you ${result}, because the roll was a ${die}. Your bank ended up with $${bank}. <br>` + historyTElt.innerHTML;
		historyTElt.innerHTML = historyString;
		betNumber++;
	}
}

// Game Functions
function randint(exclusiveMax) {
	return (Math.floor(Math.random() * exclusiveMax));
}

function randDice() {
	return (randint(6) + 1);
}

function parseUser(string) {
	if (string === 'odd') {
		return 1;
	}
	else {
		return 0;
	}
}

function bet(userGuess) {
	loadBet(userGuess);
	let roll = randDice();
	loadDice(roll);
	// Longer than 1 Digit (is odd/even case)
	if (userGuess.length > 1) {
		// Determine Parity (Odd/Even)
		let parity = roll % 2;
		// Use parseUser
		// Win Case (partities match)
		if (parity === parseUser(userGuess)) {
			bank = bank + 10;
			loadResult(true);
			addHistory(userGuess, roll, 'won $10', bank);
		}
		// Lose Case (parity missmatch)
		else {
			bank = bank - 10;
			loadResult(false);
			addHistory(userGuess, roll, 'lost', bank);
		}
	}
	// Targeted Bet Case
	else {
		if (roll == parseInt(userGuess, 10)) {
			// Win
			bank = bank + 60;
			loadResult(true);
			addHistory(userGuess, roll, 'won $60', bank);
		}
		else {
			// Lose
			bank = bank - 10;
			loadResult(false);
			addHistory(userGuess, roll, 'lost', bank);
		}
	}
	// Update Bank
	loadBank();
	// Replace Buttons
	showPlay()
}

window.onload = function () {
	menuReload();
	dirJS();
	addListeners();
	loadBank();
	hideBet();
}

// Window Listener
window.addEventListener('resize', menuReload);

// Bank Value
let bank = 50;
let betNumber = 1;

