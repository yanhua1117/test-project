window.onload = function(){
	var oDiv = document.getElementById('pic');
	var oImg = oDiv.getElementsByTagName('img')[0];
	var oSpan= oDiv.getElementsByTagName('span')[0];
	var oP = oDiv.getElementsByTagName('p')[0];
	var oUl = oDiv.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	
	var arrUrl = ['img/1.png','img/2.png','img/3.png','img/4.png'];
	var arrText = ['图片一','图片二','图片三','图片四'];
	var num = 0;
	var oldLi = null;
	
	for(var i=0;i<arrUrl.length;i++){
		oUl.innerHTML += '<li></li>';
	}
		oldLi = aLi[num];
	function fnTab(){
	//初始化
		oImg.src = arrUrl[num];
		oP.innerHTML = arrText[num];
		oSpan.innerHTML = 1+num+'/'+arrUrl.length;
		aLi[num].className = 'active';
		//图片文字数目切换
		for(var i=0;i<aLi.length;i++){
			aLi[i].index = i;		//索引值
			aLi[i].onclick = function(){
				num = this.index;
				oImg.src = arrUrl[num];
				oP.innerHTML = arrText[num];
				oSpan.innerHTML = 1+num+'/'+arrUrl.length;
				
				//思路一：全部清空，添加当前
	//			for(var i=0;i<aLi.length;i++){
	//				aLi[i].className = '';
	//			}
				aLi[num].className = 'active';
				//思路二：清空上个，添加当前
				oldLi.className = '';
				oldLi = aLi[num];
				aLi[num].className = 'active';
			}
		}
	}
	fnTab();
}
