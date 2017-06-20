$(document).ready(function(){
	$(".click_me").on("click",function(){
		var nav = $("nav");
		var navs = $("nav>a");
		if( !nav.hasClass("active") ){
			var r = nav.width()/2;
			var counts = navs.length;
			var startDeg = 0;
			var endDeg = 360;
			 
			oneDeg = (endDeg-startDeg)/counts;
			$.each(navs, function(index) {
				var myDeg = (startDeg + oneDeg*index)*(Math.PI/180);
				var myX = r + r * Math.cos(myDeg),
					myY = r + r * Math.sin(myDeg)
				
				$(this).css({
					"left" : myX + "px",
					"top" : myY + "px"
				})
			});
			nav.toggleClass("active");
		}
	})
})
