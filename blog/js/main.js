//$(document).ready(function() {
////	var canvas = document.getElementById("canvas");
////	var context = canvas.getContext("2d");
////	var p = Math.PI;
////	var r = 5;
////	var circle = {x:canvas.width/2,y:canvas.height/2,r:r}
//})
window.onload = function(){
	
	window.onscroll = function(){
		
		var scrollTop = document.documentElement.scrollTop 
			|| document.body.scrollTop;
//		var mainMenu = document.getElementsByClassName('menu-1')[0];
		if ( scrollTop > 0 ) {
			$('.menu-1').addClass('active');
		}else{
			$('.menu-1').removeClass('active');
		}
	}
	
	
}
