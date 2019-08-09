// JS Loader/Checker
function dirJS() {
	let titleElt = document.getElementById('titleSpan');
	titleElt.textContent = "🎨 Color Canvas 🎨";
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

function totalOffsetMarginHeight(element) {
	let styles = window.getComputedStyle(element);
  	return parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']) + element.offsetHeight;
}

function heightOfEverythingElse() {
	let querySelectors = ['header', 'h1', '.spacer', '.footer']
	let total = 0;
	for (let i = 0; i < querySelectors.length; i++) {
		total += totalOffsetMarginHeight(document.querySelector(querySelectors[i]));
	}
	return total;
}

function loadCells() {
	let containerElt = document.getElementById('container');
	let containerW = window.innerWidth;
	let containerH = window.innerHeight - heightOfEverythingElse();
	width = Math.floor(containerW / 16);
	height = Math.floor(containerH / 15);
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			newElt = document.createElement("div");
			const id_string = `cell_${i}_${j}`
			const topOffset = 15 * j;
			const leftOffset = 15 * i;
			const style = `top: ${topOffset}px; left: ${leftOffset}px; height: 15px; width: 15px; background-color: white;`;
			newElt.id = id_string;
			//newElt.left =
			newElt.setAttribute("class", "cell");
			newElt.setAttribute("style", style);
			containerElt.appendChild(newElt);
		}
	}
	containerElt.style.width = `${width * 15}px`;
	containerElt.style.height = `${height * 15}px`;
	document.querySelector('#footerFix').style.height = `${Math.floor(containerH) - (height * 15) - 2}px`
	// Mouse Events
	container.addEventListener('mousedown', function (event) {
		going = true;
	}, false)
	container.addEventListener('mouseup', function () {
		going = false;
	}, false)
	container.addEventListener('mousemove', track);
	// Touch Events
	container.addEventListener('touchstart', function (event) {
		going = true;
	}, false)
	container.addEventListener('touchend', function () {
		going = false;
	}, false)
	container.addEventListener('touchcancel', function () {
		going = false;
	}, false)
	container.addEventListener('touchmove', trackTouch);
}

function colorCell(x, y) {
	let elt = document.elementFromPoint(x, y);
	if (elt.classList.contains('cell')) {
		elt.style['background-color'] = color;
	}
}

function trackTouch() {
	if (going) {
		//smooth(oldX, oldY, event.clientX, event.clientY)
		console.log(`Touch: ${event.touches[0].clientX}, ${event.touches[0].clientY}`)
		for (let i = 0; i < event.touches.length; i++) {
			colorCell(event.touches[i].clientX, event.touches[i].clientY)
		}
	}
}

function track() {
	if (going) {
		//smooth(oldX, oldY, event.clientX, event.clientY)
		console.log(`Mouse: ${event.clientX}, ${event.clientY}`)
		colorCell(event.clientX, event.clientY);
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
			cellElements[i].style['background-color'] = 'white';
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

function loadHideMenu() {
	let userMenuElt = document.getElementById('userMenu');
	userMenuElt.style.display = 'none';

	// Add hidden even on the title
	let titleElt = document.getElementById('titleSpan');
	// Prevent hover-click-accidental-close
	titleElt.addEventListener('mouseenter', function () {
		if (userMenuElt.style.display == 'none') {
			allow = false;
			userMenuElt.style.display = 'block';
			setTimeout(function () {
				allow = true;
			}, 500)
		}
	}, false)

	// Close on title click OR menu button press
	titleElt.addEventListener('click', function () {
		if (userMenuElt.style.display == 'none') {
			allow = false;
			userMenuElt.style.display = 'block';
			setTimeout(function () {
				allow = true;
			}, 500)
		}
		else if (allow) {
			userMenuElt.style.display = 'none';
		}
	}, false)

	let closeMenuElt = document.getElementById('closeMenu');
	closeMenuElt.addEventListener('click', function () {
		userMenuElt.style.display = 'none';
	}, false)
}

function loadAll() {
	loadCells();
	//loadCellsClick();
	loadClear();
	loadCustom();
	loadHideMenu();
}

window.onload = function () {
	dirJS();
	selectShow("black");
	loadAll();

	// Add Color button Clicks
	let buttonElements = document.querySelectorAll('.colorButton');
	refreshClick(buttonElements);
}

// Color Variable Storage
let color = "black";
let going = false;
let width;
let height;
let allow = false;