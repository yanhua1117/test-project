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
	
	//当点击关闭按钮时，菜单列表显示或隐藏
	var menuIcon = document.getElementsByClassName('menu-2_icon')[0];
	var menuList = document.getElementsByClassName('menu-2_list')[0];
	var onOff=true;
	menuIcon.onclick = function(){
		if (onOff) {
			menuList.style.display = 'block';
			onOff = false;
		} else{
			menuList.style.display = 'none';
			onOff = true;
		}

	}
	
	//当点击菜单中的选项时，菜单隐藏
	var menuSm = document.getElementById('menu-item');
	var menuSm_list = menuSm.getElementsByTagName('a');
	
	for ( var i = 0; i < menuSm_list.length; i++ ) {
		
		menuSm_list[i].onclick = function(){
			
			if (!onOff) {
				onOff = true;
			}
			menuList.style.display = 'none';
			
		}
		
	}
	
	//点击联系方式按钮切换二维码
	var contactIcon = document.getElementsByClassName('personal-icon');
	var closeIcon = document.getElementById('close-icon');
	var contactImg = document.getElementById('contact-img');
//	var contact = document.getElementsByClassName('contact')[0];
	contactIcon[1].onclick = function(){
		
		$('.contact').addClass('active-contact');
		contactImg.src = 'img/wechat.jpg';
		
	}
	contactIcon[2].onclick = function(){
		
		$('.contact').addClass('active-contact');
		contactImg.src = 'img/weibo.jpg';
		
	}
	closeIcon.onclick = function(){
		
		$('.contact').removeClass('active-contact');
		
	}
	
}
