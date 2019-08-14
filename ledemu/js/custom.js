// JS Loader/Checker
function dirJS() {
	let titleElt = document.getElementById('titleSpan');
	titleElt.textContent = "🎨 LED Dot Matrix Emulator 🎨";
}

// Responsive Menu Loading
function menuReload() {
	let navListElt = document.getElementById('navList');
	let menu_offset = "margin-bottom: " + navListElt.offsetHeight + "px";
	let menuFixElt = document.getElementById('menufix');
	menuFixElt.setAttribute("style", menu_offset);
}

// Ink Selector UI Updater
function selectShow(selectedId) {
	// Select all button elements
	const buttonElements = document.querySelectorAll('.colorButton');
	for (let i = 0; i < buttonElements.length; i++) {
		// Re-style
		buttonElements[i].style.width = '5vw';
		buttonElements[i].style.height = '5vw';
		buttonElements[i].style.minWidth = '75px';
		buttonElements[i].style.minHeight = '75px';
		if (buttonElements[i].id === selectedId) {
			buttonElements[i].style.width = '10vw';
			buttonElements[i].style.height = '10vw';
			buttonElements[i].style.minWidth = '150px';
			buttonElements[i].style.minHeight = '150px';
		}
	}
}

function refreshClick(buttonElements) {
	for (let i = 0; i < buttonElements.length; i++) {
		// Refresh/Apply the onclick events to each button.
		buttonElements[i].onclick = function () {
			color = this.id;
			selectShow(this.id);
		}
		buttonElements[i].style.color = buttonElements[i].id;
		buttonElements[i].style.backgroundColor = buttonElements[i].id;
	}
}

function loadCells() {
	let containerElt = document.getElementById('container');
	let containerW = window.innerWidth;
	let containerH = window.innerHeight;
	width = Math.floor(containerW / 21);
	height = Math.floor(containerH / 21);
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			newElt = document.createElement("div");
			const id_string = `cell_${i}_${j}`
			const topOffset = 20 * j;
			const leftOffset = 20 * i;
			const style = `top: ${topOffset}px; left: ${leftOffset}px; height: 19px; width: 19px; background-color: black;`;
			newElt.id = id_string;
			newElt.left =
				newElt.setAttribute("class", "cell");
			newElt.setAttribute("style", style);
			containerElt.appendChild(newElt);
		}
	}
	containerElt.style.width = `${width * 20}px`;
	containerElt.style.height = `${height * 20}px`;
}

function loadCellsClick() {
	const allCellElements = document.querySelectorAll('.cell');
	// now let's visit each one of these elements
	for (let i = 0; i < allCellElements.length; i++) {
		// tell this cell that it should listen for a mouse event
		allCellElements[i].onclick = function () {
			// Part 4, modififed to use color.
			this.style['background-color'] = color;
		}
	}
}

// Part 5 Clear All
function loadClear() {
	let clearElt = document.getElementById('clearAll');
	clearElt.onclick = function () {
		const cellElements = document.querySelectorAll('.cell');

		// now let's visit each one of these elements
		for (let i = 0; i < cellElements.length; i++) {
			// Part 4, modififed to use color.
			cellElements[i].style['background-color'] = 'black';
		}
	};
}

