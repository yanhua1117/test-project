// 翻面控制
function turn(obj){
	var cla = obj.className;
	if( /photo_front/.test(cla) ){
		cla = cla.replace(/photo_front/,"photo_back");
	}else{
		cla = cla.replace(/photo_back/,"photo_front");
	}
	return obj.className = cla;
}
function getEle(selector){
	var method = selector.substr(0,1) == '.' ? 'getElementsByClassName' : 'getElementById';
	return document[method](selector.substr(1));
}

function random( range ){
	var max = Math.max( range[0] , range[1] );
	var min = Math.min( range[0] , range[1] );
	
	var diff = max-min;
	var random = Math.ceil( Math.random()*diff + min );
	return random;
}

// 输出所有海报
var data = data;
(function(){
	var str = "Here he comes Here comes Speed Racer. He's a demon on wheels. Wouldn't you like to get away? "+
	"Sometimes you want to go where everybody knows";
	var temp = getEle("#wrap").innerHTML;
	var html = [];
	var page_items = [];
	for (var i = 0;i < data.length;i++) {
		var obj = data[i];
		var _html = temp
						.replace('{{index}}',(i+1))
						.replace('{{img}}',obj.img)
						.replace('{{caption}}',obj.caption)
						.replace('{{desc}}',str);
		html.push( _html );
		page_items.push('<li class="page_item" data-index="'+(i+1)+'"></li>');
	}
	html.push('<ul class="pages horizontal">'+page_items.join("")+'</ul>');
	getEle("#wrap").innerHTML = html.join("");
	var pages = getEle(".pages");
	pages[0].style.marginLeft = -(pages[0].clientWidth)/2 + "px";
	rsort( random([1,20]) );
})()

function range(){
	var range = { left : { x : [], y : [] },right : { x : [], y : [] } };
	
	var wrap = {
		w : getEle("#wrap").clientWidth,
		h : getEle("#wrap").clientHeight
	}
	var photo = {
		w : getEle(".photo")[0].clientWidth,
		h : getEle(".photo")[0].clientHeight
	}
	range.wrap = wrap;
	range.photo = photo;
	
	range.left.x = [ 0,Math.floor(wrap.w/2-photo.w-photo.w/4) ];
	range.left.y = [ 0,wrap.h-photo.h/2 ];
	
	range.right.x = [ Math.ceil(wrap.w/2+photo.w/2+50),wrap.w ];
	range.right.y = [ 0,wrap.h-photo.h/2 ];
	
	return range;
}
// 排序海报
function rsort(n){
	var photos = getEle('.photo');
	var photoarr = [];
	for (var i=0;i<photos.length;i++) {
		var photo = photos[i];
		photo.className = photo.className.replace(/\s*photo_center\s*/,"");
		photoarr.push(photo);
	}
	
	var ele = getEle("#photo_"+n);
	ele.className += ' photo_center ';
	$(".pages>li[data-index="+n+"]").addClass("active");
	// 刪除当前中间的图片
	ele = photoarr.splice(n-1,1)[0];
	// 把海报分左、右两个区域
	photo_left = photoarr.splice(0,Math.ceil( photoarr.length/2 ));
	photo_right = photoarr;
	
	var ranges = range();
	for (var i=0;i<photo_left.length;i++) {
		var photo = photo_left[i];
		photo.style.left = random( ranges.left.x )+"px";
		photo.style.top = random( ranges.left.y )+"px";
		
		photo.style['-webkit-transform'] = 'rotate('+random([-100,100])+'deg)'
	}
	for (var i=0;i<photo_right.length;i++) {
		var photo = photo_right[i];
		photo.style.left = random( ranges.right.x )+"px";
		photo.style.top = random( ranges.right.y )+"px";
		
		photo.style['-webkit-transform'] = 'rotate('+random([-100,100])+'deg)'
	}
}

$(document).ready(function(){
	$(".wrap").on("click",".pages>li",function(){
		var _this = $(this);
		var index = _this.attr('data-index');
		if( _this.hasClass("active") ){
			turn( $("#photo_"+index).get(0) );
		}else{
			$(".pages>li").removeClass("active");
			_this.addClass("active");
			var index = index;
			rsort(index);
		}
	})
	
	$(".photo_center").on("click",function(){
		turn( $(this).get(0) );
	})
	
	$(".photo").css("-webkit-transition","all .6s ease-out");
	$(".photo-wrap").css("-webkit-transition","all .8s");
})
