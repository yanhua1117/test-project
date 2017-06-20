var list = [
	{
		src:"img/1.jpg",
		width:640,
		height:360
	},
	{
		src:"img/2.jpg",
		width:640,
		height:360
	},
	{
		src:"img/3.jpg",
		width:640,
		height:360
	},
	{
		src:"img/4.jpg",
		width:640,
		height:360
	},
	{
		src:"img/5.jpg",
		width:428,
		height:600
	}
];
(function($){
	var Slider = function(opt){
		this.dom = opt.dom;
		this.list = opt.list;
		
		this.init();
		this.createHtml();
		this.initEvent();
	}
	
	Slider.prototype = {
		init:function(){
			this.index = 0;
			this.width = window.innerWidth;
			this.scale = window.innerHeight/window.innerWidth;
		},
		createHtml:function(){
			var me = this;
			var dom = this.dom;
			var list = this.list;
			var width = this.width;
			var html = "<ul>";
			for (var i=0;i<list.length;i++) {
				html += '<li style="'+me.trans_str( i*width,0 )+'">';
				var item = list[i];
				
				if( item.height/item.width > this.scale ){
					html += '<img src="'+item.src+'" height="'+window.innerHeight+'" />';
				}else{
					html += '<img src="'+item.src+'" width="'+width+'" />';
				}
				html += "</li>";
			}
			html += "</ul>";
			dom.append(html);
			this.outer = dom.children("ul");
		},
		initEvent:function(){
			var me = this;
			var width = this.width;
			var len = this.list.length;
			var outer = this.outer;
			var boundary = Math.round( me.width/6 );
			var list = outer.find("li");
			
			function start(e){
				//var e = e.originalEvent;
				me.startX = e.touches[0].pageX;
				me.offsetX = 0;
				list.removeClass("tran_3").addClass("tran0");
			}
			function move(e){
				//var e = e.originalEvent;
				e.preventDefault();
				var offsetX = me.offsetX = e.touches[0].pageX - me.startX;
				if( me.index == 0 ){
					if( offsetX > 0 ){
						list.eq(0).css(me.trans_(offsetX/3,0));
					}else{
						list.eq(me.index).css( me.trans_(offsetX,0) );
						list.eq(me.index+1).css( me.trans_(width+offsetX,0) );
					}
				}else if( me.index == me.list.length-1 ){
					if( offsetX < 0 ){
						list.eq(me.index).css(me.trans_(offsetX/3,0));
					}else{
						list.eq(me.index-1).css( me.trans_(offsetX-width,0) );
						list.eq(me.index).css( me.trans_(offsetX,0) );
					}
				}else{
					if( offsetX > 0 ){
						list.eq(me.index-1).css( me.trans_(offsetX-width,0) );
						list.eq(me.index).css( me.trans_(offsetX,0) );
					}else{
						list.eq(me.index).css( me.trans_(offsetX,0) );
						list.eq(me.index+1).css( me.trans_(offsetX+width,0) );
					}
				}
			}
			function end(e){
				//var e = e.originalEvent;
				var offsetX = me.offsetX;
				list.removeClass("tran0").addClass("tran_3");
				//list.css("-webkit-transition","all .3s");
				e.preventDefault();
				if( me.index == 0 ){
					if( offsetX > 0){
						list.eq(0).css(me.trans_(0,0));
					}else{
						if( offsetX < -boundary ){
							list.eq(me.index).css(me.trans_(-width,0));
							list.eq(me.index+1).css(me.trans_(0,0));
							me.index++;
						}else{
							list.eq(me.index).css(me.trans_(0,0));
							list.eq(me.index+1).css(me.trans_(width,0));
						}
					}
				}else if( me.index == me.list.length-1 ){
					if( offsetX < 0 ){
						list.eq(me.index).css(me.trans_(0,0));
					}else{
						if( offsetX > boundary ){
							list.eq(me.index).css(me.trans_(width,0));
							list.eq(me.index-1).css(me.trans_(0,0));
							me.index--;
						}else{
							list.eq(me.index).css(me.trans_(0,0));
							list.eq(me.index-1).css(me.trans_(-width,0));
						}
					}
				}else{
					if( offsetX > 0 ){
						if( offsetX > boundary ){
							list.eq(me.index-1).css(me.trans_(0,0));
							list.eq(me.index).css(me.trans_(width,0));
							me.index--;
						}else{
							list.eq(me.index-1).css(me.trans_(-width,0));
							list.eq(me.index).css(me.trans_(0,0));
						}
						
					}else{
						if( offsetX < -boundary ){
							list.eq(me.index).css(me.trans_(-width,0));
							list.eq(me.index+1).css(me.trans_(0,0));
							me.index++;
						}else{
							list.eq(me.index).css(me.trans_(0,0));
							list.eq(me.index+1).css(me.trans_(width,0));
						}
					}
				}
			}
			outer.get(0).addEventListener("touchstart",start);
			outer.get(0).addEventListener("touchmove",move);
			outer.get(0).addEventListener("touchend",end);

		},
		trans_ : function( x,y ){
			var str = 'translate('+x+'px,'+y+'px)';
			return {
				"-webkit-transform" : str,
				"-moz-transform" : str,
				"-ms-transform" : str,
				"-o-transform" : str,
				"transform" : str
			};
		},
		trans_str : function( x,y ){
			var str = 'translate('+x+'px,'+y+'px)';
			return "-webkit-transform : " + str +
				";-moz-transform : " + str +
				";-ms-transform : " + str +
				";-o-transform : " + str +
				";transform : " + str;
			;
		}
	}
	
	window["Slider"] = Slider;
})($)
var slider = new Slider({
	dom : $("#wrap"),
	list : list
});
