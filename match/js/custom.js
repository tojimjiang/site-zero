let busy = false;
let time;
let go = true;
let audio = true;
function loader() {
	let greetElt = document.getElementById("greeting");
	greetElt.textContent = "Sugar Synergy";
	let descElt = document.getElementById("description");
	descElt.textContent = "A super fun game of getting sugar pieces to synergize (basically a memory match game)!";
	// Use false as string because localStorage returns a string.
	if (localStorage.getItem("audio") === 'false') {
		audioToggle();
	}
}

function loadPlay() {
	let buttonElt = document.createElement("button");
	buttonElt.textContent = "Commence Casual";
	buttonElt.setAttribute("class", "startButton");
	buttonElt.addEventListener("click", function () {
		loadGame(3, 4);
	}, false);
	let buttonElt2 = document.createElement("button");
	buttonElt2.textContent = "Initiate Intermediate";
	buttonElt2.setAttribute("class", "startButton");
	buttonElt2.addEventListener("click", function () {
		loadGame(4, 6);
	}, false);
	let buttonElt3 = document.createElement("button");
	buttonElt3.textContent = "Embark Expert";
	buttonElt3.setAttribute("class", "startButton");
	buttonElt3.addEventListener("click", function () {
		loadGame(6, 8);
	}, false);
	document.getElementById("start").appendChild(buttonElt);
	document.getElementById("start").appendChild(buttonElt2);
	document.getElementById("start").appendChild(buttonElt3);
}

function firstUndef(array) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] === undefined) {
			return i;
		}
	}
	return array.length;
}

function random(min, exMax) {
	return Math.floor(Math.random() * (exMax - min)) + min;
}

function pickSprite(eligibleArray) {
	return eligibleArray.splice(random(0, eligibleArray.length), 1);
}

function randomUndef(array, max) {
	let valid = [];
	for (let i = 0; i < max; i++) {
		if (array[i] === undefined) {
			valid.push(i);
		}
	}
	if (valid.length === 0) {
		return array.length;
	}
	else {
		return valid[random(0, valid.length)];
	}
}


function arrayGen(unique) {
	let newArray = [];
	let eligibleArray = ['bean_blue.png', 'bean_green.png', 'bean_orange.png', 'bean_pink.png', 'bean_purple.png', 'bean_red.png', 'bean_white.png', 'bean_yellow.png',
		'heart_blue.png', 'heart_green.png', 'heart_orange.png', 'heart_purple.png', 'heart_red.png', 'heart_teal.png', 'heart_white.png', 'heart_yellow.png',
		'jelly_blue.png', 'jelly_green.png', 'jelly_orange.png', 'jelly_pink.png', 'jelly_purple.png', 'jelly_red.png', 'jelly_teal.png', 'jelly_yellow.png',
		'lollipop_blue.png', 'lollipop_green.png', 'lollipop_orange.png', 'lollipop_pink.png', 'lollipop_purple.png', 'lollipop_rainbow.png', 'lollipop_red.png', 'lollipop_teal.png', 'lollipop_yellow.png',
		'mm_blue.png', 'mm_brown.png', 'mm_green.png', 'mm_orange.png', 'mm_purple.png', 'mm_red.png', 'mm_teal.png', 'mm_yellow.png',
		'star_blue.png', 'star_green.png', 'star_orange.png', 'star_purple.png', 'star_red.png', 'star_teal.png', 'star_white.png', 'star_yellow.png',
		'swirl_blue.png', 'swirl_green.png', 'swirl_orange.png', 'swirl_pink.png', 'swirl_purple.png', 'swirl_red.png', 'swirl_teal.png', 'swirl_yellow.png'
	]
	let exclusiveMax = 2 * unique;
	for (let i = 0; i < unique; i++) {
		// Pick a sprite, and add at first undef
		let sprite = pickSprite(eligibleArray)[0];
		let addingIndex = firstUndef(newArray);
		newArray[addingIndex] = sprite;
		// Then randomly add a copy of the sprite
		newArray[randomUndef(newArray, exclusiveMax)] = sprite;
	}
	return newArray;
}

function flip(HTMLElt) {
	let classStr = HTMLElt.className;
	if (classStr.includes("selected") || classStr.includes("done")) {
		HTMLElt.setAttribute("src", HTMLElt.dataset["sprite"])
	}
	else {
		HTMLElt.setAttribute("src", HTMLElt.dataset["poke"])
	}
}

function addStatus(string, HTMLElt) {
	// Add class to the end
	HTMLElt.setAttribute("class", `${HTMLElt.className} ${string}`);
}

function removeStatus(string, HTMLElt) {
	let newClass = HTMLElt.className.replace(string, "");
	HTMLElt.setAttribute("class", newClass);
}

