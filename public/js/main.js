//// Make the Menu Button Disappear on scroll. 
// On Document Ready, on window scroll
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
