/**
 * jQuery.Drag-On v2.8.2
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
            	exclusion : {'input': '', 'textarea': '', 'select': '', 'object':'' , 'iframe':'', 'details':'', 'id':'#gmap,#map-canvas,.button,[data-overflow=no-dragon],a > :not(img)'},
            	cursor : 'all-scroll',
            	holdEvents : 'mousedown.dragon touchstart.dragon',
            	draggEvents : 'mousemove.dragon touchmove.dragon',
            	releaseEvents : 'mouseup.dragon touchend.dragon',
            	wheelEvents : 'mousewheel.dragon wheel.dragon',
            	leaveEvents : 'mouseleave.dragon touchleave.dragon touchcancel.dragon',
            	easing : 'true'
            },_this;
            
            function onPrevent(E) {
                var e = E || event, et = (e && e.target && (e.target.tagName || e.target.localName || e.target.nodeName).toLowerCase());
                return e && et && (et in _this.opt.exclusion || (e.target.href || $(e.target).parents().attr('href') && (e.stopPropagation && e.stopPropagation(), true)))
				   || (e && e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), false);
            };

			S = $(S);
            _this = {
            	opt: (function (opt) {for (var b in opt) def[b]=opt[b]; return def;})(opt),
            	set option(o) {
            		for (var b in o) 
            			_this.opt[b]=o[b];
            		if (o && !_this.on) _this.toggle().toggle();
            		return _this.opt;
            	},
            	get option() {
            		return _this.opt
            	},
            	moment: {},
            	bypass : false,
            	mx: 1,
            	my: 1,
            	on:true,
            	round: function(v) {return (v+(v>0?.5:-.5))<<1>>1},
            	abs: function(v) {return v>0?v:-v},
            	toggle: function(e) {
            		var o = _this.opt;
            		if (_this.on) {
			            S.css({ cursor: o.cursor }).on(o.holdEvents,'a',onPrevent).find('a').css({ cursor: 'pointer'});
			            S.on(o.wheelEvents,_this.onWhell).on(o.holdEvents,_this.onHold);
			            $('body').on({'keydown.dragon':_this.onKeyDown,'keyup.dragon':_this.onKeyDown});
			            (("Info" in window) && Info || console).log('DragOn fly...');
			        } else {
			            S.css({ cursor: '' }).off(o.holdEvents,'**',onPrevent).find('a').css({ cursor: '' });
			            S.off(o.wheelEvents,_this.onWhell).off(o.holdEvents,_this.onHold);
			            $('body').off({'keydown.dragon':_this.onKeyDown,'keyup.dragon':_this.onKeyDown});
			            (("Info" in window) && Info || console).log('DragOn landed...');
			        }
			        _this.on=!_this.on;
			        if (e!=null) S.trigger('BarOn.toggle');
			        return _this;
            	},
                getCurPos: function () {
                    var b, to = S.to;
                    return S.curPos = {
                        't': to[0].scrollTop,
                        'ph': b = to.innerHeight(),
                        'maxY': to[0].scrollHeight - b,
                        'l': to[0].scrollLeft,
                        'pw': b = to.innerWidth(),
                        'maxX': to[0].scrollWidth - b
                    }
                },
                setCurPos: function (dx, dy) {
                    var t, l, cp=S.to, ddy, ddx, w=_this.mx<0 || _this.my<0;
                    
                    while (S.to=_this.scrollParent(S.to, w)) {
                        cp = _this.getCurPos();
                        (cp.maxY > 0) && ((dy>0?dy:-dy) > (dx>0?dx:-dx))
							&& ((cp.maxX > 0) || (dx = 0), ddy = (cp.t - (ddy = _this.round((cp.maxY / cp.ph + 1) * dy)) < 0) ? cp.t : (cp.t - ddy > cp.maxY ? cp.t - cp.maxY : ddy))
							&& ( S.to[0].scrollTop = cp.t - ddy,true ) && ( (t = S.to[0].scrollTop != cp.t) && (dy = 0, S.to.trigger('scroll')) ); 
                        (cp.maxX > 0) && ((dx>0?dx:-dx) > (dy>0?dy:-dy))
							&& ( dy = 0, ddx = (cp.l - (ddx = _this.round((cp.maxX / cp.pw + 1) * dx)) < 0) ? cp.l : (cp.l - ddx > cp.maxX ? cp.l - cp.maxX : ddx) )
							&& ( S.to[0].scrollLeft = cp.l - ddx,true) && ( (l = S.to[0].scrollLeft != cp.l) && (dx = 0,S.to.trigger('scroll')) );
						if ((dy && t) || (dx && l) || S[0]==S.to[0]) return;
						S.to=S.to.parent();
                    };
                },
                scrollParent : function(Sto,w) {
					while (Sto && Sto[0] && S[0]!=Sto[0] && ((Sto[0].nodeType != 1 || Sto.css('overflow')=='visible') || Sto[0].tagName.toLowerCase() == 'a' || (!w && Sto.data('overflow')=='no-dragon')) ) Sto=Sto.parent();
					return Sto;
                },
				isInBestPosition : function(Sto,Stoo,cp) {
					var t = Sto.offset(),
                        p = Stoo.offset(),
                    	h = Stoo.innerHeight()-cp.ph,
                        w = Stoo.innerWidth()-cp.pw;
                        
                    if (Stoo[0]==document.body || Stoo[0]==$('html')[0] && Stoo[0]!==Sto[0]) {
                    	t.top = t.top -Stoo[0].scrollTop;
                    	t.left= t.left-Stoo[0].scrollLeft;
                    };
                            
                    return p.top+(h<0?0:h) >= t.top && p.top+(h>0?0:h) <= t.top &&
                           p.left+(w<0?0:w) >= t.left && p.left+(w>0?0:w) <= t.left || Sto.css('position')=='fixed';
				},
                onWhell: function (e, delta) { 
                	if (_this.bypass) return (_this.bypass=false,true);

                    _this.moment={};
                    var SSto,cp,st,sl,t,l,ph,pw,et,ad
                    
                    	E = e.originalEvent;     
					_this.mx = 1; _this.my = 1;
                    S.to = $((this === e.target) ? this : e.target);

                    delta = _this.round(delta || (E.wheelDelta || E.wheelDeltaY || E.wheelDeltaX ) >> 1 || (-(E.deltaX || E.deltaY || E.deltaZ)<<(E.deltaMode && E.deltaMode<<2)<<1));
                    ad=_this.abs(delta>>1);

                    do {
	                    S.to = _this.scrollParent(S.to,1);
                        S.too=(SSto = S.to[0]!=S[0])?_this.scrollParent(S.to.parent(),1):S;
						cp = _this.getCurPos();

						if (_this.isInBestPosition(S.to,S.too,cp)) {
							if ( cp.maxY > 0) {
	                        	S.to.scrollTop ( (t = cp.t - delta) < 0 ? 0 : (t > cp.maxY ? cp.maxY : t) );
                        		if ( S.to.scrollTop()!=cp.t) (e.preventDefault(),e.stopPropagation(),S.to.trigger('scroll',[false,false]),delta=0);
                        	};
	                        if (delta && cp.maxX > 0) {
                        		S.to.scrollLeft( (t = cp.l - delta) > 0 ? (t > cp.maxX ? cp.maxX : t) : 0);
                        		if ( S.to.scrollLeft()!=cp.l ) (e.preventDefault(),e.stopPropagation(),S.to.trigger('scroll',[true,true]),delta=0);
                        	};
                        };
                    } while (delta && SSto && (S.to=S.to.parent()) );
                    return this;
                },
                onHold: function (e) {        
                    _this.moment={};
                    var o=_this.opt,b,et = (e.target.tagName || e.target.localName || e.target.nodeName).toLowerCase(),
						E=e.type.indexOf('touch')+1?e.originalEvent.touches[0]:e;
                    if (et in o.exclusion) return;
                  
                    S.too = S.to = $((this === e.target) ? this : e.target);
                    _this.mx=S.to.hasClass('bBarOn')?-1:1;
                    _this.my=S.to.hasClass('rBarOn')?-1:1;
                    if ( _this.mx+_this.my>0 && S.too.closest(o.exclusion.id).length ) return;
                    
                    ('mousedown'.indexOf(e.type)+1) && (e.preventDefault(), e.stopPropagation());
					
					_this.moment = S.holdPos = { 'x': E.screenX, 'y': E.screenY };
					_this.moment.startTime=+new Date();
                    S.on(o.draggEvents,_this.onDragg).on(o.releaseEvents+' '+o.leaveEvents,_this.onRelease).on(o.releaseEvents, S.too, _this.onRelease);

                    _this.noButtonHold = false;
                    _this.SAH && _this.SAH.off('scroll.dragon', _this.onScrollAfterHold);
                    (_this.SAH = S.too).on('scroll.dragon', _this.onScrollAfterHold);
                },
                onScrollAfterHold: function (e) {
                	_this.moment = {};
                    _this.noButtonHold = true;
                    _this.SAH.off('scroll.dragon', _this.onScrollAfterHold);
                },
                onDragg: function (e) {
                    _this.SAH && (_this.SAH.off('scroll.dragon', _this.onScrollAfterHold), _this.SAH = null);
                    var	E=e.type.indexOf('touch')+1?e.originalEvent[e.originalEvent.touches.length?'touches':'changedTouches'][0]:e;

                    if (!(e.originalEvent.touches || e.originalEvent.changedTouches) && _this.noButtonHold && !(e.which + e.button)) return _this.onRelease(e);
                    e.preventDefault(); e.stopPropagation();

                    var x = E.screenX, 
                    	y = E.screenY,
						dx = x - S.holdPos.x, 
						dy = y - S.holdPos.y;
                    S.to = $(this===e.target?this:e.target);            
                    S.holdPos = { 'x': x, 'y': y };
                    
                    _this.setCurPos(dx*_this.mx, dy*_this.my);
                },
                onRelease: function (e) {
                	var sm=_this.moment,
                		o=_this.opt,
                		E=e.type.indexOf('touch')+1?e.originalEvent[e.originalEvent.touches.length?'touches':'changedTouches'][0]:e;
                	if (sm && o.easing) {
                		sm.vector={y:E.screenY-sm.y,x:E.screenX-sm.x};
                		sm.snatch=(+new Date()-sm.startTime);
                		sm.speedX=_this.mx*((sm.vector.x>0)?1:-1)*sm.vector.x*sm.vector.x/(sm.snatch<<1);
                		sm.speedY=_this.my*((sm.vector.y>0)?1:-1)*sm.vector.y*sm.vector.y/(sm.snatch<<1);
                		if (sm.snatch<350) sm.ORE=setTimeout(_this.onReleaseEasing,10);
                	} else _this.moment=null;
                
                    if ('mouseup mouseleave'.indexOf(e.type)+1) (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation());
                    _this.SAH && (_this.SAH.off('scroll.dragon', _this.onScrollAfterHold), _this.SAH = null);
                    S.off(o.draggEvents,_this.onDragg).off(o.releaseEvents+' '+o.leaveEvents,_this.onRelease).off(o.releaseEvents, '**', _this.onRelease);
                    return _this;
                },
                onReleaseEasing: function (e) {
                	var sm=_this.moment;
                	if (!sm) return;
                	
                    S.to=S.too;
                    _this.setCurPos(sm.speedX*=0.98, sm.speedY*=0.98);  
                    sm.ORE=((sm.speedX+sm.speedX)<<1>>1||(sm.speedY+sm.speedY)<<1>>1)?setTimeout(_this.onReleaseEasing,10):null;
                },
                onKeyDown: function (e) {
                	var	so,to,too,ek=e.which,sm=_this.moment||{},wh=$(window).innerHeight(),sy;
               		               		
                	sm.speedX = (ek in {37:0,100:0}?2:(ek in {39:0,102:0}?-2:0 ) );
                	sm.speedY = (ek in {38:0,104:0}?1:(ek in {40:0,98:0}?-1:(ek in {33:0,105:0}? (so=Math.sqrt(Math.sqrt(wh)))*Math.sqrt(so/3)-4 :(ek in {34:0,99:0}? -(so=Math.sqrt(Math.sqrt(wh)))*Math.sqrt(so/3)+4 :(ek in {35:0,97:0}?-88:(ek in {36:0,103:0}?88:0) ) ) ) ) );
                	if (!(sm.speedX||sm.speedY) || (sy=_this.abs(sm.speedY))>15 && e.type=='keydown' || sy<15 && e.type=='keyup') return;                	

					if (sm.key!=ek) {
	                	sm.key=ek;
	                	to = too = $(S);
						while (to.length && 
							    !( sm.speedY && ( to[0].scrollHeight-to.innerHeight()>2
									&& (so=to.offset()).left<=(ek=$(window).innerWidth ()-to.innerWidth()) 
									&& (so.left>=0 || ek<0 && so.left>=ek) )
								|| sm.speedX && ( to[0].scrollWidth -to.innerWidth() >2 
									&& (so=to.offset()).top <=(ek=wh-to.innerHeight()) 
									&& (so.top >=0 || ek<0 && so.top >=ek) )
								)) 
							(to=to.slice(1)).length || (to=too=too.children());
	                	S.too = to.eq(0) || S.too;
                	};                	
                	             	               	
					_this.onReleaseEasing();
					e.preventDefault(); e.stopPropagation();
                }
            };
					
            S.on({'DragOn.toggle':_this.toggle,
            	  'DragOn.remove':function() {_this.on||_this.toggle();Bo=null;S.off('DragOn.toggle DragOn.remove DragOn.option')},
            	  'DragOn.option':function(e,prop) {if (e) e.stopPropagation(); return (prop)? (typeof prop=='object')?_this.option=prop:_this.option[prop] :_this.option; }
            	 });
            
            return _this.toggle();
        }
    });

    $('.dragon').dragOn()
});
