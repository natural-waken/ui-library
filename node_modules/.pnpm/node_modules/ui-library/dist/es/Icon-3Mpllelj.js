import { defineComponent as s, computed as e, openBlock as l, createElementBlock as r, mergeProps as c, createVNode as i, unref as m, normalizeProps as y, guardReactiveProps as B } from "vue";
import { FontAwesomeIcon as f } from "@fortawesome/vue-fontawesome";
import { o as u } from "./vendor-BVNR0mO6.js";
import { _ as d, w as _ } from "./utils-DSsG9kky.js";
const I = /* @__PURE__ */ s({
  name: "LiIcon",
  inheritAttrs: !1,
  __name: "Icon",
  props: {
    border: { type: Boolean },
    fixedWidth: { type: Boolean },
    flip: {},
    icon: {},
    mask: {},
    listItem: { type: Boolean },
    pull: {},
    pulse: { type: Boolean },
    rotation: {},
    swapOpacity: { type: Boolean },
    size: {},
    spin: { type: Boolean },
    transform: {},
    symbol: { type: [Boolean, String] },
    title: {},
    inverse: { type: Boolean },
    bounce: { type: Boolean },
    shake: { type: Boolean },
    beat: { type: Boolean },
    fade: { type: Boolean },
    beatFade: { type: Boolean },
    spinPulse: { type: Boolean },
    spinReverse: { type: Boolean },
    type: {},
    color: {}
  },
  setup(t) {
    const o = t, n = e(() => u(o, ["type", "color"])), a = e(() => ({ color: o.color ?? void 0 }));
    return (p, b) => (l(), r("i", c({
      class: ["li-icon", [`li-icon-${o.type}`]],
      style: a.value
    }, p.$attrs), [
      i(m(f), y(B(n.value)), null, 16)
    ], 16));
  }
}), v = /* @__PURE__ */ d(I, [["__scopeId", "data-v-4ac1c3ce"]]), L = _(v);
export {
  v as L,
  L as a
};
