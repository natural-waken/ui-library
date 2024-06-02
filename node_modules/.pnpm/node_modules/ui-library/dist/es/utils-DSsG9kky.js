import { f as e } from "./vendor-BVNR0mO6.js";
function l(r) {
  return (t) => e(r, (a) => {
    t.use(a);
  });
}
const c = (r) => (r && (r.install = (s) => {
  const t = (r == null ? void 0 : r.name) || "UnnamedComponent";
  s.component(t, r);
}), r);
class o extends Error {
  // 调用了父类 Error 的构造函数，传入错误消息 message
  constructor(s) {
    super(s), this.name = "LiUIError";
  }
}
function u(r, s) {
  if (process.env.NODE_ENV !== "production") {
    const t = new o(`[${r}] ${s}`);
    console.warn(t);
  }
}
const f = (r, s) => {
  const t = r.__vccOpts || r;
  for (const [a, n] of s)
    t[a] = n;
  return t;
};
export {
  f as _,
  u as d,
  l as m,
  c as w
};
