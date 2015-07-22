/**
 * jQuery.Bar-On v0.4.5
 * @author Dark Heart aka PretorDH
 * @site dragon.deparadox.com/#baron
 * MIT license
 */


$(function () {

Object.defineProperty(Node.prototype,'realStyle',{
	get : function(){
		return this.currentStyle || window.getComputedStyle(this);
	},
	set : function(a){
		if (typeof(a)!=='object') return undefined;
		var ts=this.style;
		for (var b in a) ts[b]=a[b];
		return this;			
	}
});

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
            	on:true,
            	toggle: function() {
            		if (Bo.on) {
			            (rB=$('.rBarOn',S)).length || (rB=S.append('<div class="rBarOn" style="position:absolute"></div>').children('.rBarOn'));
			            (bB=$('.bBarOn',S)).length || (bB=S.append('<div class="bBarOn" style="position:absolute"></div>').children('.bBarOn'));           
			            Bo.onDoModification(Bo.clearScroll);
			            S.on({'scroll.baron':Bo.onScroll,'mousemove.baron':Bo.onHover}); //
			            $(window).on('resize.baron',Bo.drawScroll);
			        } else {
			            $('.rBarOn,.bBarOn',S).remove();
			            S.off({'scroll.baron':Bo.onScroll,'mousemove.baron':Bo.onHover}); //
			            $(window).off('resize.baron',Bo.drawScroll);
			            Bo.onDoModification(Bo.restoreScroll);
			        }
			        Bo.on=!Bo.on;
            	},
            	drawScroll : function (e) {
            		function round(v) {return (v+(v>0?.5:-.5))<<1>>1}
            		var SS,Sto,a,t,ox=true,oy=true,ih,sh,iw,sw,srB,sbB;
            		if (!(SS=S)||!(Sto=S.tb)||!Sto[0]) return;
            		rB[0].realStyle=srB={ top:0,bottom:0,right:0,display:'none'};
            		bB[0].realStyle=sbB={left:0,bottom:0,right:0,display:'none'};
            		do {
            			while ( Sto && Sto[0]!=S[0] && (t=Sto[0].realStyle.overflow in Bo.doList) ) 
           					Bo.clearScroll(null,Sto)?Sto=Sto.parent():null;
            			if (ox && Sto.data('overflow-x') in Bo.doList) {
		            		Sto.append(bB);
            				if ((sw=Sto[0].scrollWidth)-(iw=bB.width())>2) {
            					sbB.left = round(t=Sto[0].scrollLeft*(1+(a=iw/sw)))+'px';
            					sbB.bottom = round( -Sto[0].scrollTop+((sh=Sto.height()+Sto.position().top-Sto.offsetParent().height())>0?sh:0) )+'px';
            					sbB.right = round((sw-iw)*a-t+1)+'px';
            					sbB.display = 'block';
            					ox=false;
            				};
            			};
            			if (oy && Sto.data('overflow-y') in Bo.doList) {
		            		Sto.append(rB);
	            			if ((sh=Sto[0].scrollHeight)-(ih=rB.height())>2) {
	            				srB.top = round( t=Sto[0].scrollTop*(1+(a=ih/sh)) )+'px';
            					srB.right = round( -Sto[0].scrollLeft+((sw=Sto.width()+Sto.position().left-Sto.offsetParent().width())>0?sw:0) )+'px';
	            				srB.bottom = round((sh-ih)*a-t+1)+'px';
	            				srB.display = 'block';
	            				oy=false;
	            			};
            			};
	            	} while ( (ox||oy) && (Sto[0]!=SS[0]) && (Sto=Sto.parent()) );
            		if (srB.display!='none') {
		            	sh=rB.parent();rB.detach();
            			rB[0].realStyle=srB;
            			sh.append(rB);
            		};
            		if (sbB.display!='none') {
		            	sw=bB.parent();bB.detach();
	            		bB[0].realStyle=sbB;
            			sw.append(bB);
            		};
            	},
            	onScroll : function (e,x,y) {
            		var et;
            		if (S.tob) {
	            		S.tb=(S.tob.parents().filter(et=$(e.target)).length)?S.tob:(S.tob=et);
	            		Bo.drawScroll(e);
            		}
            	},
            	onHover : function (e) {
            		if ((S.tb = $(e.target))[0]==(S.tob||[''])[0]) return;
            		S.tob=S.tb;
            		Bo.drawScroll(e);
            	},
            	onDoModification : function(e){	
		            $('*',S).add(S).each(e);
            	},
            	clearScroll : function (j,s) {
            		var i=true,
            			dx=(s=$(s)).css('overflow-x'), dxd=s.data('overflow-x'), ps = s.css('position'),
            			dy=       s.css('overflow-y'), dyd=s.data('overflow-y'), pso = (ps=='static')?{position:'relative'}:{} ;            		
	           		if (dx in Bo.doList && dxd!='no-baron') (s.data('overflow-x',dx),(pso['overflow-x']='hidden'),i=false);
	           		if (dy in Bo.doList && dyd!='no-baron') (s.data('overflow-y',dy),(pso['overflow-y']='hidden'),i=false);
		           	i || s.css(pso);
	           		if (j==null) return i;
            	},
            	restoreScroll : function (j,s) {
            		var s=$(s),
            			dxd=s.data('overflow-x'), 
            			dyd=s.data('overflow-y');
	           		if (dxd && dxd!='no-baron') s.data('overflow-x','').css('overflow-x',dxd);
	           		if (dyd && dyd!='no-baron') s.data('overflow-y','').css('overflow-y',dyd);
            	}
            };
            
            S.on({'BarOn.toggle':Bo.toggle,'BarOn.remove':function(){Bo.on||Bo.toggle();Bo=null;S.off('BarOn.toggle BarOn.remove')}});
            Bo.toggle();
            
            (("Info" in window) && Info||console).log('BarOn enter...');
            return Bo;

        }
	});

    $('.dragon').barOn();
});
