(function(B,i){typeof exports=="object"&&typeof module<"u"?i(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],i):i((B=typeof globalThis<"u"?globalThis:B||self).UiLibrary={},B.Vue)})(this,function(B,i){"use strict";var e8=typeof global=="object"&&global&&global.Object===Object&&global,Et=typeof self=="object"&&self&&self.Object===Object&&self,J=e8||Et||Function("return this")(),l2=J.Symbol,a8=Object.prototype,Ft=a8.hasOwnProperty,Rt=a8.toString,H1=l2?l2.toStringTag:void 0,It=Object.prototype.toString,qt="[object Null]",Ut="[object Undefined]",n8=l2?l2.toStringTag:void 0;function C2(c){return c==null?c===void 0?Ut:qt:n8&&n8 in Object(c)?function(e){var a=Ft.call(e,H1),n=e[H1];try{e[H1]=void 0;var o=!0}catch{}var s=Rt.call(e);return o&&(a?e[H1]=n:delete e[H1]),s}(c):function(e){return It.call(e)}(c)}function c2(c){return c!=null&&typeof c=="object"}var Wt="[object Symbol]";function n3(c){return typeof c=="symbol"||c2(c)&&C2(c)==Wt}function i8(c,e){for(var a=-1,n=c==null?0:c.length,o=Array(n);++a<n;)o[a]=e(c[a],a,c);return o}var Y=Array.isArray,Gt=1/0,s8=l2?l2.prototype:void 0,o8=s8?s8.toString:void 0;function t8(c){if(typeof c=="string")return c;if(Y(c))return i8(c,t8)+"";if(n3(c))return o8?o8.call(c):"";var e=c+"";return e=="0"&&1/c==-Gt?"-0":e}var $t=/\s/,Yt=/^\s+/;function K(c){var e=typeof c;return c!=null&&(e=="object"||e=="function")}var r8=NaN,Kt=/^[-+]0x[0-9a-f]+$/i,Xt=/^0b[01]+$/i,Jt=/^0o[0-7]+$/i,Qt=parseInt;function i3(c){if(typeof c=="number")return c;if(n3(c))return r8;if(K(c)){var e=typeof c.valueOf=="function"?c.valueOf():c;c=K(e)?e+"":e}if(typeof c!="string")return c===0?c:+c;var a;c=(a=c)?a.slice(0,function(o){for(var s=o.length;s--&&$t.test(o.charAt(s)););return s}(a)+1).replace(Yt,""):a;var n=Xt.test(c);return n||Jt.test(c)?Qt(c.slice(2),n?2:8):Kt.test(c)?r8:+c}var l8=1/0,Zt=17976931348623157e292;function z4(c){var e=function(n){return n?(n=i3(n))===l8||n===-l8?(n<0?-1:1)*Zt:n==n?n:0:n===0?n:0}(c),a=e%1;return e==e?a?e-a:e:0}function V1(c){return c}var cr="[object AsyncFunction]",er="[object Function]",ar="[object GeneratorFunction]",nr="[object Proxy]";function h2(c){if(!K(c))return!1;var e=C2(c);return e==er||e==ar||e==cr||e==nr}var f8,p4=J["__core-js_shared__"],m8=(f8=/[^.]+$/.exec(p4&&p4.keys&&p4.keys.IE_PROTO||""))?"Symbol(src)_1."+f8:"",ir=Function.prototype.toString;function E2(c){if(c!=null){try{return ir.call(c)}catch{}try{return c+""}catch{}}return""}var sr=/^\[object .+?Constructor\]$/,or=Function.prototype,tr=Object.prototype,rr=or.toString,lr=tr.hasOwnProperty,fr=RegExp("^"+rr.call(lr).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function F2(c,e){var a=function(n,o){return n==null?void 0:n[o]}(c,e);return function(n){return!(!K(n)||(o=n,m8&&m8 in o))&&(h2(n)?fr:sr).test(E2(n));var o}(a)?a:void 0}var h1=F2(J,"WeakMap"),s3=h1&&new h1,u8=s3?function(c,e){return s3.set(c,e),c}:V1,z8=Object.create,o3=function(){function c(){}return function(e){if(!K(e))return{};if(z8)return z8(e);c.prototype=e;var a=new c;return c.prototype=void 0,a}}();function d1(c){return function(){var e=arguments;switch(e.length){case 0:return new c;case 1:return new c(e[0]);case 2:return new c(e[0],e[1]);case 3:return new c(e[0],e[1],e[2]);case 4:return new c(e[0],e[1],e[2],e[3]);case 5:return new c(e[0],e[1],e[2],e[3],e[4]);case 6:return new c(e[0],e[1],e[2],e[3],e[4],e[5]);case 7:return new c(e[0],e[1],e[2],e[3],e[4],e[5],e[6])}var a=o3(c.prototype),n=c.apply(a,e);return K(n)?n:a}}function H4(c,e,a){switch(a.length){case 0:return c.call(e);case 1:return c.call(e,a[0]);case 2:return c.call(e,a[0],a[1]);case 3:return c.call(e,a[0],a[1],a[2])}return c.apply(e,a)}var mr=Math.max;function p8(c,e,a,n){for(var o=-1,s=c.length,t=a.length,r=-1,f=e.length,l=mr(s-t,0),m=Array(f+l),u=!n;++r<f;)m[r]=e[r];for(;++o<t;)(u||o<s)&&(m[a[o]]=c[o]);for(;l--;)m[r++]=c[o++];return m}var ur=Math.max;function H8(c,e,a,n){for(var o=-1,s=c.length,t=-1,r=a.length,f=-1,l=e.length,m=ur(s-r,0),u=Array(m+l),V=!n;++o<m;)u[o]=c[o];for(var h=o;++f<l;)u[h+f]=e[f];for(;++t<r;)(V||o<s)&&(u[h+a[t]]=c[o++]);return u}function V4(){}var zr=4294967295;function Z2(c){this.__wrapped__=c,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=zr,this.__views__=[]}function h4(){}Z2.prototype=o3(V4.prototype),Z2.prototype.constructor=Z2;var V8=s3?function(c){return s3.get(c)}:h4,h8={},pr=Object.prototype.hasOwnProperty;function c1(c,e){this.__wrapped__=c,this.__actions__=[],this.__chain__=!!e,this.__index__=0,this.__values__=void 0}function t3(c,e){var a=-1,n=c.length;for(e||(e=Array(n));++a<n;)e[a]=c[a];return e}c1.prototype=o3(V4.prototype),c1.prototype.constructor=c1;var Hr=Object.prototype.hasOwnProperty;function r3(c){if(c2(c)&&!Y(c)&&!(c instanceof Z2)){if(c instanceof c1)return c;if(Hr.call(c,"__wrapped__"))return function(e){if(e instanceof Z2)return e.clone();var a=new c1(e.__wrapped__,e.__chain__);return a.__actions__=t3(e.__actions__),a.__index__=e.__index__,a.__values__=e.__values__,a}(c)}return new c1(c)}r3.prototype=V4.prototype,r3.prototype.constructor=r3;var Vr=Date.now;function d8(c){var e=0,a=0;return function(){var n=Vr(),o=16-(n-a);if(a=n,o>0){if(++e>=800)return arguments[0]}else e=0;return c.apply(void 0,arguments)}}var M8=d8(u8),hr=/\{\n\/\* \[wrapped with (.+)\] \*/,dr=/,? & /,Mr=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,l3=function(){try{var c=F2(Object,"defineProperty");return c({},"",{}),c}catch{}}(),vr=l3?function(c,e){return l3(c,"toString",{configurable:!0,enumerable:!1,value:(a=e,function(){return a}),writable:!0});var a}:V1,d4=d8(vr);function M4(c,e){for(var a=-1,n=c==null?0:c.length;++a<n&&e(c[a],a,c)!==!1;);return c}function v8(c,e,a,n){for(var o=c.length,s=a+-1;++s<o;)if(e(c[s],s,c))return s;return-1}function Cr(c){return c!=c}var Lr=[["ary",128],["bind",1],["bindKey",2],["curry",8],["curryRight",16],["flip",512],["partial",32],["partialRight",64],["rearg",256]];function C8(c,e,a){var n=e+"";return d4(c,function(o,s){var t=s.length;if(!t)return o;var r=t-1;return s[r]=(t>1?"& ":"")+s[r],s=s.join(t>2?", ":" "),o.replace(Mr,`{
/* [wrapped with `+s+`] */
`)}(n,function(o,s){return M4(Lr,function(t){var r="_."+t[0];s&t[1]&&!function(f,l){return!(f==null||!f.length)&&function(m,u,V){return u==u?function(h,z,H){for(var p=-1,d=h.length;++p<d;)if(h[p]===z)return p;return-1}(m,u):v8(m,Cr,0)}(f,l)>-1}(o,r)&&o.push(r)}),o.sort()}(function(o){var s=o.match(hr);return s?s[1].split(dr):[]}(n),a)))}var gr=1,xr=2,br=4,Nr=8,L8=32,g8=64;function x8(c,e,a,n,o,s,t,r,f,l){var m=e&Nr;e|=m?L8:g8,(e&=~(m?g8:L8))&br||(e&=~(gr|xr));var u=[c,e,o,m?s:void 0,m?t:void 0,m?void 0:s,m?void 0:t,r,f,l],V=a.apply(void 0,u);return function(h){var z=function(d){for(var v=d.name+"",g=h8[v],C=pr.call(h8,v)?g.length:0;C--;){var b=g[C],M=b.func;if(M==null||M==d)return b.name}return v}(h),H=r3[z];if(typeof H!="function"||!(z in Z2.prototype))return!1;if(h===H)return!0;var p=V8(H);return!!p&&h===p[0]}(c)&&M8(V,u),V.placeholder=n,C8(V,c,e)}function v4(c){return c.placeholder}var yr=9007199254740991,wr=/^(?:0|[1-9]\d*)$/;function M1(c,e){var a=typeof c;return!!(e=e??yr)&&(a=="number"||a!="symbol"&&wr.test(c))&&c>-1&&c%1==0&&c<e}var kr=Math.min,b8="__lodash_placeholder__";function v1(c,e){for(var a=-1,n=c.length,o=0,s=[];++a<n;){var t=c[a];t!==e&&t!==b8||(c[a]=b8,s[o++]=a)}return s}function C4(c,e,a,n,o,s,t,r,f,l){var m=128&e,u=1&e,V=2&e,h=24&e,z=512&e,H=V?void 0:d1(c);return function p(){for(var d=arguments.length,v=Array(d),g=d;g--;)v[g]=arguments[g];if(h)var C=v4(p),b=function(y,_){for(var L=y.length,N=0;L--;)y[L]===_&&++N;return N}(v,C);if(n&&(v=p8(v,n,o,h)),s&&(v=H8(v,s,t,h)),d-=b,h&&d<l){var M=v1(v,C);return x8(c,e,C4,p.placeholder,a,v,M,r,f,l-d)}var x=u?a:this,w=V?x[c]:c;return d=v.length,r?v=function(y,_){for(var L=y.length,N=kr(_.length,L),k=t3(y);N--;){var T=_[N];y[N]=M1(T,L)?k[T]:void 0}return y}(v,r):z&&d>1&&v.reverse(),m&&f<d&&(v.length=f),this&&this!==J&&this instanceof p&&(w=H||d1(w)),w.apply(x,v)}}var N8="__lodash_placeholder__",Sr=Math.min,y8=Math.max;function L4(c,e,a){e=="__proto__"&&l3?l3(c,e,{configurable:!0,enumerable:!0,value:a,writable:!0}):c[e]=a}function R2(c,e){return c===e||c!=c&&e!=e}var Ar=Object.prototype.hasOwnProperty;function f3(c,e,a){var n=c[e];Ar.call(c,e)&&R2(n,a)&&(a!==void 0||e in c)||L4(c,e,a)}function I2(c,e,a,n){var o=!a;a||(a={});for(var s=-1,t=e.length;++s<t;){var r=e[s],f=void 0;f===void 0&&(f=c[r]),o?L4(a,r,f):f3(a,r,f)}return a}var w8=Math.max;function k8(c,e,a){return e=w8(e===void 0?c.length-1:e,0),function(){for(var n=arguments,o=-1,s=w8(n.length-e,0),t=Array(s);++o<s;)t[o]=n[e+o];o=-1;for(var r=Array(e+1);++o<e;)r[o]=n[o];return r[e]=a(t),H4(c,this,r)}}function m3(c,e){return d4(k8(c,e,V1),c+"")}var _r=9007199254740991;function g4(c){return typeof c=="number"&&c>-1&&c%1==0&&c<=_r}function B2(c){return c!=null&&g4(c.length)&&!h2(c)}function S8(c){return m3(function(e,a){var n=-1,o=a.length,s=o>1?a[o-1]:void 0,t=o>2?a[2]:void 0;for(s=c.length>3&&typeof s=="function"?(o--,s):void 0,t&&function(f,l,m){if(!K(m))return!1;var u=typeof l;return!!(u=="number"?B2(m)&&M1(l,m.length):u=="string"&&l in m)&&R2(m[l],f)}(a[0],a[1],t)&&(s=o<3?void 0:s,o=1),e=Object(e);++n<o;){var r=a[n];r&&c(e,r,n,s)}return e})}var Br=Object.prototype;function u3(c){var e=c&&c.constructor;return c===(typeof e=="function"&&e.prototype||Br)}function A8(c){return c2(c)&&C2(c)=="[object Arguments]"}var _8=Object.prototype,Tr=_8.hasOwnProperty,Pr=_8.propertyIsEnumerable,C1=A8(function(){return arguments}())?A8:function(c){return c2(c)&&Tr.call(c,"callee")&&!Pr.call(c,"callee")},B8=typeof B=="object"&&B&&!B.nodeType&&B,T8=B8&&typeof module=="object"&&module&&!module.nodeType&&module,P8=T8&&T8.exports===B8?J.Buffer:void 0,L1=(P8?P8.isBuffer:void 0)||function(){return!1},F={};function x4(c){return function(e){return c(e)}}F["[object Float32Array]"]=F["[object Float64Array]"]=F["[object Int8Array]"]=F["[object Int16Array]"]=F["[object Int32Array]"]=F["[object Uint8Array]"]=F["[object Uint8ClampedArray]"]=F["[object Uint16Array]"]=F["[object Uint32Array]"]=!0,F["[object Arguments]"]=F["[object Array]"]=F["[object ArrayBuffer]"]=F["[object Boolean]"]=F["[object DataView]"]=F["[object Date]"]=F["[object Error]"]=F["[object Function]"]=F["[object Map]"]=F["[object Number]"]=F["[object Object]"]=F["[object RegExp]"]=F["[object Set]"]=F["[object String]"]=F["[object WeakMap]"]=!1;var O8=typeof B=="object"&&B&&!B.nodeType&&B,g1=O8&&typeof module=="object"&&module&&!module.nodeType&&module,b4=g1&&g1.exports===O8&&e8.process,e1=function(){try{return g1&&g1.require&&g1.require("util").types||b4&&b4.binding&&b4.binding("util")}catch{}}(),D8=e1&&e1.isTypedArray,N4=D8?x4(D8):function(c){return c2(c)&&g4(c.length)&&!!F[C2(c)]},Or=Object.prototype.hasOwnProperty;function j8(c,e){var a=Y(c),n=!a&&C1(c),o=!a&&!n&&L1(c),s=!a&&!n&&!o&&N4(c),t=a||n||o||s,r=t?function(m,u){for(var V=-1,h=Array(m);++V<m;)h[V]=u(V);return h}(c.length,String):[],f=r.length;for(var l in c)!e&&!Or.call(c,l)||t&&(l=="length"||o&&(l=="offset"||l=="parent")||s&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||M1(l,f))||r.push(l);return r}function E8(c,e){return function(a){return c(e(a))}}var Dr=E8(Object.keys,Object),jr=Object.prototype.hasOwnProperty;function F8(c){if(!u3(c))return Dr(c);var e=[];for(var a in Object(c))jr.call(c,a)&&a!="constructor"&&e.push(a);return e}function q2(c){return B2(c)?j8(c):F8(c)}var Er=Object.prototype.hasOwnProperty,R8=S8(function(c,e){if(u3(e)||B2(e))I2(e,q2(e),c);else for(var a in e)Er.call(e,a)&&f3(c,a,e[a])}),Fr=Object.prototype.hasOwnProperty;function x1(c){return B2(c)?j8(c,!0):function(e){if(!K(e))return function(s){var t=[];if(s!=null)for(var r in Object(s))t.push(r);return t}(e);var a=u3(e),n=[];for(var o in e)(o!="constructor"||!a&&Fr.call(e,o))&&n.push(o);return n}(c)}var Rr=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Ir=/^\w*$/;function y4(c,e){if(Y(c))return!1;var a=typeof c;return!(a!="number"&&a!="symbol"&&a!="boolean"&&c!=null&&!n3(c))||Ir.test(c)||!Rr.test(c)||e!=null&&c in Object(e)}var b1=F2(Object,"create"),qr=Object.prototype.hasOwnProperty,Ur=Object.prototype.hasOwnProperty;function U2(c){var e=-1,a=c==null?0:c.length;for(this.clear();++e<a;){var n=c[e];this.set(n[0],n[1])}}function z3(c,e){for(var a=c.length;a--;)if(R2(c[a][0],e))return a;return-1}U2.prototype.clear=function(){this.__data__=b1?b1(null):{},this.size=0},U2.prototype.delete=function(c){var e=this.has(c)&&delete this.__data__[c];return this.size-=e?1:0,e},U2.prototype.get=function(c){var e=this.__data__;if(b1){var a=e[c];return a==="__lodash_hash_undefined__"?void 0:a}return qr.call(e,c)?e[c]:void 0},U2.prototype.has=function(c){var e=this.__data__;return b1?e[c]!==void 0:Ur.call(e,c)},U2.prototype.set=function(c,e){var a=this.__data__;return this.size+=this.has(c)?0:1,a[c]=b1&&e===void 0?"__lodash_hash_undefined__":e,this};var Wr=Array.prototype.splice;function L2(c){var e=-1,a=c==null?0:c.length;for(this.clear();++e<a;){var n=c[e];this.set(n[0],n[1])}}L2.prototype.clear=function(){this.__data__=[],this.size=0},L2.prototype.delete=function(c){var e=this.__data__,a=z3(e,c);return!(a<0||(a==e.length-1?e.pop():Wr.call(e,a,1),--this.size,0))},L2.prototype.get=function(c){var e=this.__data__,a=z3(e,c);return a<0?void 0:e[a][1]},L2.prototype.has=function(c){return z3(this.__data__,c)>-1},L2.prototype.set=function(c,e){var a=this.__data__,n=z3(a,c);return n<0?(++this.size,a.push([c,e])):a[n][1]=e,this};var N1=F2(J,"Map");function p3(c,e){var a,n,o=c.__data__;return((n=typeof(a=e))=="string"||n=="number"||n=="symbol"||n=="boolean"?a!=="__proto__":a===null)?o[typeof e=="string"?"string":"hash"]:o.map}function g2(c){var e=-1,a=c==null?0:c.length;for(this.clear();++e<a;){var n=c[e];this.set(n[0],n[1])}}function w4(c,e){if(typeof c!="function"||e!=null&&typeof e!="function")throw new TypeError("Expected a function");var a=function(){var n=arguments,o=e?e.apply(this,n):n[0],s=a.cache;if(s.has(o))return s.get(o);var t=c.apply(this,n);return a.cache=s.set(o,t)||s,t};return a.cache=new(w4.Cache||g2),a}g2.prototype.clear=function(){this.size=0,this.__data__={hash:new U2,map:new(N1||L2),string:new U2}},g2.prototype.delete=function(c){var e=p3(this,c).delete(c);return this.size-=e?1:0,e},g2.prototype.get=function(c){return p3(this,c).get(c)},g2.prototype.has=function(c){return p3(this,c).has(c)},g2.prototype.set=function(c,e){var a=p3(this,c),n=a.size;return a.set(c,e),this.size+=a.size==n?0:1,this},w4.Cache=g2;var I8,k4,S4,Gr=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,$r=/\\(\\)?/g,Yr=(I8=function(c){var e=[];return c.charCodeAt(0)===46&&e.push(""),c.replace(Gr,function(a,n,o,s){e.push(o?s.replace($r,"$1"):n||a)}),e},k4=w4(I8,function(c){return S4.size===500&&S4.clear(),c}),S4=k4.cache,k4);function y1(c,e){return Y(c)?c:y4(c,e)?[c]:Yr(function(a){return a==null?"":t8(a)}(c))}var Kr=1/0;function a1(c){if(typeof c=="string"||n3(c))return c;var e=c+"";return e=="0"&&1/c==-Kr?"-0":e}function A4(c,e){for(var a=0,n=(e=y1(e,c)).length;c!=null&&a<n;)c=c[a1(e[a++])];return a&&a==n?c:void 0}function n1(c,e,a){var n=c==null?void 0:A4(c,e);return n===void 0?a:n}function _4(c,e){for(var a=-1,n=e.length,o=c.length;++a<n;)c[o+a]=e[a];return c}var q8=l2?l2.isConcatSpreadable:void 0;function Xr(c){return Y(c)||C1(c)||!!(q8&&c&&c[q8])}function Jr(c){return c!=null&&c.length?function(e,a,n,o,s){var t=-1,r=e.length;for(n||(n=Xr),s||(s=[]);++t<r;){var f=e[t];n(f)?_4(s,f):s[s.length]=f}return s}(c):[]}var B4=E8(Object.getPrototypeOf,Object),Qr="[object Object]",Zr=Function.prototype,cl=Object.prototype,U8=Zr.toString,el=cl.hasOwnProperty,al=U8.call(Object);function T4(c){if(!c2(c)||C2(c)!=Qr)return!1;var e=B4(c);if(e===null)return!0;var a=el.call(e,"constructor")&&e.constructor;return typeof a=="function"&&a instanceof a&&U8.call(a)==al}var i1=m3(function(c,e,a){var n=1;if(a.length){var o=v1(a,v4(i1));n|=32}return function(s,t,r,f,l,m,u,V){var h=2&t;if(!h&&typeof s!="function")throw new TypeError("Expected a function");var z=f?f.length:0;if(z||(t&=-97,f=l=void 0),u=u===void 0?u:y8(z4(u),0),V=V===void 0?V:z4(V),z-=l?l.length:0,64&t){var H=f,p=l;f=l=void 0}var d=h?void 0:V8(s),v=[s,t,r,f,l,H,p,void 0,u,V];if(d&&function(C,b){var M=C[1],x=b[1],w=M|x,y=w<131,_=x==128&&M==8||x==128&&M==256&&C[7].length<=b[8]||x==384&&b[7].length<=b[8]&&M==8;if(!y&&!_)return C;1&x&&(C[2]=b[2],w|=1&M?0:4);var L=b[3];if(L){var N=C[3];C[3]=N?p8(N,L,b[4]):L,C[4]=N?v1(C[3],N8):b[4]}(L=b[5])&&(N=C[5],C[5]=N?H8(N,L,b[6]):L,C[6]=N?v1(C[5],N8):b[6]),(L=b[7])&&(C[7]=L),128&x&&(C[8]=C[8]==null?b[8]:Sr(C[8],b[8])),C[9]==null&&(C[9]=b[9]),C[0]=b[0],C[1]=w}(v,d),s=v[0],t=v[1],r=v[2],f=v[3],l=v[4],!(V=v[9]=v[9]===void 0?h?0:s.length:y8(v[9]-z,0))&&24&t&&(t&=-25),t&&t!=1)g=t==8||t==16?function(C,b,M){var x=d1(C);return function w(){for(var y=arguments.length,_=Array(y),L=y,N=v4(w);L--;)_[L]=arguments[L];var k=y<3&&_[0]!==N&&_[y-1]!==N?[]:v1(_,N);return(y-=k.length)<M?x8(C,b,C4,w.placeholder,void 0,_,k,void 0,void 0,M-y):H4(this&&this!==J&&this instanceof w?x:C,this,_)}}(s,t,V):t!=32&&t!=33||l.length?C4.apply(void 0,v):function(C,b,M,x){var w=1&b,y=d1(C);return function _(){for(var L=-1,N=arguments.length,k=-1,T=x.length,D=Array(T+N),P=this&&this!==J&&this instanceof _?y:C;++k<T;)D[k]=x[k];for(;N--;)D[k++]=arguments[++L];return H4(P,w?M:this,D)}}(s,t,r,f);else var g=function(C,b,M){var x=1&b,w=d1(C);return function y(){return(this&&this!==J&&this instanceof y?w:C).apply(x?M:this,arguments)}}(s,t,r);return C8((d?u8:M8)(g,v),s,t)}(c,n,e,a,o)});i1.placeholder={};var nl=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");function p2(c){var e=this.__data__=new L2(c);this.size=e.size}p2.prototype.clear=function(){this.__data__=new L2,this.size=0},p2.prototype.delete=function(c){var e=this.__data__,a=e.delete(c);return this.size=e.size,a},p2.prototype.get=function(c){return this.__data__.get(c)},p2.prototype.has=function(c){return this.__data__.has(c)},p2.prototype.set=function(c,e){var a=this.__data__;if(a instanceof L2){var n=a.__data__;if(!N1||n.length<199)return n.push([c,e]),this.size=++a.size,this;a=this.__data__=new g2(n)}return a.set(c,e),this.size=a.size,this};var W8=typeof B=="object"&&B&&!B.nodeType&&B,G8=W8&&typeof module=="object"&&module&&!module.nodeType&&module,$8=G8&&G8.exports===W8?J.Buffer:void 0,Y8=$8?$8.allocUnsafe:void 0;function K8(c,e){if(e)return c.slice();var a=c.length,n=Y8?Y8(a):new c.constructor(a);return c.copy(n),n}function X8(c,e){for(var a=-1,n=c==null?0:c.length,o=0,s=[];++a<n;){var t=c[a];e(t,a,c)&&(s[o++]=t)}return s}function J8(){return[]}var il=Object.prototype.propertyIsEnumerable,Q8=Object.getOwnPropertySymbols,P4=Q8?function(c){return c==null?[]:(c=Object(c),X8(Q8(c),function(e){return il.call(c,e)}))}:J8,Z8=Object.getOwnPropertySymbols?function(c){for(var e=[];c;)_4(e,P4(c)),c=B4(c);return e}:J8;function c5(c,e,a){var n=e(c);return Y(c)?n:_4(n,a(c))}function O4(c){return c5(c,q2,P4)}function e5(c){return c5(c,x1,Z8)}var D4=F2(J,"DataView"),j4=F2(J,"Promise"),E4=F2(J,"Set"),a5="[object Map]",n5="[object Promise]",i5="[object Set]",s5="[object WeakMap]",o5="[object DataView]",sl=E2(D4),ol=E2(N1),tl=E2(j4),rl=E2(E4),ll=E2(h1),f2=C2;(D4&&f2(new D4(new ArrayBuffer(1)))!=o5||N1&&f2(new N1)!=a5||j4&&f2(j4.resolve())!=n5||E4&&f2(new E4)!=i5||h1&&f2(new h1)!=s5)&&(f2=function(c){var e=C2(c),a=e=="[object Object]"?c.constructor:void 0,n=a?E2(a):"";if(n)switch(n){case sl:return o5;case ol:return a5;case tl:return n5;case rl:return i5;case ll:return s5}return e});var fl=Object.prototype.hasOwnProperty,H3=J.Uint8Array;function F4(c){var e=new c.constructor(c.byteLength);return new H3(e).set(new H3(c)),e}var ml=/\w*$/,t5=l2?l2.prototype:void 0,r5=t5?t5.valueOf:void 0;function l5(c,e){var a=e?F4(c.buffer):c.buffer;return new c.constructor(a,c.byteOffset,c.length)}function f5(c){return typeof c.constructor!="function"||u3(c)?{}:o3(B4(c))}var m5=e1&&e1.isMap,ul=m5?x4(m5):function(c){return c2(c)&&f2(c)=="[object Map]"},u5=e1&&e1.isSet,zl=u5?x4(u5):function(c){return c2(c)&&f2(c)=="[object Set]"},z5="[object Arguments]",p5="[object Function]",H5="[object Object]",E={};function w1(c,e,a,n,o,s){var t,r=1&e,f=2&e,l=4&e;if(a&&(t=o?a(c,n,o,s):a(c)),t!==void 0)return t;if(!K(c))return c;var m=Y(c);if(m){if(t=function(H){var p=H.length,d=new H.constructor(p);return p&&typeof H[0]=="string"&&fl.call(H,"index")&&(d.index=H.index,d.input=H.input),d}(c),!r)return t3(c,t)}else{var u=f2(c),V=u==p5||u=="[object GeneratorFunction]";if(L1(c))return K8(c,r);if(u==H5||u==z5||V&&!o){if(t=f||V?{}:f5(c),!r)return f?function(H,p){return I2(H,Z8(H),p)}(c,function(H,p){return H&&I2(p,x1(p),H)}(t,c)):function(H,p){return I2(H,P4(H),p)}(c,function(H,p){return H&&I2(p,q2(p),H)}(t,c))}else{if(!E[u])return o?c:{};t=function(H,p,d){var v,g=H.constructor;switch(p){case"[object ArrayBuffer]":return F4(H);case"[object Boolean]":case"[object Date]":return new g(+H);case"[object DataView]":return function(C,b){var M=b?F4(C.buffer):C.buffer;return new C.constructor(M,C.byteOffset,C.byteLength)}(H,d);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return l5(H,d);case"[object Map]":case"[object Set]":return new g;case"[object Number]":case"[object String]":return new g(H);case"[object RegExp]":return function(C){var b=new C.constructor(C.source,ml.exec(C));return b.lastIndex=C.lastIndex,b}(H);case"[object Symbol]":return v=H,r5?Object(r5.call(v)):{}}}(c,u,r)}}s||(s=new p2);var h=s.get(c);if(h)return h;s.set(c,t),zl(c)?c.forEach(function(H){t.add(w1(H,e,a,H,c,s))}):ul(c)&&c.forEach(function(H,p){t.set(p,w1(H,e,a,p,c,s))});var z=m?void 0:(l?f?e5:O4:f?x1:q2)(c);return M4(z||c,function(H,p){z&&(H=c[p=H]),f3(t,p,w1(H,e,a,p,c,s))}),t}function V3(c){var e=-1,a=c==null?0:c.length;for(this.__data__=new g2;++e<a;)this.add(c[e])}function pl(c,e){for(var a=-1,n=c==null?0:c.length;++a<n;)if(e(c[a],a,c))return!0;return!1}function Hl(c,e){return c.has(e)}E[z5]=E["[object Array]"]=E["[object ArrayBuffer]"]=E["[object DataView]"]=E["[object Boolean]"]=E["[object Date]"]=E["[object Float32Array]"]=E["[object Float64Array]"]=E["[object Int8Array]"]=E["[object Int16Array]"]=E["[object Int32Array]"]=E["[object Map]"]=E["[object Number]"]=E[H5]=E["[object RegExp]"]=E["[object Set]"]=E["[object String]"]=E["[object Symbol]"]=E["[object Uint8Array]"]=E["[object Uint8ClampedArray]"]=E["[object Uint16Array]"]=E["[object Uint32Array]"]=!0,E["[object Error]"]=E[p5]=E["[object WeakMap]"]=!1,V3.prototype.add=V3.prototype.push=function(c){return this.__data__.set(c,"__lodash_hash_undefined__"),this},V3.prototype.has=function(c){return this.__data__.has(c)};var Vl=1,hl=2;function V5(c,e,a,n,o,s){var t=a&Vl,r=c.length,f=e.length;if(r!=f&&!(t&&f>r))return!1;var l=s.get(c),m=s.get(e);if(l&&m)return l==e&&m==c;var u=-1,V=!0,h=a&hl?new V3:void 0;for(s.set(c,e),s.set(e,c);++u<r;){var z=c[u],H=e[u];if(n)var p=t?n(H,z,u,e,c,s):n(z,H,u,c,e,s);if(p!==void 0){if(p)continue;V=!1;break}if(h){if(!pl(e,function(d,v){if(!Hl(h,v)&&(z===d||o(z,d,a,n,s)))return h.push(v)})){V=!1;break}}else if(z!==H&&!o(z,H,a,n,s)){V=!1;break}}return s.delete(c),s.delete(e),V}function dl(c){var e=-1,a=Array(c.size);return c.forEach(function(n,o){a[++e]=[o,n]}),a}function Ml(c){var e=-1,a=Array(c.size);return c.forEach(function(n){a[++e]=n}),a}var vl=1,Cl=2,Ll="[object Boolean]",gl="[object Date]",xl="[object Error]",bl="[object Map]",Nl="[object Number]",yl="[object RegExp]",wl="[object Set]",kl="[object String]",Sl="[object Symbol]",Al="[object ArrayBuffer]",_l="[object DataView]",h5=l2?l2.prototype:void 0,R4=h5?h5.valueOf:void 0,Bl=1,Tl=Object.prototype.hasOwnProperty,Pl=1,d5="[object Arguments]",M5="[object Array]",h3="[object Object]",v5=Object.prototype.hasOwnProperty;function I4(c,e,a,n,o){return c===e||(c==null||e==null||!c2(c)&&!c2(e)?c!=c&&e!=e:function(s,t,r,f,l,m){var u=Y(s),V=Y(t),h=u?M5:f2(s),z=V?M5:f2(t),H=(h=h==d5?h3:h)==h3,p=(z=z==d5?h3:z)==h3,d=h==z;if(d&&L1(s)){if(!L1(t))return!1;u=!0,H=!1}if(d&&!H)return m||(m=new p2),u||N4(s)?V5(s,t,r,f,l,m):function(M,x,w,y,_,L,N){switch(w){case _l:if(M.byteLength!=x.byteLength||M.byteOffset!=x.byteOffset)return!1;M=M.buffer,x=x.buffer;case Al:return!(M.byteLength!=x.byteLength||!L(new H3(M),new H3(x)));case Ll:case gl:case Nl:return R2(+M,+x);case xl:return M.name==x.name&&M.message==x.message;case yl:case kl:return M==x+"";case bl:var k=dl;case wl:var T=y&vl;if(k||(k=Ml),M.size!=x.size&&!T)return!1;var D=N.get(M);if(D)return D==x;y|=Cl,N.set(M,x);var P=V5(k(M),k(x),y,_,L,N);return N.delete(M),P;case Sl:if(R4)return R4.call(M)==R4.call(x)}return!1}(s,t,h,r,f,l,m);if(!(r&Pl)){var v=H&&v5.call(s,"__wrapped__"),g=p&&v5.call(t,"__wrapped__");if(v||g){var C=v?s.value():s,b=g?t.value():t;return m||(m=new p2),l(C,b,r,f,m)}}return!!d&&(m||(m=new p2),function(M,x,w,y,_,L){var N=w&Bl,k=O4(M),T=k.length;if(T!=O4(x).length&&!N)return!1;for(var D=T;D--;){var P=k[D];if(!(N?P in x:Tl.call(x,P)))return!1}var W=L.get(M),X=L.get(x);if(W&&X)return W==x&&X==M;var o2=!0;L.set(M,x),L.set(x,M);for(var j=N;++D<T;){var O=M[P=k[D]],q=x[P];if(y)var Z=N?y(q,O,P,x,M,L):y(O,q,P,M,x,L);if(!(Z===void 0?O===q||_(O,q,w,y,L):Z)){o2=!1;break}j||(j=P=="constructor")}if(o2&&!j){var r2=M.constructor,_2=x.constructor;r2==_2||!("constructor"in M)||!("constructor"in x)||typeof r2=="function"&&r2 instanceof r2&&typeof _2=="function"&&_2 instanceof _2||(o2=!1)}return L.delete(M),L.delete(x),o2}(s,t,r,f,l,m))}(c,e,a,n,I4,o))}var Ol=1,Dl=2;function C5(c){return c==c&&!K(c)}function L5(c,e){return function(a){return a!=null&&a[c]===e&&(e!==void 0||c in Object(a))}}function jl(c,e){return c!=null&&e in Object(c)}var El=1,Fl=2;function g5(c){return function(e){return e==null?void 0:e[c]}}function d3(c){return typeof c=="function"?c:c==null?V1:typeof c=="object"?Y(c)?(n=c[0],o=c[1],y4(n)&&C5(o)?L5(a1(n),o):function(s){var t=n1(s,n);return t===void 0&&t===o?function(r,f){return r!=null&&function(l,m,u){for(var V=-1,h=(m=y1(m,l)).length,z=!1;++V<h;){var H=a1(m[V]);if(!(z=l!=null&&u(l,H)))break;l=l[H]}return z||++V!=h?z:!!(h=l==null?0:l.length)&&g4(h)&&M1(H,h)&&(Y(l)||C1(l))}(r,f,jl)}(s,n):I4(o,t,El|Fl)}):(a=function(s){for(var t=q2(s),r=t.length;r--;){var f=t[r],l=s[f];t[r]=[f,l,C5(l)]}return t}(e=c),a.length==1&&a[0][2]?L5(a[0][0],a[0][1]):function(s){return s===e||function(t,r,f,l){var m=f.length,u=m;if(t==null)return!u;for(t=Object(t);m--;){var V=f[m];if(V[2]?V[1]!==t[V[0]]:!(V[0]in t))return!1}for(;++m<u;){var h=(V=f[m])[0],z=t[h],H=V[1];if(V[2]){if(z===void 0&&!(h in t))return!1}else{var p=new p2;if(!I4(H,z,Ol|Dl,void 0,p))return!1}}return!0}(s,0,a)}):function(s){return y4(s)?g5(a1(s)):function(t){return function(r){return A4(r,t)}}(s)}(c);var e,a,n,o}var x5,b5=function(c,e,a){for(var n=-1,o=Object(c),s=a(c),t=s.length;t--;){var r=s[++n];if(e(o[r],r,o)===!1)break}return c},q4=(x5=function(c,e){return c&&b5(c,e,q2)},function(c,e){if(c==null)return c;if(!B2(c))return x5(c,e);for(var a=c.length,n=-1,o=Object(c);++n<a&&e(o[n],n,o)!==!1;);return c}),U4=function(){return J.Date.now()},Rl=Math.max,Il=Math.min;function W4(c,e,a){var n,o,s,t,r,f,l=0,m=!1,u=!1,V=!0;if(typeof c!="function")throw new TypeError("Expected a function");function h(v){var g=n,C=o;return n=o=void 0,l=v,t=c.apply(C,g)}function z(v){var g=v-f;return f===void 0||g>=e||g<0||u&&v-l>=s}function H(){var v=U4();if(z(v))return p(v);r=setTimeout(H,function(g){var C=e-(g-f);return u?Il(C,s-(g-l)):C}(v))}function p(v){return r=void 0,V&&n?h(v):(n=o=void 0,t)}function d(){var v=U4(),g=z(v);if(n=arguments,o=this,f=v,g){if(r===void 0)return function(C){return l=C,r=setTimeout(H,e),m?h(C):t}(f);if(u)return clearTimeout(r),r=setTimeout(H,e),h(f)}return r===void 0&&(r=setTimeout(H,e)),t}return e=i3(e)||0,K(a)&&(m=!!a.leading,s=(u="maxWait"in a)?Rl(i3(a.maxWait)||0,e):s,V="trailing"in a?!!a.trailing:V),d.cancel=function(){r!==void 0&&clearTimeout(r),l=0,n=f=o=r=void 0},d.flush=function(){return r===void 0?t:p(U4())},d}function G4(c,e,a){(a!==void 0&&!R2(c[e],a)||a===void 0&&!(e in c))&&L4(c,e,a)}function $4(c,e){if((e!=="constructor"||typeof c[e]!="function")&&e!="__proto__")return c[e]}function N5(c,e,a,n,o){c!==e&&b5(e,function(s,t){if(o||(o=new p2),K(s))(function(f,l,m,u,V,h,z){var H=$4(f,m),p=$4(l,m),d=z.get(p);if(d)G4(f,m,d);else{var v,g=h?h(H,p,m+"",f,l,z):void 0,C=g===void 0;if(C){var b=Y(p),M=!b&&L1(p),x=!b&&!M&&N4(p);g=p,b||M||x?Y(H)?g=H:c2(v=H)&&B2(v)?g=t3(H):M?(C=!1,g=K8(p,!0)):x?(C=!1,g=l5(p,!0)):g=[]:T4(p)||C1(p)?(g=H,C1(H)?g=function(w){return I2(w,x1(w))}(H):K(H)&&!h2(H)||(g=f5(p))):C=!1}C&&(z.set(p,g),V(g,p,u,h,z),z.delete(p)),G4(f,m,g)}})(c,e,t,a,N5,n,o);else{var r=n?n($4(c,t),s,t+"",c,e,o):void 0;r===void 0&&(r=s),G4(c,t,r)}},x1)}function y5(c,e,a){if(typeof c!="function")throw new TypeError("Expected a function");return setTimeout(function(){c.apply(void 0,a)},e)}var ql=m3(function(c,e){return y5(c,1,e)}),Y4=m3(function(c,e,a){return y5(c,i3(e)||0,a)});function e2(c,e){var a;return(Y(c)?M4:q4)(c,typeof(a=e)=="function"?a:V1)}function Ul(c,e){for(var a=-1,n=c==null?0:c.length;++a<n;)if(!e(c[a],a,c))return!1;return!0}function Wl(c,e){var a=!0;return q4(c,function(n,o,s){return a=!!e(n,o,s)}),a}function Gl(c,e){var a=[];return q4(c,function(n,o,s){e(n,o,s)&&a.push(n)}),a}var $l=Math.max;function k1(c,e,a){var n=c==null?0:c.length;if(!n)return-1;var o=a==null?0:z4(a);return o<0&&(o=$l(n+o,0)),v8(c,d3(e),o)}var w5,Yl=(w5=k1,function(c,e,a){var n=Object(c);if(!B2(c)){var o=d3(e);c=q2(c),e=function(t){return o(n[t],t,n)}}var s=w5(c,e,a);return s>-1?n[o?c[s]:s]:void 0}),Kl="[object String]";function x2(c){return typeof c=="string"||!Y(c)&&c2(c)&&C2(c)==Kl}function k5(c){return c2(c)&&c.nodeType===1&&!T4(c)}function K4(c){return c==null}var S5=S8(function(c,e,a){N5(c,e,a)});function Xl(c,e){return(c=function(o,s){return s.length<2?o:A4(o,function(t,r,f){var l=-1,m=t.length;r<0&&(r=-r>m?0:m+r),(f=f>m?m:f)<0&&(f+=m),m=r>f?0:f-r>>>0,r>>>=0;for(var u=Array(m);++l<m;)u[l]=t[l+r];return u}(s,0,-1))}(c,e=y1(e,c)))==null||delete c[a1((a=e,n=a==null?0:a.length,n?a[n-1]:void 0))];var a,n}function Jl(c){return T4(c)?void 0:c}var X4=function(c){return d4(k8(c,void 0,Jr),c+"")}(function(c,e){var a={};if(c==null)return a;var n=!1;e=i8(e,function(s){return s=y1(s,c),n||(n=s.length>1),s}),I2(c,e5(c),a),n&&(a=w1(a,7,Jl));for(var o=e.length;o--;)Xl(a,e[o]);return a}),Ql=g5("length"),A5="\\ud800-\\udfff",Zl="["+A5+"]",J4="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",Q4="\\ud83c[\\udffb-\\udfff]",_5="[^"+A5+"]",B5="(?:\\ud83c[\\udde6-\\uddff]){2}",T5="[\\ud800-\\udbff][\\udc00-\\udfff]",P5="(?:"+J4+"|"+Q4+")?",O5="[\\ufe0e\\ufe0f]?",cf=O5+P5+"(?:\\u200d(?:"+[_5,B5,T5].join("|")+")"+O5+P5+")*",ef="(?:"+[_5+J4+"?",J4,B5,T5,Zl].join("|")+")",D5=RegExp(Q4+"(?="+Q4+")|"+ef+cf,"g");function S1(c,e,a){return c==null?c:function(n,o,s,t){if(!K(n))return n;for(var r=-1,f=(o=y1(o,n)).length,l=f-1,m=n;m!=null&&++r<f;){var u=a1(o[r]),V=s;if(u==="__proto__"||u==="constructor"||u==="prototype")return n;if(r!=l){var h=m[u];(V=void 0)==void 0&&(V=K(h)?h:M1(o[r+1])?[]:{})}f3(m,u,V),m=m[u]}return n}(c,e,a)}function j5(c,e){var a=Object.keys(c);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(c);e&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(c,o).enumerable})),a.push.apply(a,n)}return a}function S(c){for(var e=1;e<arguments.length;e++){var a=arguments[e]!=null?arguments[e]:{};e%2?j5(Object(a),!0).forEach(function(n){$(c,n,a[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(c,Object.getOwnPropertyDescriptors(a)):j5(Object(a)).forEach(function(n){Object.defineProperty(c,n,Object.getOwnPropertyDescriptor(a,n))})}return c}function M3(c){return M3=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},M3(c)}function $(c,e,a){return e in c?Object.defineProperty(c,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):c[e]=a,c}function Z4(c,e){return function(a){if(Array.isArray(a))return a}(c)||function(a,n){var o=a==null?null:typeof Symbol<"u"&&a[Symbol.iterator]||a["@@iterator"];if(o!=null){var s,t,r=[],f=!0,l=!1;try{for(o=o.call(a);!(f=(s=o.next()).done)&&(r.push(s.value),!n||r.length!==n);f=!0);}catch(m){l=!0,t=m}finally{try{f||o.return==null||o.return()}finally{if(l)throw t}}return r}}(c,e)||E5(c,e)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()}function A1(c){return function(e){if(Array.isArray(e))return c6(e)}(c)||function(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}(c)||E5(c)||function(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()}function E5(c,e){if(c){if(typeof c=="string")return c6(c,e);var a=Object.prototype.toString.call(c).slice(8,-1);return a==="Object"&&c.constructor&&(a=c.constructor.name),a==="Map"||a==="Set"?Array.from(c):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?c6(c,e):void 0}}function c6(c,e){(e==null||e>c.length)&&(e=c.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=c[a];return n}var F5=function(){},e6={},R5={},I5=null,q5={mark:F5,measure:F5};try{typeof window<"u"&&(e6=window),typeof document<"u"&&(R5=document),typeof MutationObserver<"u"&&(I5=MutationObserver),typeof performance<"u"&&(q5=performance)}catch{}var U5=(e6.navigator||{}).userAgent,W5=U5===void 0?"":U5,T2=e6,R=R5,G5=I5,v3=q5;T2.document;var a6,n6,i6,s6,o6,b2=!!R.documentElement&&!!R.head&&typeof R.addEventListener=="function"&&typeof R.createElement=="function",$5=~W5.indexOf("MSIE")||~W5.indexOf("Trident/"),N2="___FONT_AWESOME___",Y5="fa",K5="svg-inline--fa",W2="data-fa-i2svg",t6="data-fa-pseudo-element",af="data-fa-pseudo-element-pending",r6="data-prefix",l6="data-icon",X5="fontawesome-i2svg",nf="async",sf=["HTML","HEAD","STYLE","SCRIPT"],J5=function(){try{return process.env.NODE_ENV==="production"}catch{return!1}}(),I="classic",U="sharp",f6=[I,U];function _1(c){return new Proxy(c,{get:function(e,a){return a in e?e[a]:e[I]}})}var B1=_1(($(a6={},I,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit",fakd:"kit","fa-kit":"kit","fa-kit-duotone":"kit"}),$(a6,U,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"}),a6)),T1=_1(($(n6={},I,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),$(n6,U,{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"}),n6)),P1=_1(($(i6={},I,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),$(i6,U,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"}),i6)),of=_1(($(s6={},I,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),$(s6,U,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"}),s6)),tf=/fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/,Q5="fa-layers-text",rf=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,lf=_1(($(o6={},I,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),$(o6,U,{900:"fass",400:"fasr",300:"fasl",100:"fast"}),o6)),Z5=[1,2,3,4,5,6,7,8,9,10],ff=Z5.concat([11,12,13,14,15,16,17,18,19,20]),mf=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],G2={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},O1=new Set;Object.keys(T1[I]).map(O1.add.bind(O1)),Object.keys(T1[U]).map(O1.add.bind(O1));var uf=[].concat(f6,A1(O1),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",G2.GROUP,G2.SWAP_OPACITY,G2.PRIMARY,G2.SECONDARY]).concat(Z5.map(function(c){return"".concat(c,"x")})).concat(ff.map(function(c){return"w-".concat(c)})),D1=T2.FontAwesomeConfig||{};R&&typeof R.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(function(c){var e=Z4(c,2),a=e[0],n=e[1],o=function(s){return s===""||s!=="false"&&(s==="true"||s)}(function(s){var t=R.querySelector("script["+s+"]");if(t)return t.getAttribute(s)}(a));o!=null&&(D1[n]=o)});var c7={styleDefault:"solid",familyDefault:"classic",cssPrefix:Y5,replacementClass:K5,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};D1.familyPrefix&&(D1.cssPrefix=D1.familyPrefix);var s1=S(S({},c7),D1);s1.autoReplaceSvg||(s1.observeMutations=!1);var A={};Object.keys(c7).forEach(function(c){Object.defineProperty(A,c,{enumerable:!0,set:function(e){s1[c]=e,m6.forEach(function(a){return a(A)})},get:function(){return s1[c]}})}),Object.defineProperty(A,"familyPrefix",{enumerable:!0,set:function(c){s1.cssPrefix=c,m6.forEach(function(e){return e(A)})},get:function(){return s1.cssPrefix}}),T2.FontAwesomeConfig=A;var m6=[],P2=16,d2={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1},zf="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function j1(){for(var c=12,e="";c-- >0;)e+=zf[62*Math.random()|0];return e}function o1(c){for(var e=[],a=(c||[]).length>>>0;a--;)e[a]=c[a];return e}function u6(c){return c.classList?o1(c.classList):(c.getAttribute("class")||"").split(" ").filter(function(e){return e})}function e7(c){return"".concat(c).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function C3(c){return Object.keys(c||{}).reduce(function(e,a){return e+"".concat(a,": ").concat(c[a].trim(),";")},"")}function z6(c){return c.size!==d2.size||c.x!==d2.x||c.y!==d2.y||c.rotate!==d2.rotate||c.flipX||c.flipY}var pf=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, 0));
          transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function a7(){var c=Y5,e=K5,a=A.cssPrefix,n=A.replacementClass,o=pf;if(a!==c||n!==e){var s=new RegExp("\\.".concat(c,"\\-"),"g"),t=new RegExp("\\--".concat(c,"\\-"),"g"),r=new RegExp("\\.".concat(e),"g");o=o.replace(s,".".concat(a,"-")).replace(t,"--".concat(a,"-")).replace(r,".".concat(n))}return o}var n7=!1;function p6(){A.autoAddCss&&!n7&&(function(c){if(c&&b2){var e=R.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=c;for(var a=R.head.childNodes,n=null,o=a.length-1;o>-1;o--){var s=a[o],t=(s.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(t)>-1&&(n=s)}R.head.insertBefore(e,n)}}(a7()),n7=!0)}var Hf={mixout:function(){return{dom:{css:a7,insertCss:p6}}},hooks:function(){return{beforeDOMElementCreation:function(){p6()},beforeI2svg:function(){p6()}}}},y2=T2||{};y2[N2]||(y2[N2]={}),y2[N2].styles||(y2[N2].styles={}),y2[N2].hooks||(y2[N2].hooks={}),y2[N2].shims||(y2[N2].shims=[]);var H2=y2[N2],i7=[],H6=!1;function E1(c){var e=c.tag,a=c.attributes,n=a===void 0?{}:a,o=c.children,s=o===void 0?[]:o;return typeof c=="string"?e7(c):"<".concat(e," ").concat(function(t){return Object.keys(t||{}).reduce(function(r,f){return r+"".concat(f,'="').concat(e7(t[f]),'" ')},"").trim()}(n),">").concat(s.map(E1).join(""),"</").concat(e,">")}function s7(c,e,a){if(c&&c[e]&&c[e][a])return{prefix:e,iconName:a,icon:c[e][a]}}b2&&((H6=(R.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(R.readyState))||R.addEventListener("DOMContentLoaded",function c(){R.removeEventListener("DOMContentLoaded",c),H6=1,i7.map(function(e){return e()})}));var V6,h6,d6,M6=function(c,e,a,n){var o,s,t,r=Object.keys(c),f=r.length,l=e;for(a===void 0?(o=1,t=c[r[0]]):(o=0,t=a);o<f;o++)t=l(t,c[s=r[o]],s,c);return t};function o7(c){var e=function(a){for(var n=[],o=0,s=a.length;o<s;){var t=a.charCodeAt(o++);if(t>=55296&&t<=56319&&o<s){var r=a.charCodeAt(o++);(64512&r)==56320?n.push(((1023&t)<<10)+(1023&r)+65536):(n.push(t),o--)}else n.push(t)}return n}(c);return e.length===1?e[0].toString(16):null}function t7(c){return Object.keys(c).reduce(function(e,a){var n=c[a];return n.icon?e[n.iconName]=n.icon:e[a]=n,e},{})}function v6(c,e){var a=(arguments.length>2&&arguments[2]!==void 0?arguments[2]:{}).skipHooks,n=a!==void 0&&a,o=t7(e);typeof H2.hooks.addPack!="function"||n?H2.styles[c]=S(S({},H2.styles[c]||{}),o):H2.hooks.addPack(c,t7(e)),c==="fas"&&v6("fa",e)}var r7,t1=H2.styles,Vf=H2.shims,hf=($(V6={},I,Object.values(P1[I])),$(V6,U,Object.values(P1[U])),V6),C6=null,l7={},f7={},m7={},u7={},z7={},df=($(h6={},I,Object.keys(B1[I])),$(h6,U,Object.keys(B1[U])),h6),p7=function(){var c=function(n){return M6(t1,function(o,s,t){return o[t]=M6(s,n,{}),o},{})};l7=c(function(n,o,s){return o[3]&&(n[o[3]]=s),o[2]&&o[2].filter(function(t){return typeof t=="number"}).forEach(function(t){n[t.toString(16)]=s}),n}),f7=c(function(n,o,s){return n[s]=s,o[2]&&o[2].filter(function(t){return typeof t=="string"}).forEach(function(t){n[t]=s}),n}),z7=c(function(n,o,s){var t=o[2];return n[s]=s,t.forEach(function(r){n[r]=s}),n});var e="far"in t1||A.autoFetchSvg,a=M6(Vf,function(n,o){var s=o[0],t=o[1],r=o[2];return t!=="far"||e||(t="fas"),typeof s=="string"&&(n.names[s]={prefix:t,iconName:r}),typeof s=="number"&&(n.unicodes[s.toString(16)]={prefix:t,iconName:r}),n},{names:{},unicodes:{}});m7=a.names,u7=a.unicodes,C6=L3(A.styleDefault,{family:A.familyDefault})};function L6(c,e){return(l7[c]||{})[e]}function $2(c,e){return(z7[c]||{})[e]}function H7(c){return m7[c]||{prefix:null,iconName:null}}function O2(){return C6}r7=function(c){C6=L3(c.styleDefault,{family:A.familyDefault})},m6.push(r7),p7();var g6=function(){return{prefix:null,iconName:null,rest:[]}};function L3(c){var e=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).family,a=e===void 0?I:e,n=B1[a][c],o=T1[a][c]||T1[a][n],s=c in H2.styles?c:null;return o||s||null}var V7=($(d6={},I,Object.keys(P1[I])),$(d6,U,Object.keys(P1[U])),d6);function g3(c){var e,a=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).skipLookups,n=a!==void 0&&a,o=($(e={},I,"".concat(A.cssPrefix,"-").concat(I)),$(e,U,"".concat(A.cssPrefix,"-").concat(U)),e),s=null,t=I;(c.includes(o[I])||c.some(function(f){return V7[I].includes(f)}))&&(t=I),(c.includes(o[U])||c.some(function(f){return V7[U].includes(f)}))&&(t=U);var r=c.reduce(function(f,l){var m=function(h,z){var H,p=z.split("-"),d=p[0],v=p.slice(1).join("-");return d!==h||v===""||(H=v,~uf.indexOf(H))?null:v}(A.cssPrefix,l);if(t1[l]?(l=hf[t].includes(l)?of[t][l]:l,s=l,f.prefix=l):df[t].indexOf(l)>-1?(s=l,f.prefix=L3(l,{family:t})):m?f.iconName=m:l!==A.replacementClass&&l!==o[I]&&l!==o[U]&&f.rest.push(l),!n&&f.prefix&&f.iconName){var u=s==="fa"?H7(f.iconName):{},V=$2(f.prefix,f.iconName);u.prefix&&(s=null),f.iconName=u.iconName||V||f.iconName,f.prefix=u.prefix||f.prefix,f.prefix!=="far"||t1.far||!t1.fas||A.autoFetchSvg||(f.prefix="fas")}return f},g6());return(c.includes("fa-brands")||c.includes("fab"))&&(r.prefix="fab"),(c.includes("fa-duotone")||c.includes("fad"))&&(r.prefix="fad"),r.prefix||t!==U||!t1.fass&&!A.autoFetchSvg||(r.prefix="fass",r.iconName=$2(r.prefix,r.iconName)||r.iconName),r.prefix!=="fa"&&s!=="fa"||(r.prefix=O2()||"fas"),r}var Mf=function(){function c(){(function(n,o){if(!(n instanceof o))throw new TypeError("Cannot call a class as a function")})(this,c),this.definitions={}}return e=c,a=[{key:"add",value:function(){for(var n=this,o=arguments.length,s=new Array(o),t=0;t<o;t++)s[t]=arguments[t];var r=s.reduce(this._pullDefinitions,{});Object.keys(r).forEach(function(f){n.definitions[f]=S(S({},n.definitions[f]||{}),r[f]),v6(f,r[f]);var l=P1[I][f];l&&v6(l,r[f]),p7()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,o){var s=o.prefix&&o.iconName&&o.icon?{0:o}:o;return Object.keys(s).map(function(t){var r=s[t],f=r.prefix,l=r.iconName,m=r.icon,u=m[2];n[f]||(n[f]={}),u.length>0&&u.forEach(function(V){typeof V=="string"&&(n[f][V]=m)}),n[f][l]=m}),n}}],a&&function(n,o){for(var s=0;s<o.length;s++){var t=o[s];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}(e.prototype,a),Object.defineProperty(e,"prototype",{writable:!1}),c;var e,a}(),h7=[],r1={},l1={},vf=Object.keys(l1);function x6(c,e){for(var a=arguments.length,n=new Array(a>2?a-2:0),o=2;o<a;o++)n[o-2]=arguments[o];return(r1[c]||[]).forEach(function(s){e=s.apply(null,[e].concat(n))}),e}function Y2(c){for(var e=arguments.length,a=new Array(e>1?e-1:0),n=1;n<e;n++)a[n-1]=arguments[n];(r1[c]||[]).forEach(function(o){o.apply(null,a)})}function w2(){var c=arguments[0],e=Array.prototype.slice.call(arguments,1);return l1[c]?l1[c].apply(null,e):void 0}function b6(c){c.prefix==="fa"&&(c.prefix="fas");var e=c.iconName,a=c.prefix||O2();if(e)return e=$2(a,e)||e,s7(d7.definitions,a,e)||s7(H2.styles,a,e)}var d7=new Mf,Cf={i2svg:function(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return b2?(Y2("beforeI2svg",c),w2("pseudoElements2svg",c),w2("i2svg",c)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var c,e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=e.autoReplaceSvgRoot;A.autoReplaceSvg===!1&&(A.autoReplaceSvg=!0),A.observeMutations=!0,c=function(){Lf({autoReplaceSvgRoot:a}),Y2("watch",e)},b2&&(H6?setTimeout(c,0):i7.push(c))}},K2={noAuto:function(){A.autoReplaceSvg=!1,A.observeMutations=!1,Y2("noAuto")},config:A,dom:Cf,parse:{icon:function(c){if(c===null)return null;if(M3(c)==="object"&&c.prefix&&c.iconName)return{prefix:c.prefix,iconName:$2(c.prefix,c.iconName)||c.iconName};if(Array.isArray(c)&&c.length===2){var e=c[1].indexOf("fa-")===0?c[1].slice(3):c[1],a=L3(c[0]);return{prefix:a,iconName:$2(a,e)||e}}if(typeof c=="string"&&(c.indexOf("".concat(A.cssPrefix,"-"))>-1||c.match(tf))){var n=g3(c.split(" "),{skipLookups:!0});return{prefix:n.prefix||O2(),iconName:$2(n.prefix,n.iconName)||n.iconName}}if(typeof c=="string"){var o=O2();return{prefix:o,iconName:$2(o,c)||c}}}},library:d7,findIconDefinition:b6,toHtml:E1},Lf=function(){var c=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:{}).autoReplaceSvgRoot,e=c===void 0?R:c;(Object.keys(H2.styles).length>0||A.autoFetchSvg)&&b2&&A.autoReplaceSvg&&K2.dom.i2svg({node:e})};function x3(c,e){return Object.defineProperty(c,"abstract",{get:e}),Object.defineProperty(c,"html",{get:function(){return c.abstract.map(function(a){return E1(a)})}}),Object.defineProperty(c,"node",{get:function(){if(b2){var a=R.createElement("div");return a.innerHTML=c.html,a.children}}}),c}function N6(c){var e=c.icons,a=e.main,n=e.mask,o=c.prefix,s=c.iconName,t=c.transform,r=c.symbol,f=c.title,l=c.maskId,m=c.titleId,u=c.extra,V=c.watchable,h=V!==void 0&&V,z=n.found?n:a,H=z.width,p=z.height,d=o==="fak",v=[A.replacementClass,s?"".concat(A.cssPrefix,"-").concat(s):""].filter(function(y){return u.classes.indexOf(y)===-1}).filter(function(y){return y!==""||!!y}).concat(u.classes).join(" "),g={children:[],attributes:S(S({},u.attributes),{},{"data-prefix":o,"data-icon":s,class:v,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(H," ").concat(p)})},C=d&&!~u.classes.indexOf("fa-fw")?{width:"".concat(H/p*16*.0625,"em")}:{};h&&(g.attributes[W2]=""),f&&(g.children.push({tag:"title",attributes:{id:g.attributes["aria-labelledby"]||"title-".concat(m||j1())},children:[f]}),delete g.attributes.title);var b=S(S({},g),{},{prefix:o,iconName:s,main:a,mask:n,maskId:l,transform:t,symbol:r,styles:S(S({},C),u.styles)}),M=n.found&&a.found?w2("generateAbstractMask",b)||{children:[],attributes:{}}:w2("generateAbstractIcon",b)||{children:[],attributes:{}},x=M.children,w=M.attributes;return b.children=x,b.attributes=w,r?function(y){var _=y.prefix,L=y.iconName,N=y.children,k=y.attributes,T=y.symbol,D=T===!0?"".concat(_,"-").concat(A.cssPrefix,"-").concat(L):T;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:S(S({},k),{},{id:D}),children:N}]}]}(b):function(y){var _=y.children,L=y.main,N=y.mask,k=y.attributes,T=y.styles,D=y.transform;if(z6(D)&&L.found&&!N.found){var P={x:L.width/L.height/2,y:.5};k.style=C3(S(S({},T),{},{"transform-origin":"".concat(P.x+D.x/16,"em ").concat(P.y+D.y/16,"em")}))}return[{tag:"svg",attributes:k,children:_}]}(b)}function M7(c){var e=c.content,a=c.width,n=c.height,o=c.transform,s=c.title,t=c.extra,r=c.watchable,f=r!==void 0&&r,l=S(S(S({},t.attributes),s?{title:s}:{}),{},{class:t.classes.join(" ")});f&&(l[W2]="");var m=S({},t.styles);z6(o)&&(m.transform=function(h){var z=h.transform,H=h.width,p=H===void 0?16:H,d=h.height,v=d===void 0?16:d,g=h.startCentered,C=g!==void 0&&g,b="";return b+=C&&$5?"translate(".concat(z.x/P2-p/2,"em, ").concat(z.y/P2-v/2,"em) "):C?"translate(calc(-50% + ".concat(z.x/P2,"em), calc(-50% + ").concat(z.y/P2,"em)) "):"translate(".concat(z.x/P2,"em, ").concat(z.y/P2,"em) "),(b+="scale(".concat(z.size/P2*(z.flipX?-1:1),", ").concat(z.size/P2*(z.flipY?-1:1),") "))+"rotate(".concat(z.rotate,"deg) ")}({transform:o,startCentered:!0,width:a,height:n}),m["-webkit-transform"]=m.transform);var u=C3(m);u.length>0&&(l.style=u);var V=[];return V.push({tag:"span",attributes:l,children:[e]}),s&&V.push({tag:"span",attributes:{class:"sr-only"},children:[s]}),V}var y6=H2.styles;function w6(c){var e=c[0],a=c[1],n=Z4(c.slice(4),1)[0];return{found:!0,width:e,height:a,icon:Array.isArray(n)?{tag:"g",attributes:{class:"".concat(A.cssPrefix,"-").concat(G2.GROUP)},children:[{tag:"path",attributes:{class:"".concat(A.cssPrefix,"-").concat(G2.SECONDARY),fill:"currentColor",d:n[0]}},{tag:"path",attributes:{class:"".concat(A.cssPrefix,"-").concat(G2.PRIMARY),fill:"currentColor",d:n[1]}}]}:{tag:"path",attributes:{fill:"currentColor",d:n}}}}var gf={found:!1,width:512,height:512};function k6(c,e){var a=e;return e==="fa"&&A.styleDefault!==null&&(e=O2()),new Promise(function(n,o){if(w2("missingIconAbstract"),a==="fa"){var s=H7(c)||{};c=s.iconName||c,e=s.prefix||e}if(c&&e&&y6[e]&&y6[e][c])return n(w6(y6[e][c]));(function(t,r){J5||A.showMissingIcons||!t||console.error('Icon with name "'.concat(t,'" and prefix "').concat(r,'" is missing.'))})(c,e),n(S(S({},gf),{},{icon:A.showMissingIcons&&c&&w2("missingIconAbstract")||{}}))})}var v7=function(){},S6=A.measurePerformance&&v3&&v3.mark&&v3.measure?v3:{mark:v7,measure:v7},F1='FA "6.5.2"',C7=function(c){S6.mark("".concat(F1," ").concat(c," ends")),S6.measure("".concat(F1," ").concat(c),"".concat(F1," ").concat(c," begins"),"".concat(F1," ").concat(c," ends"))},A6={begin:function(c){return S6.mark("".concat(F1," ").concat(c," begins")),function(){return C7(c)}},end:C7},b3=function(){};function L7(c){return typeof(c.getAttribute?c.getAttribute(W2):null)=="string"}function xf(c){return R.createElementNS("http://www.w3.org/2000/svg",c)}function bf(c){return R.createElement(c)}function g7(c){var e=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).ceFn,a=e===void 0?c.tag==="svg"?xf:bf:e;if(typeof c=="string")return R.createTextNode(c);var n=a(c.tag);return Object.keys(c.attributes||[]).forEach(function(o){n.setAttribute(o,c.attributes[o])}),(c.children||[]).forEach(function(o){n.appendChild(g7(o,{ceFn:a}))}),n}var N3={replace:function(c){var e=c[0];if(e.parentNode)if(c[1].forEach(function(n){e.parentNode.insertBefore(g7(n),e)}),e.getAttribute(W2)===null&&A.keepOriginalSource){var a=R.createComment(function(n){var o=" ".concat(n.outerHTML," ");return"".concat(o,"Font Awesome fontawesome.com ")}(e));e.parentNode.replaceChild(a,e)}else e.remove()},nest:function(c){var e=c[0],a=c[1];if(~u6(e).indexOf(A.replacementClass))return N3.replace(c);var n=new RegExp("".concat(A.cssPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){var o=a[0].attributes.class.split(" ").reduce(function(t,r){return r===A.replacementClass||r.match(n)?t.toSvg.push(r):t.toNode.push(r),t},{toNode:[],toSvg:[]});a[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",o.toNode.join(" "))}var s=a.map(function(t){return E1(t)}).join(`
`);e.setAttribute(W2,""),e.innerHTML=s}};function x7(c){c()}function b7(c,e){var a=typeof e=="function"?e:b3;if(c.length===0)a();else{var n=x7;A.mutateApproach===nf&&(n=T2.requestAnimationFrame||x7),n(function(){var o=A.autoReplaceSvg===!0?N3.replace:N3[A.autoReplaceSvg]||N3.replace,s=A6.begin("mutate");c.map(o),s(),a()})}}var _6=!1;function N7(){_6=!0}function B6(){_6=!1}var y3=null;function y7(c){if(G5&&A.observeMutations){var e=c.treeCallback,a=e===void 0?b3:e,n=c.nodeCallback,o=n===void 0?b3:n,s=c.pseudoElementsCallback,t=s===void 0?b3:s,r=c.observeMutationsRoot,f=r===void 0?R:r;y3=new G5(function(l){if(!_6){var m=O2();o1(l).forEach(function(u){if(u.type==="childList"&&u.addedNodes.length>0&&!L7(u.addedNodes[0])&&(A.searchPseudoElements&&t(u.target),a(u.target)),u.type==="attributes"&&u.target.parentNode&&A.searchPseudoElements&&t(u.target.parentNode),u.type==="attributes"&&L7(u.target)&&~mf.indexOf(u.attributeName))if(u.attributeName==="class"&&function(p){var d=p.getAttribute?p.getAttribute(r6):null,v=p.getAttribute?p.getAttribute(l6):null;return d&&v}(u.target)){var V=g3(u6(u.target)),h=V.prefix,z=V.iconName;u.target.setAttribute(r6,h||m),z&&u.target.setAttribute(l6,z)}else(H=u.target)&&H.classList&&H.classList.contains&&H.classList.contains(A.replacementClass)&&o(u.target);var H})}}),b2&&y3.observe(f,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function w7(c){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=function(l){var m,u,V=l.getAttribute("data-prefix"),h=l.getAttribute("data-icon"),z=l.innerText!==void 0?l.innerText.trim():"",H=g3(u6(l));return H.prefix||(H.prefix=O2()),V&&h&&(H.prefix=V,H.iconName=h),H.iconName&&H.prefix||(H.prefix&&z.length>0&&(H.iconName=(m=H.prefix,u=l.innerText,(f7[m]||{})[u]||L6(H.prefix,o7(l.innerText)))),!H.iconName&&A.autoFetchSvg&&l.firstChild&&l.firstChild.nodeType===Node.TEXT_NODE&&(H.iconName=l.firstChild.data)),H}(c),n=a.iconName,o=a.prefix,s=a.rest,t=function(l){var m=o1(l.attributes).reduce(function(h,z){return h.name!=="class"&&h.name!=="style"&&(h[z.name]=z.value),h},{}),u=l.getAttribute("title"),V=l.getAttribute("data-fa-title-id");return A.autoA11y&&(u?m["aria-labelledby"]="".concat(A.replacementClass,"-title-").concat(V||j1()):(m["aria-hidden"]="true",m.focusable="false")),m}(c),r=x6("parseNodeAttributes",{},c),f=e.styleParser?function(l){var m=l.getAttribute("style"),u=[];return m&&(u=m.split(";").reduce(function(V,h){var z=h.split(":"),H=z[0],p=z.slice(1);return H&&p.length>0&&(V[H]=p.join(":").trim()),V},{})),u}(c):[];return S({iconName:n,title:c.getAttribute("title"),titleId:c.getAttribute("data-fa-title-id"),prefix:o,transform:d2,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:s,styles:f,attributes:t}},r)}var Nf=H2.styles;function k7(c){var e=A.autoReplaceSvg==="nest"?w7(c,{styleParser:!1}):w7(c);return~e.extra.classes.indexOf(Q5)?w2("generateLayersText",c,e):w2("generateSvgReplacementMutation",c,e)}var D2=new Set;function S7(c){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!b2)return Promise.resolve();var a=R.documentElement.classList,n=function(m){return a.add("".concat(X5,"-").concat(m))},o=function(m){return a.remove("".concat(X5,"-").concat(m))},s=A.autoFetchSvg?D2:f6.map(function(m){return"fa-".concat(m)}).concat(Object.keys(Nf));s.includes("fa")||s.push("fa");var t=[".".concat(Q5,":not([").concat(W2,"])")].concat(s.map(function(m){return".".concat(m,":not([").concat(W2,"])")})).join(", ");if(t.length===0)return Promise.resolve();var r=[];try{r=o1(c.querySelectorAll(t))}catch{}if(!(r.length>0))return Promise.resolve();n("pending"),o("complete");var f=A6.begin("onTree"),l=r.reduce(function(m,u){try{var V=k7(u);V&&m.push(V)}catch(h){J5||h.name==="MissingIcon"&&console.error(h)}return m},[]);return new Promise(function(m,u){Promise.all(l).then(function(V){b7(V,function(){n("active"),n("complete"),o("pending"),typeof e=="function"&&e(),f(),m()})}).catch(function(V){f(),u(V)})})}function yf(c){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;k7(c).then(function(a){a&&b7([a],e)})}f6.map(function(c){D2.add("fa-".concat(c))}),Object.keys(B1[I]).map(D2.add.bind(D2)),Object.keys(B1[U]).map(D2.add.bind(D2)),D2=A1(D2);var wf=function(c){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.transform,n=a===void 0?d2:a,o=e.symbol,s=o!==void 0&&o,t=e.mask,r=t===void 0?null:t,f=e.maskId,l=f===void 0?null:f,m=e.title,u=m===void 0?null:m,V=e.titleId,h=V===void 0?null:V,z=e.classes,H=z===void 0?[]:z,p=e.attributes,d=p===void 0?{}:p,v=e.styles,g=v===void 0?{}:v;if(c){var C=c.prefix,b=c.iconName,M=c.icon;return x3(S({type:"icon"},c),function(){return Y2("beforeDOMElementCreation",{iconDefinition:c,params:e}),A.autoA11y&&(u?d["aria-labelledby"]="".concat(A.replacementClass,"-title-").concat(h||j1()):(d["aria-hidden"]="true",d.focusable="false")),N6({icons:{main:w6(M),mask:r?w6(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:C,iconName:b,transform:S(S({},d2),n),symbol:s,title:u,maskId:l,titleId:h,extra:{attributes:d,styles:g,classes:H}})})}},kf={mixout:function(){return{icon:(c=wf,function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=(e||{}).icon?e:b6(e||{}),o=a.mask;return o&&(o=(o||{}).icon?o:b6(o||{})),c(n,S(S({},a),{},{mask:o}))})};var c},hooks:function(){return{mutationObserverCallbacks:function(c){return c.treeCallback=S7,c.nodeCallback=yf,c}}},provides:function(c){c.i2svg=function(e){var a=e.node,n=a===void 0?R:a,o=e.callback;return S7(n,o===void 0?function(){}:o)},c.generateSvgReplacementMutation=function(e,a){var n=a.iconName,o=a.title,s=a.titleId,t=a.prefix,r=a.transform,f=a.symbol,l=a.mask,m=a.maskId,u=a.extra;return new Promise(function(V,h){Promise.all([k6(n,t),l.iconName?k6(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(z){var H=Z4(z,2),p=H[0],d=H[1];V([e,N6({icons:{main:p,mask:d},prefix:t,iconName:n,transform:r,symbol:f,maskId:m,title:o,titleId:s,extra:u,watchable:!0})])}).catch(h)})},c.generateAbstractIcon=function(e){var a,n=e.children,o=e.attributes,s=e.main,t=e.transform,r=C3(e.styles);return r.length>0&&(o.style=r),z6(t)&&(a=w2("generateAbstractTransformGrouping",{main:s,transform:t,containerWidth:s.width,iconWidth:s.width})),n.push(a||s.icon),{children:n,attributes:o}}}},Sf={mixout:function(){return{layer:function(c){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.classes,n=a===void 0?[]:a;return x3({type:"layer"},function(){Y2("beforeDOMElementCreation",{assembler:c,params:e});var o=[];return c(function(s){Array.isArray(s)?s.map(function(t){o=o.concat(t.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(A.cssPrefix,"-layers")].concat(A1(n)).join(" ")},children:o}]})}}}},Af={mixout:function(){return{counter:function(c){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.title,n=a===void 0?null:a,o=e.classes,s=o===void 0?[]:o,t=e.attributes,r=t===void 0?{}:t,f=e.styles,l=f===void 0?{}:f;return x3({type:"counter",content:c},function(){return Y2("beforeDOMElementCreation",{content:c,params:e}),function(m){var u=m.content,V=m.title,h=m.extra,z=S(S(S({},h.attributes),V?{title:V}:{}),{},{class:h.classes.join(" ")}),H=C3(h.styles);H.length>0&&(z.style=H);var p=[];return p.push({tag:"span",attributes:z,children:[u]}),V&&p.push({tag:"span",attributes:{class:"sr-only"},children:[V]}),p}({content:c.toString(),title:n,extra:{attributes:r,styles:l,classes:["".concat(A.cssPrefix,"-layers-counter")].concat(A1(s))}})})}}}},_f={mixout:function(){return{text:function(c){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.transform,n=a===void 0?d2:a,o=e.title,s=o===void 0?null:o,t=e.classes,r=t===void 0?[]:t,f=e.attributes,l=f===void 0?{}:f,m=e.styles,u=m===void 0?{}:m;return x3({type:"text",content:c},function(){return Y2("beforeDOMElementCreation",{content:c,params:e}),M7({content:c,transform:S(S({},d2),n),title:s,extra:{attributes:l,styles:u,classes:["".concat(A.cssPrefix,"-layers-text")].concat(A1(r))}})})}}},provides:function(c){c.generateLayersText=function(e,a){var n=a.title,o=a.transform,s=a.extra,t=null,r=null;if($5){var f=parseInt(getComputedStyle(e).fontSize,10),l=e.getBoundingClientRect();t=l.width/f,r=l.height/f}return A.autoA11y&&!n&&(s.attributes["aria-hidden"]="true"),Promise.resolve([e,M7({content:e.innerHTML,width:t,height:r,transform:o,title:n,extra:s,watchable:!0})])}}},Bf=new RegExp('"',"ug"),A7=[1105920,1112319];function _7(c,e){var a="".concat(af).concat(e.replace(":","-"));return new Promise(function(n,o){if(c.getAttribute(a)!==null)return n();var s,t,r,f=o1(c.children).filter(function(y){return y.getAttribute(t6)===e})[0],l=T2.getComputedStyle(c,e),m=l.getPropertyValue("font-family").match(rf),u=l.getPropertyValue("font-weight"),V=l.getPropertyValue("content");if(f&&!m)return c.removeChild(f),n();if(m&&V!=="none"&&V!==""){var h=l.getPropertyValue("content"),z=~["Sharp"].indexOf(m[2])?U:I,H=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(m[2])?T1[z][m[2].toLowerCase()]:lf[z][u],p=function(y){var _,L,N,k,T=y.replace(Bf,""),D=(N=(_=T).length,(k=_.charCodeAt(0))>=55296&&k<=56319&&N>1&&(L=_.charCodeAt(1))>=56320&&L<=57343?1024*(k-55296)+L-56320+65536:k),P=D>=A7[0]&&D<=A7[1],W=T.length===2&&T[0]===T[1];return{value:o7(W?T[0]:T),isSecondary:P||W}}(h),d=p.value,v=p.isSecondary,g=m[0].startsWith("FontAwesome"),C=L6(H,d),b=C;if(g){var M=(t=u7[s=d],r=L6("fas",s),t||(r?{prefix:"fas",iconName:r}:null)||{prefix:null,iconName:null});M.iconName&&M.prefix&&(C=M.iconName,H=M.prefix)}if(!C||v||f&&f.getAttribute(r6)===H&&f.getAttribute(l6)===b)n();else{c.setAttribute(a,b),f&&c.removeChild(f);var x={iconName:null,title:null,titleId:null,prefix:null,transform:d2,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}},w=x.extra;w.attributes[t6]=e,k6(C,H).then(function(y){var _=N6(S(S({},x),{},{icons:{main:y,mask:g6()},prefix:H,iconName:b,extra:w,watchable:!0})),L=R.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?c.insertBefore(L,c.firstChild):c.appendChild(L),L.outerHTML=_.map(function(N){return E1(N)}).join(`
`),c.removeAttribute(a),n()}).catch(o)}}else n()})}function Tf(c){return Promise.all([_7(c,"::before"),_7(c,"::after")])}function Pf(c){return!(c.parentNode===document.head||~sf.indexOf(c.tagName.toUpperCase())||c.getAttribute(t6)||c.parentNode&&c.parentNode.tagName==="svg")}function B7(c){if(b2)return new Promise(function(e,a){var n=o1(c.querySelectorAll("*")).filter(Pf).map(Tf),o=A6.begin("searchPseudoElements");N7(),Promise.all(n).then(function(){o(),B6(),e()}).catch(function(){o(),B6(),a()})})}var T7=!1,P7=function(c){return c.toLowerCase().split(" ").reduce(function(e,a){var n=a.toLowerCase().split("-"),o=n[0],s=n.slice(1).join("-");if(o&&s==="h")return e.flipX=!0,e;if(o&&s==="v")return e.flipY=!0,e;if(s=parseFloat(s),isNaN(s))return e;switch(o){case"grow":e.size=e.size+s;break;case"shrink":e.size=e.size-s;break;case"left":e.x=e.x-s;break;case"right":e.x=e.x+s;break;case"up":e.y=e.y-s;break;case"down":e.y=e.y+s;break;case"rotate":e.rotate=e.rotate+s}return e},{size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0})},Of={mixout:function(){return{parse:{transform:function(c){return P7(c)}}}},hooks:function(){return{parseNodeAttributes:function(c,e){var a=e.getAttribute("data-fa-transform");return a&&(c.transform=P7(a)),c}}},provides:function(c){c.generateAbstractTransformGrouping=function(e){var a=e.main,n=e.transform,o=e.containerWidth,s=e.iconWidth,t={transform:"translate(".concat(o/2," 256)")},r="translate(".concat(32*n.x,", ").concat(32*n.y,") "),f="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),l="rotate(".concat(n.rotate," 0 0)"),m={outer:t,inner:{transform:"".concat(r," ").concat(f," ").concat(l)},path:{transform:"translate(".concat(s/2*-1," -256)")}};return{tag:"g",attributes:S({},m.outer),children:[{tag:"g",attributes:S({},m.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:S(S({},a.icon.attributes),m.path)}]}]}}}},T6={x:0,y:0,width:"100%",height:"100%"};function O7(c){var e=!(arguments.length>1&&arguments[1]!==void 0)||arguments[1];return c.attributes&&(c.attributes.fill||e)&&(c.attributes.fill="black"),c}var R1,Df={hooks:function(){return{parseNodeAttributes:function(c,e){var a=e.getAttribute("data-fa-mask"),n=a?g3(a.split(" ").map(function(o){return o.trim()})):g6();return n.prefix||(n.prefix=O2()),c.mask=n,c.maskId=e.getAttribute("data-fa-mask-id"),c}}},provides:function(c){c.generateAbstractMask=function(e){var a,n=e.children,o=e.attributes,s=e.main,t=e.mask,r=e.maskId,f=e.transform,l=s.width,m=s.icon,u=t.width,V=t.icon,h=function(M){var x=M.transform,w=M.iconWidth,y={transform:"translate(".concat(M.containerWidth/2," 256)")},_="translate(".concat(32*x.x,", ").concat(32*x.y,") "),L="scale(".concat(x.size/16*(x.flipX?-1:1),", ").concat(x.size/16*(x.flipY?-1:1),") "),N="rotate(".concat(x.rotate," 0 0)");return{outer:y,inner:{transform:"".concat(_," ").concat(L," ").concat(N)},path:{transform:"translate(".concat(w/2*-1," -256)")}}}({transform:f,containerWidth:u,iconWidth:l}),z={tag:"rect",attributes:S(S({},T6),{},{fill:"white"})},H=m.children?{children:m.children.map(O7)}:{},p={tag:"g",attributes:S({},h.inner),children:[O7(S({tag:m.tag,attributes:S(S({},m.attributes),h.path)},H))]},d={tag:"g",attributes:S({},h.outer),children:[p]},v="mask-".concat(r||j1()),g="clip-".concat(r||j1()),C={tag:"mask",attributes:S(S({},T6),{},{id:v,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[z,d]},b={tag:"defs",children:[{tag:"clipPath",attributes:{id:g},children:(a=V,a.tag==="g"?a.children:[a])},C]};return n.push(b,{tag:"rect",attributes:S({fill:"currentColor","clip-path":"url(#".concat(g,")"),mask:"url(#".concat(v,")")},T6)}),{children:n,attributes:o}}}},jf={provides:function(c){var e=!1;T2.matchMedia&&(e=T2.matchMedia("(prefers-reduced-motion: reduce)").matches),c.missingIconAbstract=function(){var a=[],n={fill:"currentColor"},o={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:S(S({},n),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var s=S(S({},o),{},{attributeName:"opacity"}),t={tag:"circle",attributes:S(S({},n),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||t.children.push({tag:"animate",attributes:S(S({},o),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:S(S({},s),{},{values:"1;0;1;1;0;1;"})}),a.push(t),a.push({tag:"path",attributes:S(S({},n),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:S(S({},s),{},{values:"1;0;0;0;0;1;"})}]}),e||a.push({tag:"path",attributes:S(S({},n),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:S(S({},s),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}};R1=K2,h7=[Hf,kf,Sf,Af,_f,{hooks:function(){return{mutationObserverCallbacks:function(c){return c.pseudoElementsCallback=B7,c}}},provides:function(c){c.pseudoElements2svg=function(e){var a=e.node,n=a===void 0?R:a;A.searchPseudoElements&&B7(n)}}},{mixout:function(){return{dom:{unwatch:function(){N7(),T7=!0}}}},hooks:function(){return{bootstrap:function(){y7(x6("mutationObserverCallbacks",{}))},noAuto:function(){y3&&y3.disconnect()},watch:function(c){var e=c.observeMutationsRoot;T7?B6():y7(x6("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}},Of,Df,jf,{hooks:function(){return{parseNodeAttributes:function(c,e){var a=e.getAttribute("data-fa-symbol"),n=a!==null&&(a===""||a);return c.symbol=n,c}}}}],r1={},Object.keys(l1).forEach(function(c){vf.indexOf(c)===-1&&delete l1[c]}),h7.forEach(function(c){var e=c.mixout?c.mixout():{};if(Object.keys(e).forEach(function(n){typeof e[n]=="function"&&(R1[n]=e[n]),M3(e[n])==="object"&&Object.keys(e[n]).forEach(function(o){R1[n]||(R1[n]={}),R1[n][o]=e[n][o]})}),c.hooks){var a=c.hooks();Object.keys(a).forEach(function(n){r1[n]||(r1[n]=[]),r1[n].push(a[n])})}c.provides&&c.provides(l1)});var D7=K2.config,Ef=K2.library,w3=K2.parse,Ff=K2.icon,Rf=K2.text;function j7(c,e){var a=Object.keys(c);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(c);e&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(c,o).enumerable})),a.push.apply(a,n)}return a}function V2(c){for(var e=1;e<arguments.length;e++){var a=arguments[e]!=null?arguments[e]:{};e%2?j7(Object(a),!0).forEach(function(n){a2(c,n,a[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(c,Object.getOwnPropertyDescriptors(a)):j7(Object(a)).forEach(function(n){Object.defineProperty(c,n,Object.getOwnPropertyDescriptor(a,n))})}return c}function k3(c){return k3=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k3(c)}function a2(c,e,a){return(e=typeof(n=function(o,s){if(typeof o!="object"||!o)return o;var t=o[Symbol.toPrimitive];if(t!==void 0){var r=t.call(o,"string");if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e))=="symbol"?n:n+"")in c?Object.defineProperty(c,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):c[e]=a,c;var n}function P6(c){return function(e){if(Array.isArray(e))return O6(e)}(c)||function(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}(c)||function(e,a){if(e){if(typeof e=="string")return O6(e,a);var n=Object.prototype.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?O6(e,a):void 0}}(c)||function(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
  ______________________________________________________________
  
   _______ _______       _____   __ __                          
  |   |   |_     _|_____|     |_|__|  |--.----.---.-.----.--.--.
  |   |   |_|   ||______|       |  |  _  |   _|  _  |   _|  |  |
  |_______|_______|     |_______|__|_____|__| |___._|__| |___  |
                                                         |_____|                                           
  ______________________________________________________________
                           author: LiXiao
  `,`
        background: linear-gradient(135deg, orange 60%, cyan);
        background-clip: text;
        color: transparent;
        font-size: 16px; 
        line-height: 1;
        font-family: monospace;
        font-weight: 600;
  `)})(),Ef.add(uM);const zM=(Nt=Mu,(c,e)=>{e2(Nt,a=>c.use(a)),e&&e0(e,c,!0)});var Nt;B.LiAlert=Z7,B.LiButton=S3,B.LiButtonGroup=j6,B.LiCollapse=J7,B.LiCollapseItem=Q7,B.LiConfigProvider=Sm,B.LiDropdown=wc,B.LiDropdownItem=kc,B.LiIcon=U7,B.LiInput=Rc,B.LiLoading=Gc,B.LiLoadingDirective=Y3,B.LiLoadingService=G3,B.LiMessage=Pc,B.LiMessageBox=i0,B.LiNotification=Fc,B.LiOption=Xc,B.LiPopconfirm=bc,B.LiSelect=Kc,B.LiSwitch=$c,B.LiTooltip=xc,B.default=zM,B.en=E3,B.ja={name:"ja",el:{colorpicker:{confirm:"OK",clear:"クリア"},datepicker:{now:"現在",today:"今日",cancel:"キャンセル",clear:"クリア",confirm:"OK",selectDate:"日付を選択",selectTime:"時間を選択",startDate:"開始日",startTime:"開始時間",endDate:"終了日",endTime:"終了時間",prevYear:"前年",nextYear:"翌年",prevMonth:"前月",nextMonth:"翌月",year:"年",month1:"1月",month2:"2月",month3:"3月",month4:"4月",month5:"5月",month6:"6月",month7:"7月",month8:"8月",month9:"9月",month10:"10月",month11:"11月",month12:"12月",weeks:{sun:"日",mon:"月",tue:"火",wed:"水",thu:"木",fri:"金",sat:"土"},months:{jan:"1月",feb:"2月",mar:"3月",apr:"4月",may:"5月",jun:"6月",jul:"7月",aug:"8月",sep:"9月",oct:"10月",nov:"11月",dec:"12月"}},select:{loading:"ロード中",noMatch:"データなし",noData:"データなし",placeholder:"選択してください"},cascader:{noMatch:"データなし",loading:"ロード中",placeholder:"選択してください",noData:"データなし"},pagination:{goto:"",pagesize:"件/ページ",total:"総計 {total} 件",pageClassifier:"ページ目へ",page:"Page",prev:"Go to previous page",next:"Go to next page",currentPage:"page {pager}",prevPages:"Previous {pager} pages",nextPages:"Next {pager} pages"},messagebox:{title:"メッセージ",confirm:"OK",cancel:"キャンセル",error:"正しくない入力"},upload:{deleteTip:"Delキーを押して削除する",delete:"削除する",preview:"プレビュー",continue:"続行する"},table:{emptyText:"データなし",confirmFilter:"確認",resetFilter:"初期化",clearFilter:"すべて",sumText:"合計"},tour:{next:"次へ",previous:"前へ",finish:"ツアー終了"},tree:{emptyText:"データなし"},transfer:{noMatch:"データなし",noData:"データなし",titles:["リスト 1","リスト 2"],filterPlaceholder:"キーワードを入力",noCheckedFormat:"総計 {total} 件",hasCheckedFormat:"{checked}/{total} を選択した"},image:{error:"失敗"},pageHeader:{title:"戻る"},popconfirm:{confirmButtonText:"はい",cancelButtonText:"いいえ"},carousel:{leftArrow:"Carousel arrow left",rightArrow:"Carousel arrow right",indicator:"Carousel switch to index {index}"}}},B.ko={name:"ko",el:{colorpicker:{confirm:"확인",clear:"초기화",defaultLabel:"색상 선택기",description:"현재 색상은 {color}입니다. Enter 키를 눌러 새 색상을 선택합니다."},datepicker:{now:"지금",today:"오늘",cancel:"취소",clear:"초기화",confirm:"확인",dateTablePrompt:"화살표 키를 사용하고 Enter를 눌러 날짜를 선택하십시오.",monthTablePrompt:"화살표 키를 사용하고 Enter를 눌러 월을 선택합니다.",yearTablePrompt:"화살표 키를 사용하고 Enter 키를 눌러 연도를 선택합니다.",selectDate:"날짜 선택",selectTime:"시간 선택",startDate:"시작 날짜",startTime:"시작 시간",endDate:"종료 날짜",endTime:"종료 시간",prevYear:"지난해",nextYear:"다음해",prevMonth:"지난달",nextMonth:"다음달",year:"년",month1:"1월",month2:"2월",month3:"3월",month4:"4월",month5:"5월",month6:"6월",month7:"7월",month8:"8월",month9:"9월",month10:"10월",month11:"11월",month12:"12월",weeks:{sun:"일",mon:"월",tue:"화",wed:"수",thu:"목",fri:"금",sat:"토"},months:{jan:"1월",feb:"2월",mar:"3월",apr:"4월",may:"5월",jun:"6월",jul:"7월",aug:"8월",sep:"9월",oct:"10월",nov:"11월",dec:"12월"}},inputNumber:{decrease:"값 증가",increase:"값 감소"},select:{loading:"불러오는 중",noMatch:"검색된 데이터 없음",noData:"데이터 없음",placeholder:"선택"},dropdown:{toggleDropdown:"드롭다운 전환"},cascader:{noMatch:"검색된 데이터 없음",loading:"불러오는 중",placeholder:"선택",noData:"데이터 없음"},pagination:{goto:"",pagesize:"건/페이지",total:"총 {total} 건",pageClassifier:"페이지로",page:"페이지",prev:"이전 페이지로 이동",next:"다음 페이지로 이동",currentPage:"페이지 {pager}",prevPages:"이전 {pager} 페이지",nextPages:"다음 {pager} 페이지",deprecationWarning:"더 이상 사용되지 않는 동작이 감지되었습니다. 자세한 내용은 el-pagination 문서를 참조하세요."},dialog:{close:"대화 상자 닫기"},drawer:{close:"대화 상자 닫기"},messagebox:{title:"메시지",confirm:"확인",cancel:"취소",error:"올바르지 않은 입력",close:"대화 상자 닫기"},upload:{deleteTip:"Delete 키를 눌러 삭제",delete:"삭제",preview:"미리보기",continue:"계속하기"},slider:{defaultLabel:"{min}과 {max} 사이의 슬라이더",defaultRangeStartLabel:"시작 값 선택",defaultRangeEndLabel:"종료 값 선택"},table:{emptyText:"데이터 없음",confirmFilter:"확인",resetFilter:"초기화",clearFilter:"전체",sumText:"합계"},tour:{next:"다음",previous:"이전",finish:"종료"},tree:{emptyText:"데이터 없음"},transfer:{noMatch:"검색된 데이터 없음",noData:"데이터 없음",titles:["리스트 1","리스트 2"],filterPlaceholder:"검색어를 입력하세요",noCheckedFormat:"총 {total} 건",hasCheckedFormat:"{checked}/{total} 선택됨"},image:{error:"불러오기 실패"},pageHeader:{title:"뒤로"},popconfirm:{confirmButtonText:"예",cancelButtonText:"아니오"},carousel:{leftArrow:"Carousel arrow left",rightArrow:"Carousel arrow right",indicator:"Carousel switch to index {index}"}}},B.messageTypes=Bc,B.notificationPosition=Dc,B.notificationTypes=Oc,B.provideGlobalConfig=e0,B.useGlobalConfig=Ac,B.vLoading=Y3,B.zhCn={name:"zh-cn",el:{colorpicker:{confirm:"确定",clear:"清空"},datepicker:{now:"此刻",today:"今天",cancel:"取消",clear:"清空",confirm:"确定",selectDate:"选择日期",selectTime:"选择时间",startDate:"开始日期",startTime:"开始时间",endDate:"结束日期",endTime:"结束时间",prevYear:"前一年",nextYear:"后一年",prevMonth:"上个月",nextMonth:"下个月",year:"年",month1:"1 月",month2:"2 月",month3:"3 月",month4:"4 月",month5:"5 月",month6:"6 月",month7:"7 月",month8:"8 月",month9:"9 月",month10:"10 月",month11:"11 月",month12:"12 月",weeks:{sun:"日",mon:"一",tue:"二",wed:"三",thu:"四",fri:"五",sat:"六"},months:{jan:"一月",feb:"二月",mar:"三月",apr:"四月",may:"五月",jun:"六月",jul:"七月",aug:"八月",sep:"九月",oct:"十月",nov:"十一月",dec:"十二月"}},select:{loading:"加载中",noMatch:"无匹配数据",noData:"无数据",placeholder:"请选择"},cascader:{noMatch:"无匹配数据",loading:"加载中",placeholder:"请选择",noData:"暂无数据"},pagination:{goto:"前往",pagesize:"条/页",total:"共 {total} 条",pageClassifier:"页",page:"页",prev:"上一页",next:"下一页",currentPage:"第 {pager} 页",prevPages:"向前 {pager} 页",nextPages:"向后 {pager} 页",deprecationWarning:"你使用了一些已被废弃的用法，请参考 el-pagination 的官方文档"},messagebox:{title:"提示",confirm:"确定",cancel:"取消",error:"输入的数据不合法!"},upload:{deleteTip:"按 delete 键可删除",delete:"删除",preview:"查看图片",continue:"继续上传"},table:{emptyText:"暂无数据",confirmFilter:"筛选",resetFilter:"重置",clearFilter:"全部",sumText:"合计"},tour:{next:"下一步",previous:"上一步",finish:"结束导览"},tree:{emptyText:"暂无数据"},transfer:{noMatch:"无匹配数据",noData:"无数据",titles:["列表 1","列表 2"],filterPlaceholder:"请输入搜索内容",noCheckedFormat:"共 {total} 项",hasCheckedFormat:"已选 {checked}/{total} 项"},image:{error:"加载失败"},pageHeader:{title:"返回"},popconfirm:{confirmButtonText:"确定",cancelButtonText:"取消"},carousel:{leftArrow:"上一张幻灯片",rightArrow:"下一张幻灯片",indicator:"幻灯片切换至索引 {index}"}}},B.zhTw={name:"zh-tw",el:{colorpicker:{confirm:"確認",clear:"清空",defaultLabel:"色彩選擇器",description:"目前色彩為 {color}。按一下 Enter 以選擇新色彩。"},datepicker:{now:"現在",today:"今天",cancel:"取消",clear:"清空",confirm:"確認",dateTablePrompt:"使用方向鍵與 Enter 鍵以選擇日期",monthTablePrompt:"使用方向鍵與 Enter 鍵以選擇月份",yearTablePrompt:"使用方向鍵與 Enter 鍵以選擇年份",selectedDate:"已選日期",selectDate:"選擇日期",selectTime:"選擇時間",startDate:"開始日期",startTime:"開始時間",endDate:"結束日期",endTime:"結束時間",prevYear:"前一年",nextYear:"後一年",prevMonth:"上個月",nextMonth:"下個月",year:"年",month1:"1 月",month2:"2 月",month3:"3 月",month4:"4 月",month5:"5 月",month6:"6 月",month7:"7 月",month8:"8 月",month9:"9 月",month10:"10 月",month11:"11 月",month12:"12 月",weeks:{sun:"日",mon:"一",tue:"二",wed:"三",thu:"四",fri:"五",sat:"六"},weeksFull:{sun:"星期日",mon:"星期一",tue:"星期二",wed:"星期三",thu:"星期四",fri:"星期五",sat:"星期六"},months:{jan:"一月",feb:"二月",mar:"三月",apr:"四月",may:"五月",jun:"六月",jul:"七月",aug:"八月",sep:"九月",oct:"十月",nov:"十一月",dec:"十二月"}},inputNumber:{decrease:"減少數值",increase:"增加數值"},select:{loading:"載入中",noMatch:"無相符資料",noData:"無資料",placeholder:"請選擇"},dropdown:{toggleDropdown:"切換下拉選單"},cascader:{noMatch:"無相符資料",loading:"載入中",placeholder:"請選擇",noData:"無資料"},pagination:{goto:"前往",pagesize:"項/頁",total:"共 {total} 項",pageClassifier:"頁",page:"頁",prev:"上一頁",next:"下一頁",currentPage:"第 {pager} 頁",prevPages:"向前 {pager} 頁",nextPages:"向后 {pager} 頁",deprecationWarning:"偵測到已過時的使用方式，請參閱 el-pagination 說明文件以了解更多資訊"},dialog:{close:"關閉此對話框"},drawer:{close:"關閉此對話框"},messagebox:{title:"提示",confirm:"確定",cancel:"取消",error:"輸入的資料不符規定!",close:"關閉此對話框"},upload:{deleteTip:"按一下 Delete 鍵以刪除",delete:"刪除",preview:"查看圖片",continue:"繼續上傳"},slider:{defaultLabel:"滑桿介於 {min} 至 {max}",defaultRangeStartLabel:"選擇起始值",defaultRangeEndLabel:"選擇結束值"},table:{emptyText:"暫無資料",confirmFilter:"篩選",resetFilter:"重置",clearFilter:"全部",sumText:"合計"},tour:{next:"下一步",previous:"上一步",finish:"結束導覽"},tree:{emptyText:"暫無資料"},transfer:{noMatch:"無相符資料",noData:"無資料",titles:["列表 1","列表 2"],filterPlaceholder:"請輸入搜尋內容",noCheckedFormat:"共 {total} 項",hasCheckedFormat:"已選 {checked}/{total} 項"},image:{error:"載入失敗"},pageHeader:{title:"返回"},popconfirm:{confirmButtonText:"確認",cancelButtonText:"取消"},carousel:{leftArrow:"上一張投影片",rightArrow:"下一張投影片",indicator:"投影片切換至索引 {index}"}}},Object.defineProperties(B,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});