window.onload = function(){
	var oBtn_left = document.getElementById('cut_left');
	var oBtn_right = document.getElementById('cut_right');
	var oBtn = document.getElementsByClassName('cut_com');
	var oImg = document.getElementById('pic');
	var oUl = document.getElementById('btn');
	var aLi = oUl.getElementsByTagName('li');
	var oSmDiv = document.getElementById('sm_show');
	var oSmImg = document.getElementById('sm_img');
	var arrPic = ['img/cake01.jpg','img/cake02.jpg','img/cake03.jpg','img/cake04.jpg','img/cake05.jpg']
	var num = 0;
	var oldLi = null;
	
	
	var timer = null;
	timer = setInterval( function(){
		num++;
		num% = arrPic.length;
		
	},1000);
	
	
	//清除上一张按钮样式并未当前添加样式
	function clearAll(){
		for(var i=0;i<aLi.length;i++){
			aLi[i].className = '';
//			aLi[i] = aLi[num];
//			oldLi.className = '';
//			oldLi = aLi[num];
			aLi[num].className = 'active';
		}	
	}
	
	
	for(var i=0;i<arrPic.length;i++){
		oUl.innerHTML += '<li></li>';
	}
	
	//初始化
	oImg.src = arrPic[num];
	aLi[num].className = 'active';
	
	
	//上下翻页按钮点击事件
	oBtn_left.onclick = function(){
		num--;
		if(num<0){
			num = arrPic.length-1;
		}
		pic.src = arrPic[num];
		clearAll();
	}
	oBtn_right.onclick = function(){
		num++;
		if(num>=arrPic.length){
			num = 0;
		}
		pic.src = arrPic[num];
		clearAll();
	}
	//上下翻页按钮鼠标移入移出事件
	for(var i=0;i<oBtn.length;i++){
		oBtn[i].onmouseover = function(){
			this.style.opacity = '0.5';
		}
		oBtn[i].onmouseout = function(){
			this.style.opacity = '1';
		}
	}
	
	
	//圆形按钮鼠标事件
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;  //索引值
		aLi[i].onclick = function (){
			num = this.index;
			oImg.src = arrPic[num];
			clearAll();
		}
		aLi[i].onmouseover = function(){
			num = this.index;
			oSmDiv.style.display = 'block';
			oSmDiv.style.left = 400+30*num+'px';
			oSmImg.src = arrPic[num];
		}
		aLi[i].onmouseout = function(){
			oSmDiv.style.display = 'none';
		}
	}
	
}
