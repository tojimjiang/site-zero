function load(object) {
	console.log(object);
	console.log(document.getElementById('info-div'));
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
}

async function verify2(token) {
	// v2 Captcha call
	try {
		let response = await fetch('https://captchapi-hi.jimjiang.com',
		{method: 'post', body: JSON.stringify({token: token, type: 2})});
		if (response) {
			let object = await response.json();
			load(object);
		}
		else {
			// Complete Failure, reload?
			setTimeout(Location.reload(), 1500);
		}
	}
	catch (e) {
		// Complete Failure, reload?
		setTimeout(Location.reload(), 1500);
	}
}

async function verify3() {
	// v3 Captcha call
	grecaptcha.ready(function() {
		grecaptcha.execute('6Ld7eqUUAAAAAOxWpaaN_jRYlaLU_X3Ho0N1nH81', {action: 'hi'}).then(async function(token) {
			try {
				let response = await fetch('https://jimjiang-com-captcha.appspot.com',
				{method: 'post', body: JSON.stringify({token: token, type: 3})});
				if (response) {
					let object = await response.json();
					load(object);
				}
				// v3 Fail, Show v2 Test
				else {
					document.querySelector('.hidden').style.display = 'block';
				}
			}
			catch (e) {
				document.querySelector('.hidden').style.display = 'block';
			}
		});
	});
}

window.addEventListener('load', function () {
	// v3 Captcha (on load)
	verify3();
});