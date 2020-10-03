$(document).ready(function() {
	mobile();
	effect();
	form();
	parallax();
});

$(window).on("scroll", function(){
	form();
	parallax();
});

$(window).on("resize", function(){
	mobile();
	form();
	parallax();
});


//Mobile
var mobile = function(){
	if (window.matchMedia('(max-width: 767px)').matches) {
		$("body").addClass('mobile');
		$(".body-wrapper").removeClass('fixed');

	}else{
		$("body").removeClass('mobile');
	}
}


/*-> Parallax effect */
var parallax = function(){
  scTop =  $(window).scrollTop();
  wH = $(window).height(); 
	$(".parallax-top").each(function() {
	    $(this).css("top","0");
	    var parallaxVal = $(this).attr("data-parallax");
	    var parPosTop = $(this).offset().top;
	    var wHeightVal = parPosTop - wH 
	    var vars =  wHeightVal - scTop
	    if( wHeightVal < scTop) {
	    	$(this).css("top", vars / parallaxVal );
	    }
	    else{
	    	$(this).css("top", vars / parallaxVal );
	    }
	}); 
}

//effect JS
var effect = function(){
	wow = new WOW(
		{
			boxClass:     'eff',      // default
			animateClass: 'animated', // default
			offset:       0,          // default
			mobile:       true,       // default
			live:         true        // default
		}
	)
	wow.init();
}

//form bottom
var form = function(){
	if ($(window).scrollTop() > 0){
		$(".form-wrapper").addClass('bottom-active');
	}else{
		$(".form-wrapper").removeClass('bottom-active');
		$(".down-animate").remove();
	}
	if (window.matchMedia('(max-width: 1500px)').matches) {
		$(".form-wrapper").addClass('bottom-active');
	}
}
