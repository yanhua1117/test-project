window.onload = function (){
	var btn = document.getElementById('setStyle');
	var show = document.getElementById('show');
	var set_green = document.getElementById('green');
	var set_yellow = document.getElementById('yellow');
	var set_blue = document.getElementById('blue');
	var box = document.getElementById('box');
	var set_wTwo = document.getElementById('w_two');
	var set_wThree = document.getElementById('w_three');
	var set_wFour = document.getElementById('w_four');
	var set_hTwo = document.getElementById('h_two');
	var set_hThree = document.getElementById('h_three');
	var set_hFour = document.getElementById('h_four');
	var determine = document.getElementById('determine');
	var reset = document.getElementById('reset');
	var all_btn = document.getElementsByTagName('input');
	for(var i=0;i<all_btn.length;i++){
		var obj = all_btn[i];
		obj.onmouseover = function (){
			this.style.borderColor = '#000';
		}
		obj.onmouseout = function (){
			this.style.border = 'none';
		}
	}
	
	//设置按钮点击事件
	btn.onclick = function (){
		show.style.display = 'block';	
	}
	
	//设置背景样式
	set_green.onclick = function (){
		box.style.backgroundColor = '#9cce00';
	}
	set_blue.onclick = function (){
		box.style.backgroundColor = '#5a94ef';
	}
	set_yellow.onclick = function (){
		box.style.backgroundColor = '#ffff00';
	}
	
	//设置宽度
	set_wTwo.onclick = function(){
		box.style.width = '200px';
		box.style.marginLeft = '-100px';
	}
	set_wThree.onclick = function (){
		box.style.width = '300px';
		box.style.marginLeft = '-150px';
	}
	set_wFour.onclick = function (){
		box.style.width = '400px';
		box.style.marginLeft = '-200px';
	}
	
	//设置高度
	set_hTwo.onclick = function (){
		box.style.height = '200px';
		box.style.marginTop = '-100px';
	}
	set_hThree.onclick = function (){
		box.style.height = '300px';
		box.style.marginTop = '-150px';
	}
	set_hFour.onclick = function (){
		box.style.height = '400px';
		box.style.marginTop = '-200px';
	}
	
	//确定及重置选择
	determine.onclick = function (){
		show.style.display = 'none';
	}
	reset.onclick = function (){
		box.style.height = '100px'
		box.style.width = '100px';
		box.style.marginTop = '-50px';
		box.style.marginLeft = '-50px';
		box.style.backgroundColor = '#fff';
	}
}