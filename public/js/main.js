window.onload = function(){
	// $(window).resize(function() {
	// 		var width = $(document).width();
	// 		if ( width < 1000 ) {

	// 			// var $document = $(document),
	// 			//     $element = $(".menu-button"),
	// 			//     className = ".menu-button-hidden";

	// 			// $document.scroll(function() {
	// 			//   $element.toggleClass(className, $document.scrollTop() >= 50);
	// 			// });		

	// 			// $(".menu-button").fadIn("fast").delay(1000).fadeOut("slow"); // Fades out the menu-button after 1 second
	// 			$("button.menu-button").toggleClass("button.menu-button-hidden");
	// 		}
	// });
	$(window).scroll(function() {
	    if ($(this).scrollTop() > 100) {
	        $('.menu-button').fadeIn();
	    } else {
	        $('.menu-button').fadeOut();
	    }
	});​
}

