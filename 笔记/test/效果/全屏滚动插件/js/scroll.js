(function($){
	var PageSwitch = (function(){
		function PageSwitch(){
			this.settings = {
				selectors : {
					elements : ".main",
					sections : ".sections",
					section : ".section",
					page : ".pages",
					active : ".active"
				},
				index : 0,//当前页  暂时没用。。
				easing : "ease",//动画播放方式
				duration : 500,//动画持续时间
				pagination : true,//是否分页
				loop : false,//是否自动播放
				keyboard : true,//是否支持按键控制
				dicretion : "vertical",//横屏滚动或竖屏滚动  vertical:竖屏  horizontal:横屏
				callback : ""//回调函数
			}
		}
		PageSwitch.prototype = {
			/*
			 * 说明：初始化插件
			 * 实现：初始化dom结构，布局，分页及绑定事件
			 */
			init : function(options){
				this.settings = $.extend( true,this.settings,options||{} );
				var me = this;
				
				me.selectors = me.settings.selectors;
				me.sections = me.selectors.sections;
				me.section = me.selectors.section;
				me.page = me.selectors.page;
				me.active = me.selectors.active;
				me.elements = me.selectors.elements;
				me.enableWhell = true;
				
				me.dicretion = (me.settings.dicretion == "vertical"?true:false);
				me.pageCount = me.pagesCount();
				me.index = ( me.settings.index>=0 && me.settings.index<me.pageCount )?me.settings.index:0;
				me.pagination = me.settings.pagination;
				
				if(!me.dicretion){
					me._initLayout();
				}
				if( me.pagination ){
					me._initPaging();
				}else{
					me.enableWhell = false;
				}
				me._initEvent();
			},
			/*
			 * 说明：获取滑动页面数量
			 */
			pagesCount : function(){
				return $(this.section).length;
			},
			/*
			 * 说明：获取滑动的高度（宽度）
			 */
			switchLength : function(){
				
			},
			getMouseScrollName : function(){
				return document.onmousewheel!==undefined ? "mousewheel" : "DOMMouseScroll";
			},
			/*
			 * 说明：针对横屏情况进行页面布局
			 */
			_initLayout : function(){
				var me = this;
				var width = me.pageCount*100+"%";
				var cellWidth = (100/me.pageCount).toFixed(2)+"%";
				$(me.sections).width(width);
				$(me.section).width(cellWidth);
			},
			/*
			 * 说明：实现分页的dom结构及样式
			 */
			_initPaging : function(){
				var me = this,
					pageClass = me.page.substring(1),
					activeClass = me.active.substring(1);
				var pageHtml = '';
				pageHtml += '<ul class="'+pageClass+'">';
				for (var i=0;i<me.pageCount;i++) {
					if( i == me.index ){
						pageHtml += '<li class="page_item '+activeClass+'" data-index="'+i+'"></li>';
					}else{
						pageHtml += '<li class="page_item" data-index="'+i+'"></li>';
					}
				}
				pageHtml += '</ul>';
				$(me.elements).append(pageHtml);
				
				if( me.dicretion ){
					$(me.page).addClass("vertical");
					$(".vertical").css("margin-top",-($(".vertical").height()/2) )
				}else{
					$(me.page).addClass("horizontal");
					$(".horizontal").css("margin-left",-($(".vertical").width()/2) );
					$(me.section).addClass("fl");
				}
			},
			/*
			 * 说明：初始化插件事件
			 */
			_initEvent : function(){
				var me = this;
				//点击事件
				$(me.elements).on("click",".page_item",function(){
					if( me.enableWhell ){
						me.enableWhell = false;
						var _index = $(this).attr("data-index");
						var _active = me.active.substring(1);
						$(this).parent().children().removeClass(_active);
						$(this).addClass(_active);
						if( me.dicretion ){
							$(me.sections).css({
								"transition" : "top "+me.settings.duration/1000+"s "+me.settings.easing,
								"top" : -(_index*$(me.section).height())
							})
						}else{
							$(me.sections).css({
								"transition" : "left "+me.settings.duration/1000+"s "+me.settings.easing,
								"left" : -(_index*$(me.section).width())
							})
						}
						$(me.sections).on("transitionend",function(){
							me.enableWhell = true;
						});
//						setTimeout(function(){
//							me.enableWhell = true;
//						},me.settings.duration);
					}
				})
				
				//鼠标滚动事件
				$(me.elements).on(me.getMouseScrollName(),function(ev){
					var ev = ev || window.event;
					var detail = ev.originalEvent.wheelDelta;
					var _active = me.active.substring(1);
					if( detail < 0 ){//向下滚动
						if( me.index < me.pageCount ){
							$(me.active).next(".page_item").click();
						}
					}else{
						$(me.active).prev(".page_item").click();
					}
				})
				
				//键盘按下事件
				$("body").on("keydown",function(ev){
					var ev = ev || window.event;
					if( me.dicretion ){
						if( ev.keyCode == 38 ){//上
							$(me.active).prev(".page_item").click();
						}else if( ev.keyCode == 40 ){//下
							$(me.active).next(".page_item").click();
						}
					}else{
						if( ev.keyCode == 37 ){//←左
							$(me.active).prev(".page_item").click();
						}else if( ev.keyCode == 39 ){//→右
							$(me.active).next(".page_item").click();
						}
					}
				})
			}
			
		}
		return PageSwitch;
	})()
	
	$.fn.PageSwitch = function(options){
		return this.each(function(){
			var me = $(this),
			    instance = me.data("PageSwitch");
			if( !instance ){
				instance = new PageSwitch();
				me.data("PageSwitch",instance);
			}
			instance.init(options);
		})
	}

})(jQuery)
