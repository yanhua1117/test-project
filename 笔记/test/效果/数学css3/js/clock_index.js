$(document).ready(function(){

	var nav = $("nav");
	for (var i=0;i<60;i++) {
		if( i == 0 || i%5 == 0 ){
			nav.append('<a class="clock is_hour"></a>');
		}else{
			nav.append('<a class="clock"></a>');
		}
		
	}
	for (var i=0;i<12;i++) {
		var index = i;
		if( index == 0 ){
			index = 12;
		}
		nav.append('<a class="times">'+index+'</a>');
	}
	
	var navs = $("nav>.clock");
	var times = $("nav>.times")
	var r = nav.width()/2;
	var counts = navs.length;
	var startDeg = 0;
	var endDeg = 360;
	
	$.each(navs, function(index) {
	oneDeg = (endDeg-startDeg)/counts;
		var myDeg = (startDeg + oneDeg*index)*(Math.PI/180);
		var myX = r + r * Math.cos(myDeg),
			myY = r + r * Math.sin(myDeg)
		console.log(oneDeg*index);
		$(this).css({
			"transform" : "rotate("+(startDeg + oneDeg*index)+"deg) translate("+(r-$(this).width()/2)+"px)"
		})
	});
	
	var time_count = times.length;
	oneDeg = (endDeg-startDeg)/time_count;
	r = r-20;
	$.each(times, function(index) {
		index = index-3;
		var myDeg = (startDeg + oneDeg*index)*(Math.PI/180);
		var myX = r + r * Math.cos(myDeg),
			myY = r + r * Math.sin(myDeg)
		
		$(this).css({
			"left" : myX + "px",
			"top" : myY + "px"
		})
	});
	
	var hour = $(".hour");
	var minute = $(".minute");
	var second = $(".second");
	
	function rotate(){
		var now = new Date();
		var _hour = now.getHours();
		var _minute = now.getMinutes();
		var _second = now.getSeconds();
		
		var hour_rotate = _hour*30-90;
		var minute_rotate = _minute*6-90;
		var second_rotate = _second*6-90;
		hour.css("transform","rotate("+hour_rotate+"deg)");
		minute.css("transform","rotate("+minute_rotate+"deg)");
		second.css("transform","rotate("+second_rotate+"deg)");
	}
	rotate();
	setInterval(rotate,1000);

})
