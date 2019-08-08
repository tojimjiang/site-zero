// JS Loader/Checker
function dirJS() {
	let titleElt = document.getElementById('titleSpan');
	titleElt.textContent = "🎨 Color Canvas 🎨";
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
	width = Math.floor(containerW / 16);
	height = Math.floor(containerH / 21);
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
	container.addEventListener('mousedown', function(event) {
		oldX = event.clientX;
		oldY = event.clientY;
		going = true;
	}, false)
	container.addEventListener('mouseup', function() {
		going = false;
	}, false)
	container.addEventListener('mousemove', track);
}

/*
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
*/

function smooth(x, y, limitX, limitY) {
	if (x == limitX || y == limitY) {
		return;
	}
	// Larger X and Y (down right)
	if (x > oldX && y > oldY) {
		document.elementFromPoint(x + 2, y + 2).style['background-color'] = color;
		smooth(x + 2, y + 2, limitX, limitY)
	}
	// Smaller X and Y (up left)
	else if (x < oldX && y < oldY) {
		document.elementFromPoint(x - 2, y - 2).style['background-color'] = color;
		smooth(x - 2, y - 2, limitX, limitY)
	}
	// Larger X, smaller Y (up right)
	else if (x > oldX && y < oldY) {
		document.elementFromPoint(x + 2, y - 2).style['background-color'] = color;
		smooth(x + 2, y - 2, limitX, limitY)
	}
	// Smaller X, Larger Y (down left)
	else if (x < oldX && y > oldY) {
		document.elementFromPoint(x - 2, y + 2).style['background-color'] = color;
		smooth(x - 2, y + 2, limitX, limitY)
	}
	oldX = x;
	oldY = y;
}

function track() {
	if (going) {
		//smooth(oldX, oldY, event.clientX, event.clientY)
		console.log(`${event.clientX}, ${event.clientY}`)
    	document.elementFromPoint(event.clientX, event.clientY).style['background-color'] = color;
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
	let allow = false;
	titleElt.addEventListener('mouseenter', function() {
		userMenuElt.style.display = 'block';
		setTimeout(function() {
			allow = true;
		}, 1500)
	}, false)

	// Close on title click OR menu button press
	titleElt.addEventListener('click', function() {
		if (allow) {
			userMenuElt.style.display = 'none';
		} 
	}, false)

	let closeMenuElt = document.getElementById('closeMenu');
	closeMenuElt.addEventListener('click', function() {
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

	// Window Listener
	window.addEventListener('resize', menuReload);
}

// Color Variable Storage
let color = "black";
let going = false;
let oldX;
let oldY;
let width;
let height;