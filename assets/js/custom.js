// Responsive Menu Loading
function menuReload() {
	let navListElt = document.getElementById('navList');
	let menu_offset = "margin-bottom: " + navListElt.offsetHeight + "px";
	let menuFixElt = document.getElementById('menufix');
	menuFixElt.setAttribute("style", menu_offset);
}

window.onload = function () {
	menuReload();

	// Window Listener
	window.addEventListener('resize', menuReload);
}