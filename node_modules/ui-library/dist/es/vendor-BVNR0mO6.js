var zt = typeof global == "object" && global && global.Object === Object && global, yr = typeof self == "object" && self && self.Object === Object && self, b = zt || yr || Function("return this")(), y = b.Symbol, Gt = Object.prototype, vr = Gt.hasOwnProperty, Tr = Gt.toString, N = y ? y.toStringTag : void 0;
function _r(t) {
  var r = vr.call(t, N), e = t[N];
  try {
    t[N] = void 0;
    var n = !0;
  } catch {
  }
  var a = Tr.call(t);
  return n && (r ? t[N] = e : delete t[N]), a;
}
var mr = Object.prototype, $r = mr.toString;
function jr(t) {
  return $r.call(t);
}
var Or = "[object Null]", wr = "[object Undefined]", dt = y ? y.toStringTag : void 0;
function w(t) {
  return t == null ? t === void 0 ? wr : Or : dt && dt in Object(t) ? _r(t) : jr(t);
}
function A(t) {
  return t != null && typeof t == "object";
}
var Ar = "[object Symbol]";
function H(t) {
  return typeof t == "symbol" || A(t) && w(t) == Ar;
}
function Ht(t, r) {
  for (var e = -1, n = t == null ? 0 : t.length, a = Array(n); ++e < n; )
    a[e] = r(t[e], e, t);
  return a;
}
var $ = Array.isArray, Sr = 1 / 0, ht = y ? y.prototype : void 0, bt = ht ? ht.toString : void 0;
function Kt(t) {
  if (typeof t == "string")
    return t;
  if ($(t))
    return Ht(t, Kt) + "";
  if (H(t))
    return bt ? bt.call(t) : "";
  var r = t + "";
  return r == "0" && 1 / t == -Sr ? "-0" : r;
}
var xr = /\s/;
function Pr(t) {
  for (var r = t.length; r-- && xr.test(t.charAt(r)); )
    ;
  return r;
}
var Er = /^\s+/;
function Ir(t) {
  return t && t.slice(0, Pr(t) + 1).replace(Er, "");
}
function T(t) {
  var r = typeof t;
  return t != null && (r == "object" || r == "function");
}
var yt = NaN, Cr = /^[-+]0x[0-9a-f]+$/i, Fr = /^0b[01]+$/i, Mr = /^0o[0-7]+$/i, Nr = parseInt;
function vt(t) {
  if (typeof t == "number")
    return t;
  if (H(t))
    return yt;
  if (T(t)) {
    var r = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = T(r) ? r + "" : r;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = Ir(t);
  var e = Fr.test(t);
  return e || Mr.test(t) ? Nr(t.slice(2), e ? 2 : 8) : Cr.test(t) ? yt : +t;
}
function Wt(t) {
  return t;
}
var Lr = "[object AsyncFunction]", Ur = "[object Function]", Br = "[object GeneratorFunction]", Dr = "[object Proxy]";
function Vt(t) {
  if (!T(t))
    return !1;
  var r = w(t);
  return r == Ur || r == Br || r == Lr || r == Dr;
}
var q = b["__core-js_shared__"], Tt = function() {
  var t = /[^.]+$/.exec(q && q.keys && q.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Rr(t) {
  return !!Tt && Tt in t;
}
var zr = Function.prototype, Gr = zr.toString;
function S(t) {
  if (t != null) {
    try {
      return Gr.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Hr = /[\\^$.*+?()[\]{}|]/g, Kr = /^\[object .+?Constructor\]$/, Wr = Function.prototype, Vr = Object.prototype, Xr = Wr.toString, Yr = Vr.hasOwnProperty, qr = RegExp(
  "^" + Xr.call(Yr).replace(Hr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Zr(t) {
  if (!T(t) || Rr(t))
    return !1;
  var r = Vt(t) ? qr : Kr;
  return r.test(S(t));
}
function Jr(t, r) {
  return t == null ? void 0 : t[r];
}
function x(t, r) {
  var e = Jr(t, r);
  return Zr(e) ? e : void 0;
}
var Q = x(b, "WeakMap"), _t = Object.create, Qr = /* @__PURE__ */ function() {
  function t() {
  }
  return function(r) {
    if (!T(r))
      return {};
    if (_t)
      return _t(r);
    t.prototype = r;
    var e = new t();
    return t.prototype = void 0, e;
  };
}();
function kr(t, r, e) {
  switch (e.length) {
    case 0:
      return t.call(r);
    case 1:
      return t.call(r, e[0]);
    case 2:
      return t.call(r, e[0], e[1]);
    case 3:
      return t.call(r, e[0], e[1], e[2]);
  }
  return t.apply(r, e);
}
function te(t, r) {
  var e = -1, n = t.length;
  for (r || (r = Array(n)); ++e < n; )
    r[e] = t[e];
  return r;
}
var re = 800, ee = 16, ne = Date.now;
function ae(t) {
  var r = 0, e = 0;
  return function() {
    var n = ne(), a = ee - (n - e);
    if (e = n, a > 0) {
      if (++r >= re)
        return arguments[0];
    } else
      r = 0;
    return t.apply(void 0, arguments);
  };
}
function oe(t) {
  return function() {
    return t;
  };
}
var G = function() {
  try {
    var t = x(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), ie = G ? function(t, r) {
  return G(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: oe(r),
    writable: !0
  });
} : Wt, ue = ae(ie);
function Xt(t, r) {
  for (var e = -1, n = t == null ? 0 : t.length; ++e < n && r(t[e], e, t) !== !1; )
    ;
  return t;
}
var ce = 9007199254740991, se = /^(?:0|[1-9]\d*)$/;
function fe(t, r) {
  var e = typeof t;
  return r = r ?? ce, !!r && (e == "number" || e != "symbol" && se.test(t)) && t > -1 && t % 1 == 0 && t < r;
}
function Yt(t, r, e) {
  r == "__proto__" && G ? G(t, r, {
    configurable: !0,
    enumerable: !0,
    value: e,
    writable: !0
  }) : t[r] = e;
}
function qt(t, r) {
  return t === r || t !== t && r !== r;
}
var le = Object.prototype, pe = le.hasOwnProperty;
function Zt(t, r, e) {
  var n = t[r];
  (!(pe.call(t, r) && qt(n, e)) || e === void 0 && !(r in t)) && Yt(t, r, e);
}
function D(t, r, e, n) {
  var a = !e;
  e || (e = {});
  for (var o = -1, i = r.length; ++o < i; ) {
    var u = r[o], f = void 0;
    f === void 0 && (f = t[u]), a ? Yt(e, u, f) : Zt(e, u, f);
  }
  return e;
}
var mt = Math.max;
function ge(t, r, e) {
  return r = mt(r === void 0 ? t.length - 1 : r, 0), function() {
    for (var n = arguments, a = -1, o = mt(n.length - r, 0), i = Array(o); ++a < o; )
      i[a] = n[r + a];
    a = -1;
    for (var u = Array(r + 1); ++a < r; )
      u[a] = n[a];
    return u[r] = e(i), kr(t, this, u);
  };
}
var de = 9007199254740991;
function Jt(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= de;
}
function et(t) {
  return t != null && Jt(t.length) && !Vt(t);
}
var he = Object.prototype;
function nt(t) {
  var r = t && t.constructor, e = typeof r == "function" && r.prototype || he;
  return t === e;
}
function be(t, r) {
  for (var e = -1, n = Array(t); ++e < t; )
    n[e] = r(e);
  return n;
}
var ye = "[object Arguments]";
function $t(t) {
  return A(t) && w(t) == ye;
}
var Qt = Object.prototype, ve = Qt.hasOwnProperty, Te = Qt.propertyIsEnumerable, kt = $t(/* @__PURE__ */ function() {
  return arguments;
}()) ? $t : function(t) {
  return A(t) && ve.call(t, "callee") && !Te.call(t, "callee");
};
function _e() {
  return !1;
}
var tr = typeof exports == "object" && exports && !exports.nodeType && exports, jt = tr && typeof module == "object" && module && !module.nodeType && module, me = jt && jt.exports === tr, Ot = me ? b.Buffer : void 0, $e = Ot ? Ot.isBuffer : void 0, rr = $e || _e, je = "[object Arguments]", Oe = "[object Array]", we = "[object Boolean]", Ae = "[object Date]", Se = "[object Error]", xe = "[object Function]", Pe = "[object Map]", Ee = "[object Number]", Ie = "[object Object]", Ce = "[object RegExp]", Fe = "[object Set]", Me = "[object String]", Ne = "[object WeakMap]", Le = "[object ArrayBuffer]", Ue = "[object DataView]", Be = "[object Float32Array]", De = "[object Float64Array]", Re = "[object Int8Array]", ze = "[object Int16Array]", Ge = "[object Int32Array]", He = "[object Uint8Array]", Ke = "[object Uint8ClampedArray]", We = "[object Uint16Array]", Ve = "[object Uint32Array]", s = {};
s[Be] = s[De] = s[Re] = s[ze] = s[Ge] = s[He] = s[Ke] = s[We] = s[Ve] = !0;
s[je] = s[Oe] = s[Le] = s[we] = s[Ue] = s[Ae] = s[Se] = s[xe] = s[Pe] = s[Ee] = s[Ie] = s[Ce] = s[Fe] = s[Me] = s[Ne] = !1;
function Xe(t) {
  return A(t) && Jt(t.length) && !!s[w(t)];
}
function at(t) {
  return function(r) {
    return t(r);
  };
}
var er = typeof exports == "object" && exports && !exports.nodeType && exports, L = er && typeof module == "object" && module && !module.nodeType && module, Ye = L && L.exports === er, Z = Ye && zt.process, I = function() {
  try {
    var t = L && L.require && L.require("util").types;
    return t || Z && Z.binding && Z.binding("util");
  } catch {
  }
}(), wt = I && I.isTypedArray, qe = wt ? at(wt) : Xe, Ze = Object.prototype, Je = Ze.hasOwnProperty;
function nr(t, r) {
  var e = $(t), n = !e && kt(t), a = !e && !n && rr(t), o = !e && !n && !a && qe(t), i = e || n || a || o, u = i ? be(t.length, String) : [], f = u.length;
  for (var p in t)
    (r || Je.call(t, p)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (p == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (p == "offset" || p == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (p == "buffer" || p == "byteLength" || p == "byteOffset") || // Skip index properties.
    fe(p, f))) && u.push(p);
  return u;
}
function ar(t, r) {
  return function(e) {
    return t(r(e));
  };
}
var Qe = ar(Object.keys, Object), ke = Object.prototype, tn = ke.hasOwnProperty;
function rn(t) {
  if (!nt(t))
    return Qe(t);
  var r = [];
  for (var e in Object(t))
    tn.call(t, e) && e != "constructor" && r.push(e);
  return r;
}
function K(t) {
  return et(t) ? nr(t) : rn(t);
}
function en(t) {
  var r = [];
  if (t != null)
    for (var e in Object(t))
      r.push(e);
  return r;
}
var nn = Object.prototype, an = nn.hasOwnProperty;
function on(t) {
  if (!T(t))
    return en(t);
  var r = nt(t), e = [];
  for (var n in t)
    n == "constructor" && (r || !an.call(t, n)) || e.push(n);
  return e;
}
function ot(t) {
  return et(t) ? nr(t, !0) : on(t);
}
var un = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, cn = /^\w*$/;
function sn(t, r) {
  if ($(t))
    return !1;
  var e = typeof t;
  return e == "number" || e == "symbol" || e == "boolean" || t == null || H(t) ? !0 : cn.test(t) || !un.test(t) || r != null && t in Object(r);
}
var U = x(Object, "create");
function fn() {
  this.__data__ = U ? U(null) : {}, this.size = 0;
}
function ln(t) {
  var r = this.has(t) && delete this.__data__[t];
  return this.size -= r ? 1 : 0, r;
}
var pn = "__lodash_hash_undefined__", gn = Object.prototype, dn = gn.hasOwnProperty;
function hn(t) {
  var r = this.__data__;
  if (U) {
    var e = r[t];
    return e === pn ? void 0 : e;
  }
  return dn.call(r, t) ? r[t] : void 0;
}
var bn = Object.prototype, yn = bn.hasOwnProperty;
function vn(t) {
  var r = this.__data__;
  return U ? r[t] !== void 0 : yn.call(r, t);
}
var Tn = "__lodash_hash_undefined__";
function _n(t, r) {
  var e = this.__data__;
  return this.size += this.has(t) ? 0 : 1, e[t] = U && r === void 0 ? Tn : r, this;
}
function O(t) {
  var r = -1, e = t == null ? 0 : t.length;
  for (this.clear(); ++r < e; ) {
    var n = t[r];
    this.set(n[0], n[1]);
  }
}
O.prototype.clear = fn;
O.prototype.delete = ln;
O.prototype.get = hn;
O.prototype.has = vn;
O.prototype.set = _n;
function mn() {
  this.__data__ = [], this.size = 0;
}
function W(t, r) {
  for (var e = t.length; e--; )
    if (qt(t[e][0], r))
      return e;
  return -1;
}
var $n = Array.prototype, jn = $n.splice;
function On(t) {
  var r = this.__data__, e = W(r, t);
  if (e < 0)
    return !1;
  var n = r.length - 1;
  return e == n ? r.pop() : jn.call(r, e, 1), --this.size, !0;
}
function wn(t) {
  var r = this.__data__, e = W(r, t);
  return e < 0 ? void 0 : r[e][1];
}
function An(t) {
  return W(this.__data__, t) > -1;
}
function Sn(t, r) {
  var e = this.__data__, n = W(e, t);
  return n < 0 ? (++this.size, e.push([t, r])) : e[n][1] = r, this;
}
function _(t) {
  var r = -1, e = t == null ? 0 : t.length;
  for (this.clear(); ++r < e; ) {
    var n = t[r];
    this.set(n[0], n[1]);
  }
}
_.prototype.clear = mn;
_.prototype.delete = On;
_.prototype.get = wn;
_.prototype.has = An;
_.prototype.set = Sn;
var B = x(b, "Map");
function xn() {
  this.size = 0, this.__data__ = {
    hash: new O(),
    map: new (B || _)(),
    string: new O()
  };
}
function Pn(t) {
  var r = typeof t;
  return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
}
function V(t, r) {
  var e = t.__data__;
  return Pn(r) ? e[typeof r == "string" ? "string" : "hash"] : e.map;
}
function En(t) {
  var r = V(this, t).delete(t);
  return this.size -= r ? 1 : 0, r;
}
function In(t) {
  return V(this, t).get(t);
}
function Cn(t) {
  return V(this, t).has(t);
}
function Fn(t, r) {
  var e = V(this, t), n = e.size;
  return e.set(t, r), this.size += e.size == n ? 0 : 1, this;
}
function j(t) {
  var r = -1, e = t == null ? 0 : t.length;
  for (this.clear(); ++r < e; ) {
    var n = t[r];
    this.set(n[0], n[1]);
  }
}
j.prototype.clear = xn;
j.prototype.delete = En;
j.prototype.get = In;
j.prototype.has = Cn;
j.prototype.set = Fn;
var Mn = "Expected a function";
function it(t, r) {
  if (typeof t != "function" || r != null && typeof r != "function")
    throw new TypeError(Mn);
  var e = function() {
    var n = arguments, a = r ? r.apply(this, n) : n[0], o = e.cache;
    if (o.has(a))
      return o.get(a);
    var i = t.apply(this, n);
    return e.cache = o.set(a, i) || o, i;
  };
  return e.cache = new (it.Cache || j)(), e;
}
it.Cache = j;
var Nn = 500;
function Ln(t) {
  var r = it(t, function(n) {
    return e.size === Nn && e.clear(), n;
  }), e = r.cache;
  return r;
}
var Un = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Bn = /\\(\\)?/g, Dn = Ln(function(t) {
  var r = [];
  return t.charCodeAt(0) === 46 && r.push(""), t.replace(Un, function(e, n, a, o) {
    r.push(a ? o.replace(Bn, "$1") : n || e);
  }), r;
});
function Rn(t) {
  return t == null ? "" : Kt(t);
}
function ut(t, r) {
  return $(t) ? t : sn(t, r) ? [t] : Dn(Rn(t));
}
var zn = 1 / 0;
function or(t) {
  if (typeof t == "string" || H(t))
    return t;
  var r = t + "";
  return r == "0" && 1 / t == -zn ? "-0" : r;
}
function Gn(t, r) {
  r = ut(r, t);
  for (var e = 0, n = r.length; t != null && e < n; )
    t = t[or(r[e++])];
  return e && e == n ? t : void 0;
}
function ct(t, r) {
  for (var e = -1, n = r.length, a = t.length; ++e < n; )
    t[a + e] = r[e];
  return t;
}
var At = y ? y.isConcatSpreadable : void 0;
function Hn(t) {
  return $(t) || kt(t) || !!(At && t && t[At]);
}
function Kn(t, r, e, n, a) {
  var o = -1, i = t.length;
  for (e || (e = Hn), a || (a = []); ++o < i; ) {
    var u = t[o];
    e(u) ? ct(a, u) : a[a.length] = u;
  }
  return a;
}
function Wn(t) {
  var r = t == null ? 0 : t.length;
  return r ? Kn(t) : [];
}
function Vn(t) {
  return ue(ge(t, void 0, Wn), t + "");
}
var st = ar(Object.getPrototypeOf, Object), Xn = "[object Object]", Yn = Function.prototype, qn = Object.prototype, ir = Yn.toString, Zn = qn.hasOwnProperty, Jn = ir.call(Object);
function Qn(t) {
  if (!A(t) || w(t) != Xn)
    return !1;
  var r = st(t);
  if (r === null)
    return !0;
  var e = Zn.call(r, "constructor") && r.constructor;
  return typeof e == "function" && e instanceof e && ir.call(e) == Jn;
}
function kn(t, r, e) {
  var n = -1, a = t.length;
  r < 0 && (r = -r > a ? 0 : a + r), e = e > a ? a : e, e < 0 && (e += a), a = r > e ? 0 : e - r >>> 0, r >>>= 0;
  for (var o = Array(a); ++n < a; )
    o[n] = t[n + r];
  return o;
}
function ta() {
  this.__data__ = new _(), this.size = 0;
}
function ra(t) {
  var r = this.__data__, e = r.delete(t);
  return this.size = r.size, e;
}
function ea(t) {
  return this.__data__.get(t);
}
function na(t) {
  return this.__data__.has(t);
}
var aa = 200;
function oa(t, r) {
  var e = this.__data__;
  if (e instanceof _) {
    var n = e.__data__;
    if (!B || n.length < aa - 1)
      return n.push([t, r]), this.size = ++e.size, this;
    e = this.__data__ = new j(n);
  }
  return e.set(t, r), this.size = e.size, this;
}
function C(t) {
  var r = this.__data__ = new _(t);
  this.size = r.size;
}
C.prototype.clear = ta;
C.prototype.delete = ra;
C.prototype.get = ea;
C.prototype.has = na;
C.prototype.set = oa;
function ia(t, r) {
  return t && D(r, K(r), t);
}
function ua(t, r) {
  return t && D(r, ot(r), t);
}
var ur = typeof exports == "object" && exports && !exports.nodeType && exports, St = ur && typeof module == "object" && module && !module.nodeType && module, ca = St && St.exports === ur, xt = ca ? b.Buffer : void 0, Pt = xt ? xt.allocUnsafe : void 0;
function sa(t, r) {
  if (r)
    return t.slice();
  var e = t.length, n = Pt ? Pt(e) : new t.constructor(e);
  return t.copy(n), n;
}
function fa(t, r) {
  for (var e = -1, n = t == null ? 0 : t.length, a = 0, o = []; ++e < n; ) {
    var i = t[e];
    r(i, e, t) && (o[a++] = i);
  }
  return o;
}
function cr() {
  return [];
}
var la = Object.prototype, pa = la.propertyIsEnumerable, Et = Object.getOwnPropertySymbols, ft = Et ? function(t) {
  return t == null ? [] : (t = Object(t), fa(Et(t), function(r) {
    return pa.call(t, r);
  }));
} : cr;
function ga(t, r) {
  return D(t, ft(t), r);
}
var da = Object.getOwnPropertySymbols, sr = da ? function(t) {
  for (var r = []; t; )
    ct(r, ft(t)), t = st(t);
  return r;
} : cr;
function ha(t, r) {
  return D(t, sr(t), r);
}
function fr(t, r, e) {
  var n = r(t);
  return $(t) ? n : ct(n, e(t));
}
function ba(t) {
  return fr(t, K, ft);
}
function lr(t) {
  return fr(t, ot, sr);
}
var k = x(b, "DataView"), tt = x(b, "Promise"), rt = x(b, "Set"), It = "[object Map]", ya = "[object Object]", Ct = "[object Promise]", Ft = "[object Set]", Mt = "[object WeakMap]", Nt = "[object DataView]", va = S(k), Ta = S(B), _a = S(tt), ma = S(rt), $a = S(Q), v = w;
(k && v(new k(new ArrayBuffer(1))) != Nt || B && v(new B()) != It || tt && v(tt.resolve()) != Ct || rt && v(new rt()) != Ft || Q && v(new Q()) != Mt) && (v = function(t) {
  var r = w(t), e = r == ya ? t.constructor : void 0, n = e ? S(e) : "";
  if (n)
    switch (n) {
      case va:
        return Nt;
      case Ta:
        return It;
      case _a:
        return Ct;
      case ma:
        return Ft;
      case $a:
        return Mt;
    }
  return r;
});
var ja = Object.prototype, Oa = ja.hasOwnProperty;
function wa(t) {
  var r = t.length, e = new t.constructor(r);
  return r && typeof t[0] == "string" && Oa.call(t, "index") && (e.index = t.index, e.input = t.input), e;
}
var Lt = b.Uint8Array;
function lt(t) {
  var r = new t.constructor(t.byteLength);
  return new Lt(r).set(new Lt(t)), r;
}
function Aa(t, r) {
  var e = r ? lt(t.buffer) : t.buffer;
  return new t.constructor(e, t.byteOffset, t.byteLength);
}
var Sa = /\w*$/;
function xa(t) {
  var r = new t.constructor(t.source, Sa.exec(t));
  return r.lastIndex = t.lastIndex, r;
}
var Ut = y ? y.prototype : void 0, Bt = Ut ? Ut.valueOf : void 0;
function Pa(t) {
  return Bt ? Object(Bt.call(t)) : {};
}
function Ea(t, r) {
  var e = r ? lt(t.buffer) : t.buffer;
  return new t.constructor(e, t.byteOffset, t.length);
}
var Ia = "[object Boolean]", Ca = "[object Date]", Fa = "[object Map]", Ma = "[object Number]", Na = "[object RegExp]", La = "[object Set]", Ua = "[object String]", Ba = "[object Symbol]", Da = "[object ArrayBuffer]", Ra = "[object DataView]", za = "[object Float32Array]", Ga = "[object Float64Array]", Ha = "[object Int8Array]", Ka = "[object Int16Array]", Wa = "[object Int32Array]", Va = "[object Uint8Array]", Xa = "[object Uint8ClampedArray]", Ya = "[object Uint16Array]", qa = "[object Uint32Array]";
function Za(t, r, e) {
  var n = t.constructor;
  switch (r) {
    case Da:
      return lt(t);
    case Ia:
    case Ca:
      return new n(+t);
    case Ra:
      return Aa(t, e);
    case za:
    case Ga:
    case Ha:
    case Ka:
    case Wa:
    case Va:
    case Xa:
    case Ya:
    case qa:
      return Ea(t, e);
    case Fa:
      return new n();
    case Ma:
    case Ua:
      return new n(t);
    case Na:
      return xa(t);
    case La:
      return new n();
    case Ba:
      return Pa(t);
  }
}
function Ja(t) {
  return typeof t.constructor == "function" && !nt(t) ? Qr(st(t)) : {};
}
var Qa = "[object Map]";
function ka(t) {
  return A(t) && v(t) == Qa;
}
var Dt = I && I.isMap, to = Dt ? at(Dt) : ka, ro = "[object Set]";
function eo(t) {
  return A(t) && v(t) == ro;
}
var Rt = I && I.isSet, no = Rt ? at(Rt) : eo, ao = 1, oo = 2, io = 4, pr = "[object Arguments]", uo = "[object Array]", co = "[object Boolean]", so = "[object Date]", fo = "[object Error]", gr = "[object Function]", lo = "[object GeneratorFunction]", po = "[object Map]", go = "[object Number]", dr = "[object Object]", ho = "[object RegExp]", bo = "[object Set]", yo = "[object String]", vo = "[object Symbol]", To = "[object WeakMap]", _o = "[object ArrayBuffer]", mo = "[object DataView]", $o = "[object Float32Array]", jo = "[object Float64Array]", Oo = "[object Int8Array]", wo = "[object Int16Array]", Ao = "[object Int32Array]", So = "[object Uint8Array]", xo = "[object Uint8ClampedArray]", Po = "[object Uint16Array]", Eo = "[object Uint32Array]", c = {};
c[pr] = c[uo] = c[_o] = c[mo] = c[co] = c[so] = c[$o] = c[jo] = c[Oo] = c[wo] = c[Ao] = c[po] = c[go] = c[dr] = c[ho] = c[bo] = c[yo] = c[vo] = c[So] = c[xo] = c[Po] = c[Eo] = !0;
c[fo] = c[gr] = c[To] = !1;
function z(t, r, e, n, a, o) {
  var i, u = r & ao, f = r & oo, p = r & io;
  if (e && (i = a ? e(t, n, a, o) : e(t)), i !== void 0)
    return i;
  if (!T(t))
    return t;
  var F = $(t);
  if (F) {
    if (i = wa(t), !u)
      return te(t, i);
  } else {
    var g = v(t), P = g == gr || g == lo;
    if (rr(t))
      return sa(t, u);
    if (g == dr || g == pr || P && !a) {
      if (i = f || P ? {} : Ja(t), !u)
        return f ? ha(t, ua(i, t)) : ga(t, ia(i, t));
    } else {
      if (!c[g])
        return a ? t : {};
      i = Za(t, g, u);
    }
  }
  o || (o = new C());
  var E = o.get(t);
  if (E)
    return E;
  o.set(t, i), no(t) ? t.forEach(function(h) {
    i.add(z(h, r, e, h, t, o));
  }) : to(t) && t.forEach(function(h, d) {
    i.set(d, z(h, r, e, d, t, o));
  });
  var X = p ? f ? lr : ba : f ? ot : K, R = F ? void 0 : X(t);
  return Xt(R || t, function(h, d) {
    R && (d = h, h = t[d]), Zt(i, d, z(h, r, e, d, t, o));
  }), i;
}
function Io(t) {
  return function(r, e, n) {
    for (var a = -1, o = Object(r), i = n(r), u = i.length; u--; ) {
      var f = i[++a];
      if (e(o[f], f, o) === !1)
        break;
    }
    return r;
  };
}
var Co = Io();
function Fo(t, r) {
  return t && Co(t, r, K);
}
function Mo(t, r) {
  return function(e, n) {
    if (e == null)
      return e;
    if (!et(e))
      return t(e, n);
    for (var a = e.length, o = -1, i = Object(e); ++o < a && n(i[o], o, i) !== !1; )
      ;
    return e;
  };
}
var No = Mo(Fo), J = function() {
  return b.Date.now();
}, Lo = "Expected a function", Uo = Math.max, Bo = Math.min;
function Do(t, r, e) {
  var n, a, o, i, u, f, p = 0, F = !1, g = !1, P = !0;
  if (typeof t != "function")
    throw new TypeError(Lo);
  r = vt(r) || 0, T(e) && (F = !!e.leading, g = "maxWait" in e, o = g ? Uo(vt(e.maxWait) || 0, r) : o, P = "trailing" in e ? !!e.trailing : P);
  function E(l) {
    var m = n, M = a;
    return n = a = void 0, p = l, i = t.apply(M, m), i;
  }
  function X(l) {
    return p = l, u = setTimeout(d, r), F ? E(l) : i;
  }
  function R(l) {
    var m = l - f, M = l - p, gt = r - m;
    return g ? Bo(gt, o - M) : gt;
  }
  function h(l) {
    var m = l - f, M = l - p;
    return f === void 0 || m >= r || m < 0 || g && M >= o;
  }
  function d() {
    var l = J();
    if (h(l))
      return pt(l);
    u = setTimeout(d, R(l));
  }
  function pt(l) {
    return u = void 0, P && n ? E(l) : (n = a = void 0, i);
  }
  function hr() {
    u !== void 0 && clearTimeout(u), p = 0, n = f = a = u = void 0;
  }
  function br() {
    return u === void 0 ? i : pt(J());
  }
  function Y() {
    var l = J(), m = h(l);
    if (n = arguments, a = this, f = l, m) {
      if (u === void 0)
        return X(f);
      if (g)
        return clearTimeout(u), u = setTimeout(d, r), E(f);
    }
    return u === void 0 && (u = setTimeout(d, r)), i;
  }
  return Y.cancel = hr, Y.flush = br, Y;
}
function Ro(t) {
  var r = t == null ? 0 : t.length;
  return r ? t[r - 1] : void 0;
}
function zo(t) {
  return typeof t == "function" ? t : Wt;
}
function qo(t, r) {
  var e = $(t) ? Xt : No;
  return e(t, zo(r));
}
function Go(t, r) {
  return r.length < 2 ? t : Gn(t, kn(r, 0, -1));
}
function Ho(t, r) {
  return r = ut(r, t), t = Go(t, r), t == null || delete t[or(Ro(r))];
}
function Ko(t) {
  return Qn(t) ? void 0 : t;
}
var Wo = 1, Vo = 2, Xo = 4, Zo = Vn(function(t, r) {
  var e = {};
  if (t == null)
    return e;
  var n = !1;
  r = Ht(r, function(o) {
    return o = ut(o, t), n || (n = o.length > 1), o;
  }), D(t, lr(t), e), n && (e = z(e, Wo | Vo | Xo, Ko));
  for (var a = r.length; a--; )
    Ho(e, r[a]);
  return e;
}), Yo = "Expected a function";
function Jo(t, r, e) {
  var n = !0, a = !0;
  if (typeof t != "function")
    throw new TypeError(Yo);
  return T(e) && (n = "leading" in e ? !!e.leading : n, a = "trailing" in e ? !!e.trailing : a), Do(t, r, {
    leading: n,
    maxWait: r,
    trailing: a
  });
}
export {
  qo as f,
  Zo as o,
  Jo as t
};
