/*
 Carousel 1.0
 Author: Hu Yicheng
 update:2013-11-13
 usage: $("selector").carousel({showCount:3,scrollCount:1});
*/

(function($){
	$.fn.carousel = function(options){
		var defaults = {showCount:4,scrollCount:1,speed:1000,auto:true,interval:3000},options = $.extend(defaults,options);
		return this.each(function(){
			var thisObj = $(this),_interval = 0;
			var carouselObj = {
				_resetHtml:function(_t,_o){
					_t.wrap("<div class='carouselWrap'><div class='carouselInner'></div></div>").css({"width":parseInt(_t.children().outerWidth())*parseInt(_t.children().length)});
					_t.children().css({"float":"left"});
					$(".carouselInner").width(parseInt(_t.children().outerWidth())*parseInt(_o.showCount)+"px").height(parseInt(_t.children().outerHeight())+"px").css({"overflow":"hidden"});
					$(".carouselWrap").append("<a href='javascript:void(0)' class='prev'>prev</a>&nbsp;<a href='javascript:void(0)' class='next'>next</a>");
				},
				_activeLeft:function(_t,_o){
					var w = parseInt(_t.children().outerWidth())*parseInt(_o.scrollCount);
					_t.stop(true,true).animate({marginLeft:-w+"px"},_o.speed,function(){
						for(var i = 0; i < parseInt(_o.scrollCount); i++){
							$(this).css({marginLeft:0}).children(":first").appendTo(_t);
						}
					});
				},
				_activeRight:function(_t,_o){
					var w = parseInt(_t.children().outerWidth())*parseInt(_o.scrollCount);
					_t.stop(true,true).animate({marginLeft:-w+"px"});
					for(var i = 0; i < parseInt(_o.scrollCount); i++){
						_t.children(":last").prependTo(_t);
					}
					_t.stop(true,true).animate({marginLeft:"0px"},_o.speed);
				},
				_auto:function(_t,_o){
					var $t = this;
					_interval = setInterval(function(){$t._activeLeft(_t,_o)},_o.interval);
					_t.hover(function(){clearInterval(_interval)},function(){_interval = setInterval(function(){$t._activeLeft(_t,_o)},_o.interval)});
					$(".prev,.next",$(".carouselWrap")).hover(function(){clearInterval(_interval)},function(){_interval = setInterval(function(){$t._activeLeft(_t,_o)},_o.interval)});
				},
				_bind:function(_t,_o){
					var $t = this;
					$(".prev").bind("click",function(){
						$t._activeLeft(_t,_o);
					});
					$(".next").bind("click",function(){
						$t._activeRight(_t,_o);
					});
				},
				init:function(obj,opt){
					if(obj.children().length > opt.showCount){
						this._resetHtml(obj,opt);
						this._bind(obj,opt);
						if(opt.auto){
							this._auto(obj,opt);
						}
					}
				}
			};
			if(options.scrollCount > options.showCount) options = $.extend(options,{scrollCount:options.showCount});
			carouselObj.init(thisObj,options)
		});
	};
})(jQuery);