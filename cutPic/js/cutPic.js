window.onload = function (){
	var pre = document.getElementById('pre');
	var next = document.getElementById('next');
	var oImg = document.getElementById('img01');
	var oP1 = document.getElementById('p1');
	var oP2 = document.getElementById('p2');
	var oCutP = document.getElementById('cut_p');
	var oBtn1 = document.getElementById('btn1');
	var oBtn2 = document.getElementById('btn2');
	//图片切换
	var arr = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg'];
	var arrTxt = ['绿发美少女','USA','蝴蝶','红伞美少女'];
	var num = 0;
	//初始化
	function FnTab(){
		oP1.innerHTML = arrTxt[num];
		oP2.innerHTML = num+1+'/'+arr.length;
	}
	FnTab();
	//循环切换
	oBtn1.onclick = function (){
		oCutP.innerHTML = "图片可从最后一张跳转到第一张切换";
		
//			for(num=0;num<4;num++){
//				oImg.src = arr[num];
//			}
		
		pre.onclick = function(){
			num--;
			if( num < 0 ){
				num = arr.length-1;
			}
			oImg.src = arr[num];
		FnTab();
			
		};
		
		next.onclick = function(){
			num++;
			if( num >= arr.length ){
				num = 0;
			}
			oImg.src = arr[num];
		FnTab();
			
		}
	}
	//顺序切换
	oBtn2.onclick = function (){
		oCutP.innerHTML = '图片只能到第一张或者最后一张';
		pre.onclick = function (){
			if(num == 0){
				alert('已经是第一张了！');
			}else{
				num--;
				oImg.src = arr[num];
			}
			FnTab();
		}
		
		next.onclick = function (){
			if(num == arr.length-1){
				alert('已经是最后一张了！');
			}else{
				num++;
				oImg.src = arr[num];
			}
			FnTab();
		}
		
	}
	//默认循环切换
	oBtn1.click();
}
