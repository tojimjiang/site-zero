// Using Assignment 3 as the code base (part 1)
// External js with jQuery code (part 2)
// Ready Event (part 3)
$(document).ready(function(){

	var changed = false;
	var fonted = false;

	// Accessing Element (part 4) to change style (part 6)
	$("nav").hover( function(){
		// Update the element's CSS and flash them
		$(".subNav, #egg, #egg2, #egg3, #egg4, #egg5").css("display", "inline-block");
		$(".subNav, #egg, #egg2, #egg3, #egg4, #egg5").velocity("callout.flash", {stagger: 15}, 750);
	});

	$("nav").mouseleave( function() {
		$(".subNav, #egg, #egg2, #egg3, #egg4, #egg5").css("display", "none").velocity("stop", true);
	});


	// Accessing Element to Update Content (part 5) and CSS of the site
	$("#welcome").click( function() {
		if (changed) {
			// Change back to original message
			$("#welcome").html("Welcome to my Portfolio!");
			// Change back to original colors (font/background)
			$("html").css("color","#000")
			$("html").css("background","#dfdfdf")
			changed = false;
		}
		else {

			// Change to the changed message
			$("#welcome").html("Wow So Color Change");
			// Change to the changed colors (font/background)
			$("html").css("color","#dfdfdf")
			$("html").css("background","#555")
			changed = true;
		}
	});

	// Easter Egg 1
	// Accessing Element to Update Content and CSS of the site
	$("#egg").click( function() {
		$("#egg").html("Wow Font Change");
		if (fonted) {
			// Change back to original message
			$("html").css("font-family", "\"Roboto\", sans-serif");
			fonted = false;
		}
		else {
			// Change the font
			$("html").css("font-family", "\"Comic Sans MS\", cursive, sans-serif");
			fonted = true;
		}
	});

	// Easter Egg 2
	// Use velocity flashing (part 8)
	$("#egg2").click( function() {
		$("#egg2").html("Flasher");
		$("#egg2").velocity("callout.flash").velocity("callout.flash").velocity("callout.flash");
	});

	// Easter Egg 3
	// Use velocity to shrink/grow 4x (part 8)
	$("#egg3").click( function() {
		$("#egg3").html("Shrinker");
		alert("Shrinker doesn't play nice with Grower!")
		var egg3width = $("#egg3").width()
		$("#egg3").velocity({width:0}, {loop: 4}).velocity({width:egg3width});
	});

	// Easter Egg 4
	// Use velocity to grow/shrink 3x (part 8)
	$("#egg4").click( function() {
		$("#egg4").html("Grower");
		alert("Grower doesn't play nice with Shrinker!")
		var egg4width = $("#egg3").width()
		var egg4grow = egg4width*1.3
		$("#egg4").velocity({width:egg4grow}, {loop: 3}).velocity({width:egg4width});
	});

	// Easter Egg 5
	// Use jQuery for animation effect (part 7)
	$("#egg5").click( function() {
		$("#egg5").html("Enlargener");
		$("#egg5").animate({fontSize: '3em'}, "slow");;
		$("#egg5").animate({fontSize: '1em'}, "fast");;
	});

	// Velocity shaker for images (part 8)
	$(".shaker").hover( function() {
		$(this).velocity("callout.shake");
	});

});