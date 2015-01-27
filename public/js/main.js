//// Make the Menu Button Disappear on scroll. 
// 1. On Document Ready, on window scroll,
// 2. If Window width is less than 1000,
// 3. add class of menu-button-hidden which sets opacity to 0,
// 4.
$(function() {
	$(window).scroll(function () {
		if ( $(window).width() < 1000 ) {
	    $('.menu-button').addClass("menu-button-hidden");

	    var scrollA = $('body').scrollTop();

	    setTimeout(function(){
	        if(scrollA == $('body').scrollTop()){
	            $('.menu-button').removeClass("menu-button-hidden");
	        }
	    }, 600);

		}
	});
});
