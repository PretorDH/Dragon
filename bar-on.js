/**
 * jQuery.Bar-On v0.4.1
 * @author Dark Heart aka PretorDH
 * @site dragon.deparadox.com/#baron
 * MIT license
 */


$(function () {

$.fn.extend({
    barOn: function (opt) {
    	$(this).each(function(){jQuery.BarOn(this, opt)});
    	return this;
    }
});

$.extend({
        BarOn: function (S, opt) { /* Scrollbars */
        	var rB,bB,
            Bo=(S.to = (S = $(S))).BarOn = {
            	doList : {'auto':'','scroll':''},
            	drawScroll : function (e) {
            		if (!S.to[0]) return;
            		var a,t,ox=true,oy=true,ih,sh,iw,sw;
            		rB.css({top:0,bottom:0,right:0});
            		bB.css({bottom:0,left:0,right:0});
            		do {
            			while ( S.to[0]!=S[0] && (t=S.to.css('overflow')) in Bo.doList ) {
            				if ( t in Bo.doList ) {
            					Bo.clearScroll(null,S.to)?S.to=S.to.parent():null;
            				} else S.to=S.to.parent();
            			};
            			if (ox && S.to.data('overflow-x') in Bo.doList) {
		            		S.to.append(bB);
            				if ((sw=S.to[0].scrollWidth)-(iw=bB.width())>2) {
            					ox=false;        //(sw-(t=S.to.scrollLeft())>iw) && t;
            					bB.css({
            					'left':parseInt(t=S.to.scrollLeft()*(1+(a=iw/sw))),
            					'bottom':parseInt( -S.to.scrollTop()+((sh=S.to.height()+S.to.position().top-S.to.offsetParent().height())>0?sh:0) ),
            					'right':parseInt((sw-iw)*a-t+1)});
            				};
            			};
            			if (oy && S.to.data('overflow-y') in Bo.doList) {
		            		S.to.append(rB);
	            			if ((sh=S.to[0].scrollHeight)-(ih=rB.height())>2) {
	            				oy=false;        //(sh-(t=S.to.scrollTop())>ih) && t;
	            				rB.css({
	            				'top':parseInt( t=S.to.scrollTop()*(1+(a=ih/sh)) ),
            					'right':parseInt( -S.to.scrollLeft()+((sw=S.to.width()+S.to.position().left-S.to.offsetParent().width())>0?sw:0) ),
	            				'bottom':parseInt((sh-ih)*a-t+1)});
	            			};
            			};
	            	} while ( (ox||oy) && (S.to[0]!=S[0]) && (S.to=S.to.parent()) );
	            	rB.css({display:( oy?'none':'block' )});
	            	bB.css({display:( ox?'none':'block' )});
            	},
            	onScroll : function (e,x,y) {
            		var et;
            		S.to=(S.too.parents().filter(et=$(e.target)).length)?S.too:(S.too=et);
            		Bo.drawScroll(e);
            	},
            	onHover : function (e) {
            		if ((S.to = $(e.target))[0]==(S.too||[''])[0]) return;
            		S.too=S.to;
            		Bo.drawScroll(e);
            	},
            	onDoModification : function(e){	
            		console.log($('*',S).length);
		            $('*',S).add(S).each(Bo.clearScroll);
            	},
            	clearScroll : function (j,s) {
            		var i,dx=(s=$(s)).css('overflow-x'), dxd=s.data('overflow-x'), ps = s.css('position'),
            			dy=       s.css('overflow-y'), dyd=s.data('overflow-y'); i=true;
	           		if (dx in Bo.doList && dxd!='no-baron') s.data('overflow-x',dx).css({'overflow-x':'hidden','position':(ps=='static')?'relative':((i=false),ps)});
	           		if (dy in Bo.doList && dyd!='no-baron') s.data('overflow-y',dy).css({'overflow-y':'hidden','position':(ps=='static')?'relative':((i=false),ps)});
	           		if (j==null) return i;
            	}
            };
            
            (rB=$('.rBarOn',S)).length || (rB=S.append('<div class="rBarOn" style="position:absolute"></div>').children('.rBarOn'));
            (bB=$('.bBarOn',S)).length || (bB=S.append('<div class="bBarOn" style="position:absolute"></div>').children('.bBarOn'));           
            Bo.onDoModification();
            S.on({'scroll':Bo.onScroll,'mousemove':Bo.onHover});
            $(window).on('resize',Bo.drawScroll);
            (("Info" in window) && Info||console).log('BarOn enter...');
            return S;
        }
	});

    $('.dragon').barOn();
});