$(document).ready(function(){

	// On load menufix
	var menuSize = String($("#navList").height()).concat("px");
	$("#menufix").css("margin-bottom", menuSize);


	// On Resize menufix
	$(window).resize( function() {
		var menuSize = String($("#navList").height()).concat("px");
		$("#menufix").css("margin-bottom", menuSize);

	})

	// Card Height Fix (via jQuery)

});