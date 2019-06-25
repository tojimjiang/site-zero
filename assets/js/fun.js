let running = false;
let event = null;
let fonts = ["Abril Fatface ", "Aguafina Script ", "Amatic SC ", "Anton ", "Arima Madurai ", "Astloch ", "Autour One ", "Bigelow Rules ", "Bungee Shade ", "Cinzel ", "Cinzel Decorative ", "Codystar ", "Courgette ", "Emblema One ", "Faster One ", "Freckle Face ", "Great Vibes ", "Hanalei ", "Kalam ", "Kaushan Script ", "Kumar One Outline ", "Lateef ", "Libre Barcode 39 ", "Libre Barcode 39 Text ", "Mali ", "Megrim ", "Monoton ", "Nanum Brush Script ", "Nosifer ", "Orbitron ", "Pacifico ", "Permanent Marker ", "Petit Formal Script ", "Pompiere ", "Poppins ", "Press Start 2P ", "Raleway ", "Rock Salt ", "Shojumaru ", "Shrikhand ", "Sofadi One ", "Swanky and Moo Moo ", "Tangerine ", "Trochut ", "Viga ", "ZCOOL KuaiLe"];
let styleM;
let styleT;
let styleD;

function autoShift() {
	let choice = fonts[Math.floor(Math.random()*fonts.length)];
	console.log('chaging to ' + choice);
	styleM.deleteRule(0);
	styleM.insertRule(`html, body{margin: 0;
		font-family: ${choice};
	}`, 0);
	styleT.deleteRule(0);
	styleT.insertRule(`html, body{margin: 0;
		font-family: ${choice};
	}`, 0);
	styleD.deleteRule(0);
	styleD.insertRule(`html, body{margin: 0;
		font-family: ${choice};
	}`, 0);
}

function start() {
	running = true;
	autoShift();
	event = setInterval(
		function() {
			autoShift()
		}, 5000
	);
}

function stop() {
	clearInterval(event);
	running = false;
}

window.addEventListener('load', function() {
	styleM = document.styleSheets[0];
	styleT = document.styleSheets[1];
	styleD = document.styleSheets[2];
})

window.addEventListener('click', function() {
	if (running) {
		stop();
	}
	else {
		start();
	}
});