// Add onclick event to custom colors
function loadCustom() {
	let customElt = document.getElementById('customButton');
	customElt.onclick = function () {
		let myColor = window.prompt("What custom color would you like? HEX Codes only please. Must include leading #.");
		if (myColor.charAt(0) === '#' && (myColor.length === 7 || myColor.length === 4)) {
			color = myColor;
			// Add this color as a new button
			let newColor = document.createElement("button");
			newColor.id = color;
			newColor.className = "colorButton";
			newColor.textContent = color;
			document.getElementById("mainColorButtonsDiv").appendChild(newColor);

			// Part 3 onclicks
			var allButtonElements = document.querySelectorAll('.colorButton');

			// now let's visit each one of these elements
			refreshClick(allButtonElements);
			selectShow(color);
		}
		else {
			window.alert("You did not provide a valid hex code, nothing has changed.")
		}
	}
}
// [Column, Row Syntax]
let map = {
	A: [[0, 2], [0, 3], [0, 4], [1, 1], [1, 3], [2, 0], [2, 3], [3, 1], [3, 3], [4, 2], [4, 3], [4, 4]],
	B: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 2], [1, 4], [2, 0], [2, 2], [2, 4], [3, 0], [3, 2], [3, 4], [4, 1], [4, 3]],
	C: [[0, 1], [0, 2], [0, 3], [1, 0], [1, 4], [2, 0], [2, 4], [3, 0], [3, 4], [4, 1], [4, 3]],
	D: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 4], [2, 0], [2, 4], [3, 0], [3, 4], [4, 1], [4, 2], [4, 3]],
	E: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 2], [1, 4], [2, 0], [2, 2], [2, 4], [3, 0], [3, 2], [3, 4], [4, 0], [4, 2], [4, 4]],
	F: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 2], [2, 0], [2, 2], [3, 0], [3, 2], [4, 0], [4, 2]],
	G: [[0, 1], [0, 2], [0, 3], [1, 0], [1, 4], [2, 0], [2, 4], [3, 0], [3, 2], [3, 4], [4, 2], [4, 3]],
	H: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 2], [3, 2], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4]],
	I: [[0, 0], [0, 4], [1, 0], [1, 4], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [3, 0], [3, 4], [4, 0], [4, 4]],
	J: [[0, 0], [0, 3], [1, 0], [1, 4], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [4, 0]],
	K: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 3], [2, 2], [3, 1], [3, 3], [4, 0], [4, 4]],
	L: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
	M: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 1], [2, 2], [3, 1], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4]],
	N: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 1], [2, 2], [3, 3], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4]],
	O: [[0, 1], [0, 2], [0, 3], [1, 0], [1, 4], [2, 0], [2, 4], [3, 0], [3, 4], [4, 1], [4, 2], [4, 3]],
	P: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 2], [2, 0], [2, 2], [3, 0], [3, 2], [4, 1]],
	Q: [[0, 1], [0, 2], [0, 3], [1, 0], [1, 4], [2, 0], [2, 2], [2, 4], [3, 0], [3, 3], [4, 1], [4, 2], [4, 4]],
	R: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 2], [2, 0], [2, 2], [3, 0], [3, 2], [3, 3], [4, 1], [4, 4]],
	S: [[0, 1], [0, 4], [1, 0], [1, 2], [1, 4], [2, 0], [2, 2], [2, 4], [3, 0], [3, 2], [3, 4], [4, 0], [4, 3]],
	T: [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [3, 0], [4, 0]],
	U: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [3, 4], [4, 0], [4, 1], [4, 2], [4, 3]],
	V: [[0, 0], [0, 1], [0, 2], [1, 3], [2, 4], [3, 3], [4, 0], [4, 1], [4, 2]],
	W: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 3], [2, 2], [3, 3], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4]],
	X: [[0, 0], [0, 4], [1, 1], [1, 3], [2, 2], [3, 1], [3, 3], [4, 0], [4, 4]],
	Y: [[0, 0], [1, 1], [2, 2], [2, 3], [2, 4], [3, 1], [4, 0]],
	Z: [[0, 0], [0, 4], [1, 0], [1, 3], [1, 4], [2, 0], [2, 2], [2, 4], [3, 0], [3, 1], [3, 4], [4, 0], [4, 4]],
	1: [[1, 1], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4]],
	2: [[0, 1], [0, 4], [1, 0], [1, 3], [1, 4], [2, 0], [2, 2], [2, 3], [2, 4], [3, 0], [3, 1], [3, 2], [3, 4], [4, 1], [4, 4]],
	3: [[0, 1], [0, 3], [1, 0], [1, 4], [2, 0], [2, 2], [2, 4], [3, 0], [3, 2], [3, 4], [4, 1], [4, 3]],
	4: [[0, 2], [0, 3], [1, 1], [1, 3], [2, 0], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [4, 3]],
	5: [[0, 0], [0, 1], [0, 2], [0, 4], [1, 0], [1, 2], [1, 4], [2, 0], [2, 2], [2, 4], [3, 0], [3, 2], [3, 4], [4, 0], [4, 3]],
	6: [[0, 1], [0, 2], [0, 3], [1, 0], [1, 2], [1, 4], [2, 0], [2, 2], [2, 4], [3, 0], [3, 2], [3, 4], [4, 3]],
	7: [[0, 0], [0, 4], [1, 0], [1, 3], [2, 0], [2, 2], [3, 0], [3, 1], [4, 0]],
	8: [[0, 1], [0, 3], [1, 0], [1, 2], [1, 4], [2, 0], [2, 2], [2, 4], [3, 0], [3, 2], [3, 4], [4, 1], [4, 3]],
	9: [[0, 1], [1, 0], [1, 2], [1, 4], [2, 0], [2, 2], [2, 4], [3, 0], [3, 2], [3, 4], [4, 1], [4, 2], [4, 3]],
	0: [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [2, 0], [2, 4], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [4, 1], [4, 2], [4, 3]],
	'.': [[0, 3], [0, 4], [1, 3], [1, 4]],
	'/': [[0, 4], [1, 3], [2, 2], [3, 1], [4, 0]],
	'\\': [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
	',': [[0, 2], [0, 3], [1, 2], [1, 3], [1, 4]],
	'?': [[0, 1], [1, 0], [2, 0], [2, 3], [3, 0], [3, 2], [4, 1]],
	'(': [[1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 3], [2, 4], [3, 0], [3, 4]],
	')': [[1, 0], [1, 4], [2, 0], [2, 1], [2, 3], [2, 4], [3, 1], [3, 2], [3, 3]],
	'<': [[1, 2], [2, 1], [2, 3], [3, 0], [3, 4]],
	'>': [[1, 0], [1, 4], [2, 1], [2, 3], [3, 2]],
	'-': [[1, 2], [2, 2], [3, 2]],
	'_': [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
	'+': [[1, 2], [2, 1], [2, 2], [2, 3], [3, 2]],
	'=': [[1, 1], [1, 3], [2, 1], [2, 3], [3, 1], [3, 3]],
	'!': [[1, 1], [2, 0], [2, 1], [2, 2], [2, 4], [3, 1]],
	'@': [[0, 3], [1, 0], [1, 2], [1, 4], [2, 0], [2, 3], [2, 4], [3, 0], [3, 4], [4, 1], [4, 2], [4, 3]],
	'#': [[0, 1], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [2, 1], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [4, 1], [4, 3]],
	'$': [[0, 1], [0, 4], [1, 0], [1, 2], [1, 4], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [3, 0], [3, 2], [3, 4], [4, 0], [4, 3]],
	'%': [[0, 0], [0, 1], [0, 4], [1, 0], [1, 3], [2, 2], [3, 1], [3, 4], [4, 0], [4, 3], [4, 4]],
	'^': [[0, 2], [1, 1], [2, 0], [3, 1], [4, 2]],
	'&': [[0, 1], [0, 3], [1, 0], [1, 2], [1, 4], [2, 0], [2, 4], [3, 0], [3, 2], [3, 4], [4, 2], [4, 3]],
	'*': [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]],
	'[': [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [2, 0], [2, 4], [3, 0], [3, 4]],
	']': [[1, 0], [1, 4], [2, 0], [2, 4], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4]]
}

