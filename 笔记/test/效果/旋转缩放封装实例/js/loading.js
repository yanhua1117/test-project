(function(win) {
	document.addEventListener('touchstart', function(e) {
		e.preventDefault();
	}, {
		passive: false
	});
	/*
	option = {
		el : el,//元素
		start : start,//fn 多指开始
		change : change,//fn 开始滑动
		end : end //滑动结束
	}
	 */
	function Gesture(option) {
		this.el = option.el;
		this.start = option.start;
		this.change = option.change;
		this.end = option.end;
		this.isGesture = false; //是否触发了多指操作
		this.startPoint = []; //存放开始时手指坐标
		this.nowPoint = []; //存放滑动时手指坐标
		this.startScale = 0;
		this.startRotate = 0;
		this.maxScale = option.maxScale || 2;
		this.minScale = option.minScale || 0.5;
		if(!this.el) {
			return;
		}
		this.initEvent();
	}
	Gesture.prototype = {
		initEvent: function() {
			var this_ = this;
			var el = this_.el;
			el.addEventListener("touchstart", function(e) {
				if(e.touches.length >= 2) {
					this_.startPoint[0] = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					}
					this_.startPoint[1] = {
						x: e.touches[1].pageX,
						y: e.touches[1].pageY
					}

					this_.startScale = css(el, "scale");
					this_.startRotate = css(el, "rotate");

					this_.isGesture = true; //记录触发了gesture
					this_.start && this_.start.call(el, e);
				}
			});
			el.addEventListener("touchmove", function(e) {
				if(this_.isGesture && e.touches.length >= 2) {
					//e.scale
					this_.nowPoint[0] = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					}
					this_.nowPoint[1] = {
						x: e.touches[1].pageX,
						y: e.touches[1].pageY
					}
					var startDis = this_.getDis(this_.startPoint[0], this_.startPoint[1]);
					var nowDis = this_.getDis(this_.nowPoint[0], this_.nowPoint[1]);
					var startDeg = this_.getDeg(this_.startPoint[0], this_.startPoint[1]);
					var nowDeg = this_.getDeg(this_.nowPoint[0], this_.nowPoint[1]);
					e.scale = nowDis / startDis;
					e.rotation = nowDis - startDeg;
					this_.change && this_.change.call(el, e, this_.startScale
						, this_.startRotate,this_.maxScale,this_.minScale);
				}
			});
			el.addEventListener("touchend", function(e) {
				if(this_.isGesture && e.touches.length < 2) {
					this_.isGesture = false;
					this_.end && this_.end.call(el, e);
				}
			});
		},
		// Math.atan2(y,x) 斜率 由一条直线与X轴正方向所成角的正切 返回值弧度
		// 角度转弧度: deg*Math.PI/180
		// 弧度转角度: rad*180/Math.PI
		getDis: function(point1, point2) {
			var x = point1.x - point2.x;
			var y = point1.y - point2.y;
			return Math.sqrt(x * x + y * y);
		},
		getDeg: function(point1, point2) {
			var x = point1.x - point2.x;
			var y = point1.y - point2.y;
			return Math.atan2(y, x) * 180 / Math.PI;
		}
	}

	if(win && typeof win != undefined) {
		win.Gesture = Gesture;
	}
})(window)