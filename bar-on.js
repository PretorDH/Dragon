/**
 * jQuery.Bar-On v0.3.3
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
            	drawScroll : function (e) {
            		if (!S.to[0]) return;
            		var a,t,ox=true,oy=true,ih,sh,iw,sw;
            		rB.css({top:0,bottom:0,right:0});
            		bB.css({bottom:0,left:0,right:0});
            		do {
            			while ( S.to[0]!=S[0] && (t=S.to.css('overflow'))!='hidden' ) {(t=='scroll') && S.to.css('overflow','hidden') || S.to=S.to.parent()};
            			if (ox) {
		            		S.to.append(bB);
            				((sw=S.to[0].scrollWidth)-(iw=bB.width())>2) && (ox=false,bB.css({
            					'left':parseInt(t=S.to.scrollLeft()*(1+(a=iw/sw))),
            					'bottom':parseInt( -S.to.scrollTop()+((sh=S.to.height()+S.to.position().top-S.to.offsetParent().height())>0?sh:0) ),
            					'right':parseInt((sw-iw)*a-t+1)}) );
            			};
            			if (oy) {
		            		S.to.append(rB);
	            			((sh=S.to[0].scrollHeight)-(ih=rB.height())>2) && (oy=false,rB.css({
	            				'top':parseInt( t=S.to.scrollTop()*(1+(a=ih/sh)) ),
            					'right':parseInt( -S.to.scrollLeft()+((sw=S.to.width()+S.to.position().left-S.to.offsetParent().width())>0?sw:0) ),
	            				'bottom':parseInt((sh-ih)*a-t+1)}) );
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
		            $('*',S).add(S).each(Bo.clearScroll);
            	},
            	clearScroll : function (i,s) {
	           		if ((s=$(s)).css('overflow') in {'visible':'','no-dragon':''}) return;
		            s.css({'overflow':'hidden'});
            	}
            };
            
            (rB=$('.rBarOn',S)).length || (rB=S.append('<div class="rBarOn" style="position:absolute"></div>').children('.rBarOn'));
            (bB=$('.bBarOn',S)).length || (bB=S.append('<div class="bBarOn" style="position:absolute"></div>').children('.bBarOn'));           
            Bo.onDoModification();
            
            S.on({'scroll':Bo.onScroll,'mousemove':Bo.onHover});
            $(window).on('resize',Bo.drawScroll);

            (("Info" in window) && Info||console).log('DragOn fly...');
            return S;
        }
	});

    $('.dragon').barOn();
});