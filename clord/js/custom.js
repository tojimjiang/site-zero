// JS Loader/Checker
function dirJS(message) {
	let titleElt = document.getElementById('titleSpan');
	titleElt.textContent = message;
}

// Responsive Menu Loading
function menuReload() {
	// Deal with navButton's max width
	if (document.getElementsByClassName('hidden').length === 0) {
		console.log(window.getComputedStyle(document.getElementById('navButton')).getPropertyValue('width'))
		document.getElementById('navButton').style.maxWidth = `${window.getComputedStyle(document.getElementById('navButton')).getPropertyValue('width')}`;
	}
}

// Menu Buttons
function menuChange() {
	if (!changing) {
		changing = true
		if (document.getElementById('navButton').text == '👉') {
			document.querySelectorAll('.hideable').forEach(element => {
				element.classList.add('hidden');
				setTimeout(function () { 
					element.classList.add('text-hidden') ;	
			}, 251)
			setTimeout(function() {
				document.querySelector('#navButton').text = '👈';
			}, 100)
			});
			document.querySelector('#navButton').text = '✋';
			urlParams = new URLSearchParams(window.location.search);
			if (urlParams.has('pro') && urlParams.get('pro').toLowerCase() === 'true') {
				document.querySelector('.footer').style.fontSize = '0.1em';
			}
			else {
				document.querySelector('.footer').style.fontSize = '2em';
			}
			document.querySelector('.footer').style.padding = '0';
		}
		else {
			document.querySelector('#navButton').text = '✋';
			count = 1;
			document.querySelectorAll('.hideable').forEach(element => {
				setTimeout(function () { element.classList.remove('hidden') }, 10*count++);
				setTimeout(function () { element.classList.remove('text-hidden') }, 10 * count++ + 250);
			});
			setTimeout(function() {
				document.querySelector('#navButton').text = '👉';
			}, 100)
			document.querySelector('.footer').style.fontSize = '1em';
			document.querySelector('.footer').style.padding = '1vw';
		}
		setTimeout(function() {changing = false}, 300)
	}
	else {
		setTimeout(function() {menuChange}, 300)
	}
}

function rollFactory(direction) {
	let target = '';
	if (direction == 0) {
		target = 'oclock';
	}
	else if (direction == -1) {
		target = 'past';
	}
	else {
		target = 'to';
	}
	if (!document.querySelector(`#${target}`).classList.contains('on')) {
		document.querySelectorAll('.roll.on').forEach((elt) => elt.classList.remove('on'));
		document.querySelector(`#${target}`).classList.add('on');
	}
}

function minute30factory(minute) {
	let target = [];
	if (minute > 0) {
		if (document.querySelector(`#m${String(minute)}`)) {
			target.push(`m${minute}`)
		}
		else {
			if (minute > 20) {
				target.push(`m${minute - 20}`)
				target.push(`m20`)
			}
			// 15 is cased out earlier
			else if (minute !== 13) {
				target.push(`m${minute - 10}`)
				target.push(`m1x`)
			}
			else {
				target.push(`mx${minute - 10}`)
				target.push(`m1x`)
			}
		}
	}
	let on = document.querySelectorAll('.minutes.on');
	for (let i = 0; i < on.length; i++) {
		if (!target.includes(on[i].id)) {
			on[i].classList.remove('on');
		}
	}
	for (let i = 0; i < target.length; i++) {
		if (!document.querySelector(`#${target[i]}`).classList.contains('on')) {
			document.querySelector(`#${target[i]}`).classList.add('on');
		}
	}
}

function timeFactory(hour, minute) {
	let target = (timeHM[hour[minute]] ? timeHM[hour[minute]] : timeH[hour]).split(" ");
	let on = document.querySelectorAll('.time.on');
	for (let i = 0; i < on.length; i++) {
		if (!target.includes(on[i].textContent)) {
			on[i].classList.remove('on');
		}
	}
	for (let i = 0; i < target.length; i++) {
		if (!document.querySelector(`#${target[i]}`).classList.contains('on')) {
			document.querySelector(`#${target[i]}`).classList.add('on');
		}
	}
}

function hourFactory(hour) {
	let target = ""
	if (hour == 0) {
		target = '12'
	}
	else if (hour < 12) {
		target = `${hour}`
	}
	else {
		target = `${hour - 12}`
	}
	if (!document.querySelector(`#h${target}`).classList.contains('on')) {
		document.querySelectorAll('.hours.on').forEach((elt) => elt.classList.remove('on'));
		document.querySelector(`#h${target}`).classList.add('on');
	}
}

