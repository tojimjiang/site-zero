// Printing Button Event
window.addEventListener('load', function () {
	document.getElementById("resume-print-button").addEventListener(
		"click", function() {
			printJS({ printable: 'resume-print', type: 'html', showModal: true, css:'assets/css/resume.css'})
		}, false
	)
}, false);