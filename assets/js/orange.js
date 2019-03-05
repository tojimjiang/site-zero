function loadJquery(callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js";
    document.getElementsByTagName("head")[0].appendChild(script);

    script.onload = function () {
        console.log('jquery loaded');
        callback();
    };
}




// Append HTML and CSS via Jquery for element wide filtering
function append() {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = '\
        <svg height="0" xmlns="http://www.w3.org/2000/svg">\
		<filter id = "orange">\
			<feColorMatrix\
				type="matrix"\
				values="\
				1 0 0 0 0\
				0 0.57 0 0 0\
				0 0 0.16 0 0\
				0 0 0 1 0 "/>\
		</filter>\
    </svg>\
';
    document.body.appendChild(wrapper);
    console.log("appended");
    $("html").css("filter", "url(#orange)")
    $("html").css("backdrop-filter", "url(#orange)")
    console.log("js added");
    backgroundShift();
    console.log("background shifted");
}

// Shift background using jquery and css and some math.
// Shifts 6000K white to near 2700K white
function backgroundShift() {
    var color = $("html").css("background-color");
    var unset = false;
    console.log(color);

    if (color === "rgba(0, 0, 0, 0)") {
        // Undeclared or was set to black with 0 alpha
        unset = true;
    }

    // String cleaning for array parsing
    color = color.replace(/\s+/g, '');
    color = color.replace('rgb', '');
    color = color.replace(')', '');
    color = color.replace('a', '');
    color = color.replace('(', '');
    let array = color.split(",");
    console.log(array);
    console.log($('html').color);

    // For cases when background was not set
    if (unset) {
        for (let i = 0; i < 3; i++) {
            if (array[i] < 1) {
                array[i] = 255;
            }
        }
    }
    console.log(array);
    array[1] = Math.floor(array[1] * 0.72);
    array[2] = Math.floor(array[2] * 0.23);
    console.log(array);

    // Convert values back to hex values
    // to pass back into CSS
    let hexString = "#";
    for (let i = 0; i < 3; i++) {
        hexPart = array[i].toString(16)
        if (hexPart.length % 2) {
            hexPart = '0' + hexPart;
        }
        hexString = hexString + hexPart;
    }
    console.log(hexString);
    $('html').css("background-color", hexString);
}

function load() {
    loadJquery(append);
}

load();
//browser.browserAction.onClicked.addListener(load);
