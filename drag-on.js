/**
 * jQuery.Drag-On v2.2.0
 * @author Dark Heart aka PretorDH
 * @site dragon.deparadox.com
 * MIT license
 */
 
$(function(){

$.fn.extend({
	dragOn : function(opt) {
		return jQuery.DragOn(this,opt);
	}
});

$.extend({
	DragOn : function (S,opt) {
		function onPrevent(E){
			var e=E||event,et=(e.target && (e.target.tagName || e.target.localName || e.target.nodeName).toLowerCase());
			return et && (et in {'input':'','textarea':'','select':''} || ($(e.target).attr('href') || $(e.target).parents().attr('href') && (e.stopPropagation && e.stopPropagation(),true) ) ) 
				   || (e.preventDefault && e.preventDefault(),e.stopPropagation && e.stopPropagation(),false);
		};
		
		(S=$(S)).DragOn = {
			getCurPos : function () {
				var a,b,c,to=S.to;
				return S.curPos = {
					't':a=to.scrollTop(),
					'ph':b=to.innerHeight(),
					'maxY':b=to[0].scrollHeight-b,
					'l':a=to.scrollLeft(),
					'pw':b=to.innerWidth(),
					'maxX':b=to[0].scrollWidth-b
					}
			},
			setCurPos : function (dx,dy) {
				var t,l,cp,ddy,ddx;
					do {cp=S.DragOn.getCurPos();
						(cp.maxY>0) && (Math.abs(dy)>Math.abs(dx))
							&& ((cp.maxX>0)||(dx=0),ddy=(cp.t-(ddy=Math.round((cp.maxY/cp.ph+1)*dy))<0)?cp.t:(cp.t-ddy>cp.maxY?cp.t-cp.maxY:ddy))
							&& S.to.scrollTop (cp.t-ddy),(t=S.to.scrollTop ()!=cp.t) && (dy=0) ;
						(cp.maxX>0) && (Math.abs(dx)>Math.abs(dy))
							&& (dy=0,ddx=(cp.l-(ddx=Math.round((cp.maxX/cp.pw+1)*dx))<0)?cp.l:(cp.l-ddx>cp.maxX?cp.l-cp.maxX:ddx)) 
							&& S.to.scrollLeft(cp.l-ddx),(l=S.to.scrollLeft()!=cp.l) && (dx=0);
					} while (( S.to.css('overflow')=='no-dragon' 
								|| S.to[0].tagName.toLowerCase()=='a'
								|| !(dy && t) && !(dx && l) )
							&& S[0]!=S.to[0] 
							&& (S.to=S.to.parent()) );
			},

			onWhell : function (e, delta) { //for horizontal scroll
				var t,l,cp,E=e.originalEvent,et;		
				
				S.to=$( (this===E.target)?this:E.target ); 
				delta=(delta || E.wheelDelta || E.wheelDeltaY || E.wheelDeltaX)>>1;

				do {
					while ( (S.to[0].nodeType!=1 || S.to.css('overflow') in {'visible':'','no-dragon':''}) && S[0]!=S.to[0]) S.to=S.to.parent();
					cp=S.DragOn.getCurPos();
				} while (
					!(( Math.abs((S.offset().top-S.to.offset().top)<<1+S.innerHeight()-cp.ph)<=Math.abs(delta)<<1 
					|| (( t=S.to.offset().top-S.offset().top )>=0 && t<=S.innerHeight()-cp.ph ) )
						&& ( (((cp.maxX>0) && (S.to.scrollLeft(t=(t=cp.l-delta)>0?(t>cp.maxX?cp.maxX:t):0),S.to.scrollLeft())!=cp.l) && (e.preventDefault(),e.stopPropagation(),1)) 
						||   (((cp.maxY>0) && (S.to.scrollTop (t=(t=cp.t-delta)>0?(t>cp.maxY?cp.maxY:t):0),S.to.scrollTop ())!=cp.t) && (e.preventDefault(),e.stopPropagation(),1))) )
					&& S[0]!=S.to[0]
					&& (S.to=S.to.parent()) );
				
				return this;
			},
			onHold : function(e) {
				var et=(e.target.tagName || e.target.localName || e.target.nodeName).toLowerCase();
				if (et in {'input':'',textarea:'','select':''}) return;
				
				(e.type=='mousedown')&&(e.preventDefault(),e.stopPropagation());
				
				S.startPos = S.holdPos = {'x':e.pageX, 'y':e.pageY};
				S.bind('mousemove',S.DragOn.onDragg).bind('mouseleave mouseup',S.DragOn.onRelease);
				( S.too=S.to=$((this===e.target)?this:e.target) ).bind('mouseup',S.DragOn.onRelease);
			},
			onDragg : function (e) {
				var x=e.pageX,y=e.pageY,
					dx=x-S.holdPos.x; dy=y-S.holdPos.y;
				S.to=$((this===e.target)?this:e.target);

				if (!(e.button+e.which)) return S.DragOn.onRelease(e);		                            //default scroll bar mouseup patch					
				
				e.preventDefault();e.stopPropagation();

				S.holdPos = {'x':x,'y':y};
				S.DragOn.setCurPos(dx,dy);
				return true;
			},
			onRelease : function (e) {
				if (e.type in {'mouseup':'','mouseleave':''})(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation());
				S.unbind('mouseleave mouseup',S.DragOn.onRelease)                   
				 .unbind('mousemove',S.DragOn.onDragg);
				S.too.unbind('mouseup',S.DragOn.onRelease);
				return true;
			}
		};
		
		S.css({cursor:'all-scroll'}).children('a').mousedown(onPrevent).css({cursor:'pointer'});
		S.bind('mousewheel',S.DragOn.onWhell)
		 .bind('mousedown',S.DragOn.onHold);	 
		 
		(Info || console).log('DragOn fly...');	
	}
});

$('.dragon').dragOn()});