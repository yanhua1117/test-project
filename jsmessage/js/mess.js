window.onload = function (){
	//更换头像
	var oImg = document.getElementById('img');
	var arrImg = ['img/img01.jpg','img/img02.jpg'];
	var num = 0;
	oImg.onclick = function (){
//		var cut = img.src;
		num++;
		if (num=0) {
			
		} else{
			
			oImg.src = arrImg[0];
		}

	}
	//添加message
	var oBtn = document.getElementById('btn');
	var oTxt = document.getElementById('txt');
	var oMess = document.getElementById('mess');
	oBtn.onclick = function (){
		oMess.innerHTML = oImg + oTxt.value +'<br />';
		oTxt.value = '';
	}
	
}

