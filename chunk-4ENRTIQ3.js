import{B as z,C as S,g as u,j as l,k as x,l as a,u as D}from"./chunk-UKYACQUO.js";import{d as w}from"./chunk-JTWP7N5S.js";import{$ as m,B as g,D as R,E as p,Ua as c,W as b,_,da as o,ha as v,ia as y,k as f,n as d,r as C,xa as h,za as k}from"./chunk-M7DIKWBA.js";var I=20,V=(()=>{class n{constructor(e,t,r){this._ngZone=e,this._platform=t,this._scrolled=new d,this._globalSubscription=null,this._scrolledCount=0,this.scrollContainers=new Map,this._document=r}register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=I){return this._platform.isBrowser?new f(t=>{this._globalSubscription||this._addGlobalListener();let r=e>0?this._scrolled.pipe(p(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||this._removeGlobalListener()}}):C()}ngOnDestroy(){this._removeGlobalListener(),this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){let r=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe(R(i=>!i||r.indexOf(i)>-1))}getAncestorScrollContainers(e){let t=[];return this.scrollContainers.forEach((r,i)=>{this._scrollableContainsElement(i,e)&&t.push(i)}),t}_getWindow(){return this._document.defaultView||window}_scrollableContainsElement(e,t){let r=D(t),i=e.getElementRef().nativeElement;do if(r==i)return!0;while(r=r.parentElement);return!1}_addGlobalListener(){this._globalSubscription=this._ngZone.runOutsideAngular(()=>{let e=this._getWindow();return g(e.document,"scroll").subscribe(()=>this._scrolled.next())})}_removeGlobalListener(){this._globalSubscription&&(this._globalSubscription.unsubscribe(),this._globalSubscription=null)}static{this.\u0275fac=function(t){return new(t||n)(o(h),o(u),o(w,8))}}static{this.\u0275prov=_({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})(),Se=(()=>{class n{constructor(e,t,r,i){this.elementRef=e,this.scrollDispatcher=t,this.ngZone=r,this.dir=i,this._destroyed=new d,this._elementScrolled=new f(s=>this.ngZone.runOutsideAngular(()=>g(this.elementRef.nativeElement,"scroll").pipe(b(this._destroyed)).subscribe(s)))}ngOnInit(){this.scrollDispatcher.register(this)}ngOnDestroy(){this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let t=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=r?e.end:e.start),e.right==null&&(e.right=r?e.start:e.end),e.bottom!=null&&(e.top=t.scrollHeight-t.clientHeight-e.bottom),r&&a()!=l.NORMAL?(e.left!=null&&(e.right=t.scrollWidth-t.clientWidth-e.left),a()==l.INVERTED?e.left=e.right:a()==l.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=t.scrollWidth-t.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let t=this.elementRef.nativeElement;x()?t.scrollTo(e):(e.top!=null&&(t.scrollTop=e.top),e.left!=null&&(t.scrollLeft=e.left))}measureScrollOffset(e){let t="left",r="right",i=this.elementRef.nativeElement;if(e=="top")return i.scrollTop;if(e=="bottom")return i.scrollHeight-i.clientHeight-i.scrollTop;let s=this.dir&&this.dir.value=="rtl";return e=="start"?e=s?r:t:e=="end"&&(e=s?t:r),s&&a()==l.INVERTED?e==t?i.scrollWidth-i.clientWidth-i.scrollLeft:i.scrollLeft:s&&a()==l.NEGATED?e==t?i.scrollLeft+i.scrollWidth-i.clientWidth:-i.scrollLeft:e==t?i.scrollLeft:i.scrollWidth-i.clientWidth-i.scrollLeft}static{this.\u0275fac=function(t){return new(t||n)(c(k),c(V),c(h),c(z,8))}}static{this.\u0275dir=y({type:n,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]],standalone:!0})}}return n})(),T=20,Ce=(()=>{class n{constructor(e,t,r){this._platform=e,this._change=new d,this._changeListener=i=>{this._change.next(i)},this._document=r,t.runOutsideAngular(()=>{if(e.isBrowser){let i=this._getWindow();i.addEventListener("resize",this._changeListener),i.addEventListener("orientationchange",this._changeListener)}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){if(this._platform.isBrowser){let e=this._getWindow();e.removeEventListener("resize",this._changeListener),e.removeEventListener("orientationchange",this._changeListener)}this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:t,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+t,height:r,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,t=this._getWindow(),r=e.documentElement,i=r.getBoundingClientRect(),s=-i.top||e.body.scrollTop||t.scrollY||r.scrollTop||0,E=-i.left||e.body.scrollLeft||t.scrollX||r.scrollLeft||0;return{top:s,left:E}}change(e=T){return e>0?this._change.pipe(p(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static{this.\u0275fac=function(t){return new(t||n)(o(u),o(h),o(w,8))}}static{this.\u0275prov=_({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();var O=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275mod=v({type:n})}static{this.\u0275inj=m({})}}return n})(),Re=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275mod=v({type:n})}static{this.\u0275inj=m({imports:[S,O,S,O]})}}return n})();export{V as a,Se as b,Ce as c,O as d,Re as e};