function minuteFactory() {
	let nowMinute = new Date().getMinutes();
	let nowHour = new Date().getHours();
	//let nowMinute = dateElt.getMinutes();
	// 31+
	timeFactory(nowHour, nowMinute);
	if (nowMinute > 30) {
		rollFactory(1)
		minute30factory(60 - nowMinute)
		hourFactory(nowHour + 1)
	}
	// 1-30
	else if (nowMinute > 0) {
		rollFactory(-1)
		minute30factory(nowMinute)
		hourFactory(nowHour)
	}
	// o'clock
	else {
		rollFactory(0)
		minute30factory(0)
		hourFactory(nowHour)
	}
}

function secondFactory() {
	let nowSecond = new Date().getSeconds();
	let target = [];
	if (typeof nowSecond === 'number') {
		if (document.querySelector(`#s${nowSecond}`)) {
			target.push(`s${nowSecond}`)
		}
		else {
			if (nowSecond > 20) {
				target.push(`s${nowSecond % 10}`);
				Math.floor(nowSecond / 10) ? target.push(`s${Math.floor(nowSecond / 10)}0`) : null
			}
			else if (nowSecond !== 13 && nowSecond !== 15) {
				target.push(`s${nowSecond - 10}`);
				target.push(`s1x`);
			}
			else {
				target.push(`sx${nowSecond - 10}`);
				target.push(`s1x`)
			}
		}
	}
	let on = document.querySelectorAll('.seconds.on');
	for (let i = 0; i < on.length; i++) {
		if (!target.includes(on[i].id)) {
			on[i].classList.remove('on');
		}
	}
	for (let i = 0; i < target.length; i++) {
		if (!document.querySelector(`#${target[i]}`).classList.contains('on')) {
			document.querySelector(`#${target[i]}`).classList.add('on');
		}
	}
	if (nowSecond == 0) {
		minuteFactory()
	}
}

function stayInSync() {
	let data = 1001 - new Date().getMilliseconds()
	console.log(data)
	setTimeout(function () {
		secondFactory();
		stayInSync();
	}, data)
}

function legacyStayInSync() {
	let data = new Date().getMilliseconds()
	console.log(data)
	if (data > 5) {
		dirJS("Syncing with your clock. Please wait a moment.")
		pending();
		clearInterval(interval);
		sync();
	}
	else {
		secondFactory();
	}
}

// Get into sync with max delta of 4ms (allow to stay out of sync up to 10ms/min)
function sync() {
	setTimeout(function () {
		if (new Date().getMilliseconds() < 1) {
			minuteFactory();
			secondFactory();
			dirJS("It is");
			//unloading()
			interval = setInterval(function () {
				legacyStayInSync();
			}, 1000)
			unloading();
		}
		else {
			dirJS("Syncing with your clock. Please wait a moment.")
			sync()
		}
	}, 5)
}

function unloading() {
	document.querySelectorAll('.deactivate').forEach((elt) => { elt.classList.remove('deactivate'); elt.classList.add('activate') });
	let elt = document.querySelector('.sync-pending')
	elt.classList.add('deactivate', 'sync-pending-off');
	elt.classList.remove('sync-pending');
}

function pending() {
	let elt = document.querySelector('.sync-pending-off')
	elt.classList.add('sync-pending');
	elt.classList.remove('deactivate', 'sync-pending-off');
	document.querySelectorAll('.activate').forEach((elt) => { elt.classList.add('deactivate'); elt.classList.remove('activate') });
}

window.onload = function () {
	console.log(
		"Enable special features with query strings! Use https://jimjiang.com/clord?legacy=true to get the old wait to sync loader! Or use https://jimjiang.com/clord?pro=true to get the pro version with super mini menu."
		)
	menuReload();
	urlParams = new URLSearchParams(window.location.search);
	if (urlParams.has('legacy') && urlParams.get('legacy').toLowerCase() === 'true') {
		sync();
	}
	else {
		dirJS("It is");
		minuteFactory();
		secondFactory();
		unloading();
		stayInSync();
	}
}

// Window Listener
//window.addEventListener('resize', menuReload);

let interval = null;

let timeHM = {
	"0": {
		"0": "midnight"
	},
	"12": {
		"0": "noon"
	}
}
let timeH = {
	"0": "early twilight",
	"1": "early twilight",
	"2": "twilight",
	"3": "late twilight",
	"4": "early morning",
	"5": "early morning",
	"6": "morning",
	"7": "morning",
	"8": "morning",
	"9": "late morning",
	"10": "late morning",
	"11": "late morning",
	"12": "early afternoon",
	"13": "afternoon",
	"14": "afternoon",
	"15": "afternoon",
	"16": "late afternoon",
	"17": "early evening",
	"18": "early evening",
	"19": "evening",
	"20": "evening",
	"21": "evening",
	"22": "late evening",
	"23": "late evening"
}

let changing = false;