// Push to HTTPS (if not already)
function secure() {
	if (location.protocol != 'https:' && location.protocol != 'file:') {
		location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
	}
}

// Responsive Menu Loading
function menuReload() {
	let navListElt = document.getElementById('navList');
	let menu_offset = "margin-bottom: " + navListElt.offsetHeight + "px";
	let menuFixElt = document.getElementById('menufix');
	menuFixElt.setAttribute("style", menu_offset);
}

window.onload = function () {
	secure();
	menuReload();

	// Window Listener
	window.addEventListener('resize', menuReload);
}