function matchCheck() {
	let allElts = document.querySelectorAll(".selected");
	if (allElts.length === 2) {
		// There are two selected cards
		for (let i = 0; i < allElts.length; i++) {
			// Remove Selected Status	
			removeStatus("selected", allElts[i]);
		}
		if (allElts[0].dataset.sprite === allElts[1].dataset.sprite) {
			// Audio Check
			if (audio) {
				// Audio Effect
				const audio = new Audio('assets/sounds/correct.wav');
				audio.play();
			}
			// Match Case!
			for (let i = 0; i < allElts.length; i++) {
				// Remove Unmatched
				removeStatus("unmatched", allElts[i]);
				// Add Done
				addStatus("done", allElts[i]);
				// Remove Event Listeners
				allElts[i].removeEventListener("click", _addedEvent);
			}
			// See if this is the last match, if so they win!
			checkEnd();
		}
		else {
			busy = true;
			// Audio Check
			if (audio) {
				// Audio Effect
				const audio = new Audio('assets/sounds/wrong.wav');
				audio.play();
			}
			// No Match case
			// Wait a second before flipback
			setTimeout(function () {
				console.log("unmatched selections");
				for (let i = 0; i < allElts.length; i++) {
					//Remove
					removeStatus("selected", allElts[i]);
					// Flip Back
					flip(allElts[i]);
				}
				busy = false;
			}, 750)
		}
	}
}

function checkEnd() {
	// see if any are unmatched status
	let array = document.querySelectorAll(".unmatched");
	if (array.length === 0) {
		// Win!
		go = false;
		// Hide Game/Timer
		document.getElementById("time").style.display = "none";
		document.getElementById("game").style.display = "none";
		// End Form
		document.getElementById("end").style.display = "block";
		document.getElementById("fillin").textContent = time;
		// Enable Play Again Button
		document.getElementById("playAgain").addEventListener('click', function () {
			window.location.reload();
		}, false);
		let prev;
		let names;
		if (localStorage.getItem("time") !== null) {
			// Get old scores
			prev = localStorage.getItem("time").trimLeft().trimRight().split(" ");
			names = localStorage.getItem("name").trimLeft().trimRight().split(" ");
		}
		if (prev === undefined) {
			// No saved scores
			// Ask for name
			document.getElementById("record").style.display = "block";
			// Add event to record button
			document.getElementById("submit").addEventListener("click", function () {
				saveTime(0);
			}, false)
		}
		else {
			// See if better
			let i;
			let j;
			for (i = 0; i < prev.length; i++) {
				if (time < prev[i]) {
					j = i;
					console.log("breaking");
					break;
					// Better time than i-th elt.
				}
			}
			console.log(`${i}, ${j}`)
			if (j <= prev.length - 1) {
				console.log("better case");
				// Add event to record button
				document.getElementById("record").style.display = "block";
				document.getElementById("submit").addEventListener("click", function () {
					saveTime(j);
				}, false)
			}
			else if (prev.length < 3) {
				// No 3 elements (worst, but still can add)
				// Add event to record button
				console.log("not full");
				document.getElementById("record").style.display = "block";
				document.getElementById("submit").addEventListener("click", function () {
					saveTime(prev.length);
				}, false)
			}
			else {
				// DO NOT SAVE
				console.log("bad");
				// Render
				document.getElementById("record").style.display = "none";
				renderScores();
			}
		}
		// Save Score in local storage in helper
		// Rendering happens in the saving helper function
	}
}

function saveTime(position) {
	console.log("called");
	let times;
	let names;
	if (localStorage.getItem("time") !== null) {
		// Get old scores
		times = localStorage.getItem("time").split(" ");
		names = localStorage.getItem("name").split(" ");
		console.log(times);
		console.log(names);
	}
	else {
		times = [];
		names = [];
	}
	// Get rid of bad entries 
	for (i = 0; i < times.length; i++) {
		if (times[i].length === 0) {
			times.splice(i, 1);
			names.splice(i, 1);
		}
	}
	// Array shift over
	for (i = times.length; i > position; i--) {
		times[i] = times[i - 1];
		names[i] = names[i - 1];
	}
	times[position] = time;
	let cleanName = document.getElementById("name").value.replace(/ /g, "-");
	if (cleanName.length === 0) {
		cleanName = "no-name";
	}
	names[position] = cleanName;
	// String Making
	let max;
	if (times.length > 3) {
		max = 3;
	}
	else {
		max = times.length;
	}
	let tString = "";
	let nString = "";
	for (i = 0; i < max; i++) {
		if (i === 0) {
			tString = times[i];
			nString = names[i];
		}
		else {
			tString = tString + " " + times[i];
			nString = nString + " " + names[i];
		}
	}
	// Set items
	localStorage.setItem("time", tString);
	localStorage.setItem("name", nString);
	// Hide Form
	document.getElementById("record").style.display = "none";
	// Render Scores
	renderScores();
}

