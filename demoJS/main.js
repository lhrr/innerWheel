$(document).ready(function(){

	var slider = $("#btn"),                   //获得滑块；
		sliderH = slider.height(),			  //滑块高度；
		conSlider = $("#letterSlide"),        //获得内容滚动区；
		contentH = conSlider.height(),        //获得内容滚动区高度；  
		sliderTop,                            //滑块距离页面顶部距离；
		sliderBar = $(".btnScroll"),          //获得滚动条；
		arrowUp = $(".arrowUp"),              //获得上箭头；
		arrowDown = $(".arrowDown"),            //获得下箭头；
		moveDis = 0,                          //滑块移动距离；
		mouseDis = 0,                         //鼠标选中滑块后鼠标位置到滑块上顶边的距离；
		isMoving = false;                     //判断内容滚动区是否可以移动；

	// 获得滑块可移动的最大距离和内容区可滚动的最大距离
	var sliderAllowDis = sliderBar.height()-sliderH,
		conAllowDis = contentH - $(".letterScroll").height();

	console.log(parseInt(slider.css('top')));

	// 鼠标点下选中滑块事件
	slider.on('mousedown',function(e){

		var e = e || window.event;

		conSlider.addClass("clearselect");    //当鼠标点下时使内容区的文字不能被选中

		isMoving = true;
		sliderTop = slider.offset().top;
		mouseDis = e.pageY - sliderTop;
	})

	//鼠标移动事件
	$(document).on('mousemove',function(){

		var e = e || window.event;
		var dis = e.pageY - mouseDis-sliderBar.offset().top;

		if(isMoving === true){

			moving(dis);
		}

		// 移动过程中两个小箭头的样式变化。
		var position = parseInt(slider.css('top'));
		if(position === 0){
			arrowUp.css('background-image','url(demoImages/arrow2.png)');
		}else if(position === sliderAllowDis){
			arrowDown.css('background-image','url(demoImages/arrow4.png)');
		}else{
			arrowUp.css('background-image','url(demoImages/arrow1.png)');
			arrowDown.css('background-image','url(demoImages/arrow3.png)');
		}

		//移动过程中title样式改变。
		var conPosition = parseInt(conSlider.css('top'));
		if( conPosition > -863){
			items.eq(0).addClass('active').siblings().removeClass('active');
		}else if(-1956 < conPosition && conPosition < -863){
			items.eq(1).addClass('active').siblings().removeClass('active');
		}else if(-4143 < conPosition && conPosition < -1956){
			items.eq(2).addClass('active').siblings().removeClass('active');
		}else if(conPosition < -4143){
			items.eq(3).addClass('active').siblings().removeClass('active');
		}

	})

	// 鼠标松开事件
	$(document).on('mouseup',function(){

		isMoving = false;
		conSlider.removeClass("clearselect");    //当鼠标松开时使内容区的文字能被选中

	})

	function moving(dis){

		var moveY = Math.min(Math.max(0,dis),sliderAllowDis);

		// 拖动滑块移动时，把移动距离赋值给滚轮滚动距离，保证其连续性。
		wheelDis = moveY;

		//滑动比例：滑块滑动距离/滑块可移动距离=内容滑动距离/内容可移动距离
		var conMoveY = moveY*conAllowDis/sliderAllowDis;    
		conMoveY = Math.max(0,conMoveY);
		
		slider.css('top',moveY+'px');
		conSlider.css('top',-conMoveY+'px');
	}


	// 标题栏点击操作
	var items = $(".title-item");

	items.on('click',function(){

		$(this).addClass('active').siblings().removeClass('active');

		var index = $(this).index(),
			sliderPosi;

		// 点击标题内容和滑块滚动到相应的位置
		switch(index){
			case 0:
				conSlider.stop().animate({top:0},200);
				slider.stop().animate({top:0},200);
				//点击操作时同时把滑块的位置赋值给滚轮滚动距离，保证两者的连续性，下面同理。
				wheelDis = 0;
			break;
			case 1:
				conSlider.stop().animate({top:-864},200);
				sliderPosi = 864*sliderAllowDis/conAllowDis;
				slider.stop().animate({top:sliderPosi},200);
				wheelDis = sliderPosi;
			break;
			case 2:
				conSlider.stop().animate({top:-1957},200);
				sliderPosi = 1957*sliderAllowDis/conAllowDis;
				slider.stop().animate({top:sliderPosi},200);
				wheelDis = sliderPosi;
			break;
			default:
				conSlider.stop().animate({top:-4144},200);
				sliderPosi = 4144*sliderAllowDis/conAllowDis;
				slider.stop().animate({top:sliderPosi},200);
				wheelDis = sliderPosi;
		}
	})


	// 鼠标滚轮事件

	var wheelDis = 0;            //声明滚轮滚动的距离（也是滑块的滑动距离）。

	function get(id){
		return document.getElementById(id);
	}

	// 兼容监听事件
	function addEvent(el,ev,fn){

		if(el.attachEvent){
			el.attachEvent(ev,fn)
		}else{
			el.addEventListener(ev,fn,false)
		}
	}

	function mouseWheel(e){

		var e = e || window.event;
		e.preventDefault();
		var wheelStep = 2;    //滚动时每滚动一次走的距离--步长
		// 获得滚轮滚动次数
		var wheelAmp  = e.wheelDelta ? -e.wheelDelta/120 : (e.detail || 0)/3;

		//滚轮滚动距离为：
		wheelDis = wheelDis + wheelStep*wheelAmp;

		//获得滚轮滚动时页面的移动距离,并根据相应位置调整标题样式。
		var conWheelDis = wheelDis*conAllowDis/sliderAllowDis;
		if( -conWheelDis > -863){
			items.eq(0).addClass('active').siblings().removeClass('active');
		}else if(-1956 < -conWheelDis && -conWheelDis < -863){
			items.eq(1).addClass('active').siblings().removeClass('active');
		}else if(-4143 < -conWheelDis && -conWheelDis < -1956){
			items.eq(2).addClass('active').siblings().removeClass('active');
		}else if(-conWheelDis < -4143){
			items.eq(3).addClass('active').siblings().removeClass('active');
		}

		// 调用moving函数，wheelDis作为参数传入代表滑块移动的距离
		moving(wheelDis);

	}
	
	addEvent(get("letterSlide"),'mousewheel',mouseWheel);
	addEvent(get("letterSlide"),'DOMMouseScroll',mouseWheel);



	//两个箭头控制滑动
	var arrowUp = $(".arrowUp"),
		arrowDown = $(".arrowDown"),
		clickStep = 0;

	arrowUp.on('click',function(){

		//获得滑块的top属性值，每次点击该属性值减10距离并赋值给clickStep，为滑块新的top值。
		var sliderPosi = parseInt(slider.css('top'));

		clickStep = Math.max(0,sliderPosi-10);
		conClickStep = clickStep*conAllowDis/sliderAllowDis;

		wheelDis = clickStep;

		slider.stop().animate({top:clickStep},200);
		conSlider.stop().animate({top:-conClickStep},200);
	})

	arrowDown.on('click',function(){

		var sliderPosi = parseInt(slider.css('top'));

		clickStep = Math.min(sliderAllowDis,sliderPosi+10);
		conClickStep = clickStep*conAllowDis/sliderAllowDis;

		wheelDis = clickStep;

		slider.stop().animate({top:clickStep},200);
		conSlider.stop().animate({top:-conClickStep},200);
	})
	
	
})