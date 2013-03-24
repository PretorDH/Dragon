/**
 * jQuery.Drag-On v2.3
 * @author Dark Heart aka PretorDH
 * @site dragon.deparadox.com
 * MIT license
 */

$(function () {

    $.fn.extend({
        dragOn: function (opt) {
            return jQuery.DragOn(this, opt);
        }
    });

    $.extend({
         DragOn: function (S, opt) { /* Scroll mechanics */
            
            var def = {
            	exclusion : {'input': '', 'textarea': '', 'select': '', 'object':''},
            	cursor : 'all-scroll',
            	easing : 'true'
            }
            
            function onPrevent(E) {
                var e = E || event, et = (e.target && (e.target.tagName || e.target.localName || e.target.nodeName).toLowerCase());
                return et && (et in S.opt.exclusion  || ($(e.target).attr('href') || $(e.target).parents().attr('href') && (e.stopPropagation && e.stopPropagation(), true)))
				   || (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), false);
            };

            (S = $(S)).DragOn = {
            	opt: (function (opt) {for (var b in opt) def[b]=opt[b]; return def;})(opt),
                getCurPos: function () {
                    var a, b, c, to = S.to;
                    return S.curPos = {
                        't': a = to.scrollTop(),
                        'ph': b = to.innerHeight(),
                        'maxY': b = to[0].scrollHeight - b,
                        'l': a = to.scrollLeft(),
                        'pw': b = to.innerWidth(),
                        'maxX': b = to[0].scrollWidth - b
                    }
                },
                setCurPos: function (dx, dy) {
                    var t, l, cp, ddy, ddx;
                    do {
                        cp = S.DragOn.getCurPos();
                        (cp.maxY > 0) && (Math.abs(dy) > Math.abs(dx))
							&& ((cp.maxX > 0) || (dx = 0), ddy = (cp.t - (ddy = Math.round((cp.maxY / cp.ph + 1) * dy)) < 0) ? cp.t : (cp.t - ddy > cp.maxY ? cp.t - cp.maxY : ddy))
							&& S.to.scrollTop(cp.t - ddy), (t = S.to.scrollTop() != cp.t) && (dy = 0,S.to.scroll());
                        (cp.maxX > 0) && (Math.abs(dx) > Math.abs(dy))
							&& (dy = 0, ddx = (cp.l - (ddx = Math.round((cp.maxX / cp.pw + 1) * dx)) < 0) ? cp.l : (cp.l - ddx > cp.maxX ? cp.l - cp.maxX : ddx))
							&& S.to.scrollLeft(cp.l - ddx), (l = S.to.scrollLeft() != cp.l) && (dx = 0,S.to.scroll());
                    } while ((S.to.css('overflow') == 'no-dragon'
								|| S.to[0].tagName.toLowerCase() == 'a'
								|| !(dy && t) && !(dx && l))
							&& S[0] != S.to[0]
							&& (S.to = S.to.parent()));
                },

                onWhell: function (e, delta) { //for horizontal scroll
                    var t, l, cp, E = e.originalEvent, et;

                    S.to = $((this === e.target) ? this : e.target);
                    delta = (delta || E.wheelDelta || E.wheelDeltaY || E.wheelDeltaX) >> 1;
                    delta = delta || (-(E.deltaX || E.deltaY || E.deltaZ)<<(E.deltaMode && E.deltaMode<<2)<<1);

                    do {
                        while ((S.to[0].nodeType != 1 || S.to.css('overflow') in { 'visible': '', 'no-dragon': '' }) && S[0] != S.to[0]) S.to = S.to.parent();
                        cp = S.DragOn.getCurPos();
                    } while (
					!((Math.abs((S.offset().top - S.to.offset().top) << 1 + S.innerHeight() - cp.ph) <= Math.abs(delta) << 1
					|| ((t = S.to.offset().top - S.offset().top) >= 0 && t <= S.innerHeight() - cp.ph))
						&& ((((cp.maxX > 0) && (S.to.scrollLeft(t = (t = cp.l - delta) > 0 ? (t > cp.maxX ? cp.maxX : t) : 0), S.to.scrollLeft()) != cp.l) && (e.preventDefault(), e.stopPropagation(),S.to.scroll(),1))
						|| (((cp.maxY > 0) && (S.to.scrollTop(t = (t = cp.t - delta) > 0 ? (t > cp.maxY ? cp.maxY : t) : 0), S.to.scrollTop()) != cp.t) && (e.preventDefault(), e.stopPropagation(),S.to.scroll(),1))))
					&& S[0] != S.to[0]
					&& (S.to = S.to.parent()));

                    return this;
                },
                onHold: function (e) {           
                    var et = (e.target.tagName || e.target.localName || e.target.nodeName).toLowerCase();
                    if (et in S.DragOn.opt.exclusion) return;
                    if (S.DragOn.ORE) {
                    	clearTimeout(S.moment.ORE);
                    	S.moment.ORE=null;
                    };
                  
                    (e.type == 'mousedown') && (e.preventDefault(), e.stopPropagation());
                    
                    S.moment = S.holdPos = { 'x': e.pageX, 'y': e.pageY };
                    S.moment.startTime=(b=new Date()).getTime();
                    
                    S.on({'mousemove':S.DragOn.onDragg,'mouseleave mouseup':S.DragOn.onRelease});
                    (S.too = S.to = $((this === e.target) ? this : e.target)).on('mouseup', S.DragOn.onRelease);

                    S.DragOn.noButtonHold = false;
                    (S.DragOn.SAH = S.too).on('scroll', S.DragOn.onScrollAfterHold);
                },
                onScrollAfterHold: function (e) {
                    S.DragOn.noButtonHold = true;
                    S.DragOn.SAH.off('scroll', S.DragOn.onScrollAfterHold);
                },
                onDragg: function (e) {

                    S.DragOn.SAH && (S.DragOn.SAH.off('scroll', S.DragOn.onScrollAfterHold), S.DragOn.SAH = null);
                    var x = e.pageX, y = e.pageY,
					dx = x - S.holdPos.x; dy = y - S.holdPos.y;
                    S.to = $((this === e.target) ? this : e.target);
                    
                    if (S.DragOn.noButtonHold || !(e.which + e.button)) return S.DragOn.onRelease(e);
                    e.preventDefault(); e.stopPropagation();

                    S.holdPos = { 'x': x, 'y': y };
                    S.DragOn.setCurPos(dx, dy);
                    return true;
                },
                onRelease: function (e) {
                	var B;
                	S.DragOn.opt.easing && 
                		(S.moment.vector={y:e.pageY-S.moment.y,x:e.pageX-S.moment.x},
                		 S.moment.snatch=((b=new Date()).getTime()-S.moment.startTime),
                		 S.moment.speedX=((S.moment.vector.x>0)?1:-1)*S.moment.vector.x*S.moment.vector.x/(2*S.moment.snatch),
                		 S.moment.speedY=((S.moment.vector.y>0)?1:-1)*S.moment.vector.y*S.moment.vector.y/(2*S.moment.snatch),
                		 (S.moment.snatch<350)&&(S.moment.ORE=setTimeout(S.DragOn.onReleaseEasing,10)));
                
                    if (e.type in { 'mouseup': '', 'mouseleave': '' }) (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation());
                    S.DragOn.SAH && (S.DragOn.SAH.off('scroll', S.DragOn.onScrollAfterHold), S.DragOn.SAH = null);
                    S.off({'mouseleave mouseup':S.DragOn.onRelease,'mousemove':S.DragOn.onDragg});
                    S.too && S.too.off('mouseup', S.DragOn.onRelease);
                    return true;
                },
                onReleaseEasing: function (e) {
                	var dx,dy,x;
                    S.holdPos = { 'x': S.holdPos.x+(dx=S.moment.speedX*=0.95), 'y': S.holdPos.y+(dy=S.moment.speedY*=0.95) };
                    S.to=S.too;
                    S.DragOn.setCurPos(dx, dy);
                    S.moment.ORE=(Math.abs(dy)+Math.abs(dx)>1)?setTimeout(S.DragOn.onReleaseEasing,10):null;
                }
            };

            S.css({ cursor: S.DragOn.opt.cursor }).children('a').mousedown(onPrevent).css({ cursor: 'pointer' });
            S.on({'mousewheel wheel':S.DragOn.onWhell,'mousedown':S.DragOn.onHold});

            (Info || console).log('DragOn fly...');
            return S;
        }
    });

    $('.dragon').dragOn()
});