function renderScores() {
	let parent = document.getElementById("scores");
	let child = document.createElement("p");
	child.textElement = "Best Scores:";
	parent.appendChild(child);
	let times;
	let names;
	if (localStorage.getItem("time") !== null) {
		// Get old scores
		times = localStorage.getItem("time").trimLeft().trimRight().split(" ");
		names = localStorage.getItem("name").trimLeft().trimRight().split(" ");
	}
	for (let i = 0; i < times.length; i++) {
		if (times[i].length > 0) {
			let scoreEntry = document.createElement("p");
			scoreEntry.setAttribute("class", "scoreEntry");
			scoreEntry.textContent = `${times[i]} (s) scored by ${names[i]}`
			parent.appendChild(scoreEntry);
		}
	}
	// Add a resetter
	let resetButton = document.createElement("button");
	resetButton.setAttribute("class", "resetButton scoreEntry");
	resetButton.textContent = "Reset All High Scores";
	resetButton.addEventListener("click", function () {
		reset();
	}, false);
	parent.appendChild(resetButton);
	parent.style.display = "block";
}

function deleteOldScore() {
	let element = document.querySelector('.scoreEntry');
	while (element) {
		element.parentNode.removeChild(element);
		element = document.querySelector('.scoreEntry');
	}
}

function reset() {
	localStorage.removeItem("time");
	localStorage.removeItem("name");
	deleteOldScore();
}

function _addedEvent() { }

function loadGame(rows, cols) {
	// Pick a random # of sprites
	let newArray = arrayGen(rows * cols / 2);
	// Make 4 Rows
	for (let i = 0; i < (cols * rows / 2); i++) {
		let newRow = document.createElement("div")
		newRow.setAttribute("class", "gameRow");
		for (let j = 0; j < 2; j++) {
			// Make Elements based on the newArray, telling about the attributes.
			let thisElt = document.createElement("img");
			thisElt.setAttribute("src", `assets/candy.png`);
			thisElt.setAttribute("class", "unmatched card");
			// Add swapperonis
			thisElt.dataset["poke"] = `assets/candy.png`;
			thisElt.dataset["sprite"] = `assets/candy/${newArray[i * 2 + j]}`;
			// Add event listeners
			thisElt.addEventListener("click", function _addedEvent() {
				if (thisElt.className.includes("done")) {
					// do nothing
				}
				else if (!busy) {
					addStatus("selected", thisElt);
					flip(thisElt);
					matchCheck();
				}
				else {
					console.log("Skipped because was busy.");
				}
			}, false);
			newRow.appendChild(thisElt);
		}
		document.getElementById("game").appendChild(newRow);
	}
	// Swappy
	document.getElementById("game").style.display = "flex";
	document.getElementById("start").style.display = "none";
	// Timer Start
	let startTime = new Date().getTime();
	timer(startTime);
}

function timer(startTime) {
	if (go) {
		let currentTime = new Date().getTime();
		time = Math.floor((currentTime - startTime) / 1000)
		document.getElementById("time").textContent = `Time: ${time}`;
		setTimeout(function () {
			timer(startTime);
		}, 1000);
	}
}

function audioToggle() {
	if (audio) {
		audio = false;
		localStorage.setItem("audio", false);
		document.getElementById('audioStatus').textContent = 'Enable Audio';
	}
	else {
		audio = true;
		localStorage.setItem("audio", true);
		document.getElementById('audioStatus').textContent = 'Disable Audio';
	}
}

window.onload = function () {
	function storageTest(type) {
		try {
			let storage = window[type],
				x = 'testing';
			storage.setItem(x, x);
			storage.removeItem(x);
			console.log("Storage Pass");
			return true;
		}
		catch (e) {
			console.log("Storage Fail");
			return false;
		}
	}

	if (storageTest('localStorage')) {
		loader();
		loadPlay();
	}
};

// Change Size of Cards so they are always fit on screen
// Currently Not Used, Instead use Flex-box wrapping.
/* 
window.addEventListener('resize', function () {
	if (go && window.innerWidth > 400) {
		let styleSheet = document.styleSheets[1];
		let rules = styleSheet.rules;
		let oldRule = rules[0];
		console.log(oldRule);
		if (oldRule.selectorText === '.card') {
			styleSheet.deleteRule(0);
		}
		let compStyle = getComputedStyle(document.querySelector('.card'));
		let newWidth = document.querySelector('.card').offsetWidth - parseFloat(compStyle.paddingLeft) * 2;
		styleSheet.insertRule(`.card {
		height: ${newWidth}px !important;
		}`);
	}
})

*/
