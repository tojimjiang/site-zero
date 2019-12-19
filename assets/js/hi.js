function jsLoad() {
	document.getElementById('title-header').innerText = `Making sure your not a robot. 🤖 Beep boop. 💻`;
	document.getElementById('preload-desc').innerText = `But really, reCAPTCHA is making sure your not a robot before letting you through. Should be just a moment (less than 20 seconds).`;
	document.getElementById('loader-animation').style.display = 'block';
}

function displaySwap() {
	// Update Title
	document.getElementById('title-header').innerText = `It's Happening!`;
	// Hide Loader
	document.getElementById('preload').style.display = 'none';
	// Show Actual Contact Info
	document.getElementById('info-div').style.display = 'flex';
	// Update Title
	document.getElementById('title-header').innerText = `📱 Let's Talk! 💻`;
}

function load(object) {
	// Phone
	let phone = document.createElement('a');
	phone.textContent=`Call me at ${object.phone}`;
	phone.target = '_blank';
	phone.classList = 'project';
	phone.href=`tel:+1${object.phone.replace(/\(|\)/gm, '-')}`;
	document.getElementById('info-div').appendChild(phone);
	// Email
	let email = document.createElement('a');
	email.textContent=`Email me at ${object.email}`;
	email.target = '_blank';
	email.classList = 'project';
	email.href=`mailto:${object.email}`;
	document.getElementById('info-div').appendChild(email);
	// Show to user
	displaySwap();
}

function insertCaptcha(div){
	let inner = document.createElement('div');
	inner.classList = 'g-recaptcha';
	grecaptcha.render('captcha-wrap', {
		sitekey: '6LeDeqUUAAAAAAwfbFwmpWYydTJbUCKLQP138vY-',
		callback: 'verify2'
	});
}

function timedRefresh() {
	setTimeout( function() {window.location.reload()}, 3000);
}

async function verify2(token) {
	// v2 Captcha call
	try {
		let response = await fetch('https://captchapi-hi.jimjiang.com',
		{method: 'post', body: JSON.stringify({token: token, type: 2})});
		if (response.status === 200) {
			let object = await response.json();
			document.querySelector('#captcha-wrap').style.display = 'none';
			load(object);
		}
		else {
			// Complete Failure, reload?
			timedRefresh()
		}
	}
	catch (e) {
		// Complete Failure, reload?
		timedRefresh()
	}
}

async function verify3() {
	// v3 Captcha call
	grecaptcha.ready(function() {
		grecaptcha.execute('6Ld7eqUUAAAAAOxWpaaN_jRYlaLU_X3Ho0N1nH81', {action: 'hi'}).then(async function(token) {
			try {
				let response = await fetch('https://captchapi-hi.jimjiang.com',
				{method: 'post', body: JSON.stringify({token: token, type: 3})});
				if (response.status === 200) {
					let object = await response.json();
					load(object);
				}
				// v3 Fail, Show v2 Test
				else {
					insertCaptcha(document.querySelector('#captcha-wrap'));
				}
			}
			catch (e) {
				insertCaptcha(document.querySelector('#captcha-wrap'));
			}
		});
	});
}

window.addEventListener('load', function () {
	// JS Page loading
	jsLoad();
	// v3 Captcha (on load)
	verify3();
});