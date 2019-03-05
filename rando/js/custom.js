// Make my own randint from Math.random
function randint(exclusiveMax) {
	return (Math.floor(Math.random()*exclusiveMax));
}

function randomLoad(){
	let bodySrc = "assets/bodies/body" + String(randint(6) + 1) + ".png";
	let headSrc = "assets/heads/head" + String(randint(6) + 1) + ".png";
	let bodyElt = document.getElementById("body");
	let headElt = document.getElementById("head");
	bodyElt.src = bodySrc;
	headElt.src = headSrc;
}

function menuLoad() {
	let navListElt = document.getElementById("navList");
	let menu_offset = "margin-bottom: " + navListElt.offsetHeight + "px";
	let menuFixElt = document.getElementById("menufix");
	menuFixElt.setAttribute("style", menu_offset);
}

function footerLoad() {
	let bodyElt = document.getElementById("body");
	let footer_offset = "margin-bottom: " + bodyElt.offsetHeight + "px";
	let footerFixElt = document.getElementById("footerFix");
	footerFixElt.setAttribute("style", footer_offset);
}

function header(){
	let array = ["Awesome", "Fantastic", "Fabulous", "Superb", "Perfect", "Brilliant", "Coming up Roses"];
	let newText =  "Everything is " + array[randint(7)];
	let headerElt = document.getElementById("greeting");
	headerElt.textContent = newText;
}	

function time(){
	let currTime = new Date();
	let currHour = currTime.getHours();
	let currMins = currTime.getMinutes();
	let array = ["Night", "Morning", "Afternoon", "Evening"];
	let message = array[Math.floor(currHour / 6)];
	let ampm;
	// Fix AM/PM
	if (currHour > 11) {
		ampm = "pm";
		currHour = currHour - 12;
	}
	else {
		ampm = "am"
	}
	// Midnight & noon Case
	if (currHour ===  0) {
		currHour = 12;
	}
	// Minutes Fix
	if (currMins === 0) {
		currMins = "00";
	}
	else if (currMins < 10) {
		currMins = "0" + String(currMins);
	}
	else {
		currMins = String(currMins);
	}
	let newText = "The time is currently " + String(currHour) + ":" + currMins + " " + ampm + " - Good " + message + "!";
	let timeElt = document.getElementById("timeMsg");
	let bgElt = document.getElementById("background");
	let bgSrc = "assets/backgrounds/" + message.toLowerCase() + ".png";
	bgElt.src = bgSrc;
	timeElt.textContent = newText;
}
function getRandomNumbers() {
	// Get the numbers
	let array = [];
	while (array.length < 3) {
		let thisNumber = randint(9) + 1;
		if (! (array.includes(thisNumber))) {
			array.push(thisNumber);
		}
	}
	// Make the message
	let numText = "Your three lucky numbers today are " + array[0] + ", " + array[1] + " and " + array[2];
	let numElt = document.getElementById("numMsg");
	numElt.textContent = numText;
}

function goResponsive() {
	// Fix the menu
	menuLoad();
	// Change Text Padding
	let allTextElt = document.getElementById("allText");
	let allTextStyle = window.getComputedStyle(allTextElt);
	let allTextH = -1.1 * (allTextElt.offsetHeight + parseFloat(allTextStyle['marginTop']));
	let allText_offset = "margin-bottom: " + allTextH + "px";
	allTextElt.setAttribute("style", allText_offset);

	// Vars of images
	let bodyElt = document.getElementById("body");
	let headElt = document.getElementById("head");

	// Fix Background
	let bgElt = document.getElementById("background");
	let bg_offset = "margin-bottom: " + String(-1 * (bodyElt.height + headElt.height + 6)) + "px;";
	bgElt.setAttribute("style", bg_offset);

	// Fix Alignment
	let body_offset = "padding-top: " + String(headElt.height) + "px; margin-bottom: " + String(-1*bodyElt.height) + "px;";
	bodyElt.setAttribute("style", body_offset);
	
	/* Negative sum of width of body and half of width of head*/
	let size = -0.5 * (bodyElt.width + headElt.width);
	let head_offset = "margin-left: " + size + "px;";
	headElt.setAttribute("style", head_offset);

	// Fix the footer
	footerLoad();

	// Tell Console that site is responsive
	console.log("I'm responsive!");

}

window.onload = function () {
	randomLoad();
	header();
	time();
	getRandomNumbers();
	goResponsive();
	}

// Resize, realign
window.addEventListener('resize', goResponsive);