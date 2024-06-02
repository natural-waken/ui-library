import { defineComponent as b, ref as $, watchEffect as k, watch as H, provide as N, openBlock as E, createElementBlock as L, renderSlot as p, inject as S, computed as O, normalizeClass as h, createElementVNode as d, createTextVNode as A, toDisplayString as B, createVNode as u, Transition as P, mergeProps as T, toHandlers as D, unref as M, withCtx as j, withDirectives as z, vShow as K } from "vue";
import { d as _, _ as w, w as I } from "./utils-DSsG9kky.js";
import { L as W } from "./Icon-3Mpllelj.js";
const V = Symbol("collapseContext"), X = { class: "li-collapse" }, r = "LiCollapse", Y = /* @__PURE__ */ b({
  name: r,
  __name: "Collapse",
  props: {
    modelValue: {},
    accordion: { type: Boolean }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: i }) {
    const t = e, n = i, l = $(t.modelValue);
    t.accordion && l.value.length > 1 && _(r, "accordion mode should only hace one active item");
    function o(s) {
      let a = [...l.value];
      if (t.accordion) {
        a = [a[0] === s ? "" : s], c(a);
        return;
      }
      const m = a.indexOf(s);
      m > -1 ? a.splice(m, 1) : a.push(s), c(a);
    }
    function c(s) {
      l.value = s, n("update:modelValue", s), n("change", s);
    }
    return k(() => {
      t.accordion && l.value.length > 1 && _(r, "accordion mode should only hace one active item");
    }), H(
      () => t.modelValue,
      (s) => c(s)
    ), N(V, {
      activeNames: l,
      handleItemClick: o
    }), (s, a) => (E(), L("div", X, [
      p(s.$slots, "default", {}, void 0, !0)
    ]));
  }
}), Z = /* @__PURE__ */ w(Y, [["__scopeId", "data-v-3464ba23"]]), v = (e) => e.style.height = "0px", f = (e) => e.style.height = `${e.scrollHeight}px`, C = (e) => e.style.height = "", g = (e) => e.style.overflow = "hidden", y = (e) => e.style.overflow = "", q = {
  beforeEnter(e) {
    v(e), g(e);
  },
  enter: (e) => f(e),
  afterEnter(e) {
    C(e), y(e);
  },
  beforeLeave(e) {
    f(e), g(e);
  },
  leave: (e) => v(e),
  afterLeave(e) {
    C(e), y(e);
  }
}, x = ["id"], F = { class: "li-collapse-item__title" }, G = { class: "li-collapse-item__wapper" }, J = ["id"], Q = /* @__PURE__ */ b({
  name: "LiCollapseItem",
  __name: "CollapseItem",
  props: {
    name: {},
    title: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const i = e, t = S(V, void 0), n = O(() => {
      var o;
      return (o = t == null ? void 0 : t.activeNames.value) == null ? void 0 : o.includes(i.name);
    });
    function l() {
      i.disabled || t == null || t.handleItemClick(i.name);
    }
    return (o, c) => (E(), L("div", {
      class: h(["li-collapse-item", {
        "is-disabled": o.disabled
      }])
    }, [
      d("div", {
        class: h(["li-collapse-item__header", {
          "is-disabled": o.disabled,
          "is-active": n.value
        }]),
        id: `item-header-${o.name}`,
        onClick: l
      }, [
        d("span", F, [
          p(o.$slots, "title", {}, () => [
            A(B(o.title), 1)
          ], !0)
        ]),
        u(W, {
          icon: "angle-right",
          class: "header-angle"
        })
      ], 10, x),
      u(P, T({ name: "slide" }, D(M(q))), {
        default: j(() => [
          z(d("div", G, [
            d("div", {
              class: "li-collapse-item__content",
              id: `item-content-${o.name}`
            }, [
              p(o.$slots, "default", {}, void 0, !0)
            ], 8, J)
          ], 512), [
            [K, n.value]
          ])
        ]),
        _: 3
      }, 16)
    ], 2));
  }
}), R = /* @__PURE__ */ w(Q, [["__scopeId", "data-v-d8f4308e"]]), oe = I(Z), se = I(R);
export {
  oe as L,
  se as a
};
