import{_ as i}from"./chunk-M7DIKWBA.js";var c=(()=>{class e{constructor(){this._listeners=[]}notify(t,s){for(let h of this._listeners)h(t,s)}listen(t){return this._listeners.push(t),()=>{this._listeners=this._listeners.filter(s=>t!==s)}}ngOnDestroy(){this._listeners=[]}static{this.\u0275fac=function(s){return new(s||e)}}static{this.\u0275prov=i({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{c as a};