let valid = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890./\\,?()<>-_+=!@#$%^&*[]'
let breakable = ' ./\\,?()<>-_+='

function displayLetter(letter, position, line) {
	if (valid.includes(letter)) {
		for (let px = 0; px < map[letter].length; px++) {
			document.getElementById(`cell_${map[letter][px][0] + 6 * position}_${map[letter][px][1] + 6 * line}`).style['background-color'] = color;
		}
	}
	else if (letter == ' ') {
		if (position === 0) {
			position = -1
		}
	}
	return position
}

function displayWord(word, position, line) {
	text = word.split('')
	for (let j = 0; j < text.length; j++ , position++) {
		position = displayLetter(text[j], position, line)
	}
	return position
}

function loadDisplay() {
	let displayElt = document.getElementById('displaySomething');
	displayElt.onclick = function () {
		let input = window.prompt("What do you want displayed on the emulator?")
		if (!input) {
			return;
		}
		//let words = input.toUpperCase().split(/( .\/\\?()<>\-_+=!@#$%^&*\[\])+/);
		let words = input.toUpperCase().split(/([ ./\\?()<>\-_+=!@#$%^&*\[\]])+/);
		console.log(words)
		let line = 0;
		let position = 0;
		for (let i = 0; i < words.length; i++) {
			// Can word fit on current line?
			// No
			if (position * 6 + words[i].length * 6 - 1> width) {
				// Can the word fit on an entire line?
				// No
				if (words[i].length * 6 - 1 > width) {
					// Display what fits, cut off the rest
					shortWord = words[i].slice(0, Math.floor((width+1)/6)-words[i].length-position);
					words[i] = words[i].slice(Math.floor((width+1)/6)-words[i].length-position);
					position = displayWord(shortWord, position, line)
				}
				// Yes (No also need to reset the line)
				line++;
				position = 0;
				i--;
			}
			// Yes
			else {
				position = displayWord(words[i], position, line)
			}

		}
	}
}

/*
function loadExport() {
	let exportElt = document.getElementById('export');
	exportElt.onclick = function () {
		let answer = [];
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				let elt = document.getElementById(`cell_${i}_${j}`);
				if (elt.style.backgroundColor == color) {
					answer.push(` [${i}, ${j}]`)
				}
			}
		}
		window.alert(`[${answer}]`);
	}
}
*/

function loadAll() {
	loadCells();
	loadCellsClick();
	loadClear();
	loadCustom();
	loadDisplay();
	//loadExport();
}

window.onload = function () {
	dirJS();
	selectShow("white");
	loadAll();

	// Add Color button Clicks
	let buttonElements = document.querySelectorAll('.colorButton');
	refreshClick(buttonElements);

	// Window Listener
	window.addEventListener('resize', menuReload);
}

// Color Variable Storage
let color = "white";
let width = 0;
let height = 0;