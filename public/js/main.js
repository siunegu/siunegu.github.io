// $(function() {
// 	var isLessThan1000 = $(document).width() < 1000; // declare var for checking if document width is < 1000
// 	$(window).resize(function() {
// 		isLessThan1000 = $(document).width() < 1000; // on window resize, change isLessThan1000 to be true if < 1000
// 	}); 

// 	var menuVisible = true; // 

// 	$(document).scroll(function() { // on document scroll...
// 		if ( isLessThan1000 && $(document).scrollTop() > 50 ) { // if document width < 1000 and scroll from top 50px...
// 			if (menuVisible) { // menu
// 				$(".menu-button").fadeOut(2000);
// 			}
// 			menuVisible = false;
// 		} else {
// 			if (!menuVisible) {
// 				$(".menu-button").fadeIn(2000);
// 			}
// 			menuVisible = true;
// 		}
// 	});
// });

$(function() {
	$(window).scroll(function () {
		if ( $(window).width() < 1000 ) {
	    $('.menu-button').fadeOut('slow','ease-in-out');

	    var scrollA = $('body').scrollTop();

	    setTimeout(function(){
	        if(scrollA == $('body').scrollTop()){
	            $('.menu-button').fadeIn();
	        }
	    }, 400);

		}
	});
});
	// var isLessThan1000 = $(document).width() < 1000;
	// $(window).resize(function() {
	// 	isLessThan1000 = $(document).width() < 1000;
	// });

	// if ( isLessThan1000 ) {
	// 	$(".menu-button").fadeOut();
	// }

	// $(document).on("click", function() {
	// 	$(".menu-button").fadeIn();
	// });
	
