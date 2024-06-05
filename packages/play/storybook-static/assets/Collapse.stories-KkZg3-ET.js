import{G as n,J as a}from"./index-DU00sYR8.js";import"./vue.esm-bundler-CfMv8AZU.js";const m={title:"Components/Collapse",component:n,subcomponents:{LiCollapseItem:a},tags:["autodocs"]},e={render:s=>({components:{LiCollapse:n,LiCollapseItem:a},setup(){return{args:s}},template:`
            <li-collapse v-bind="args">
                <li-collapse-item name="a" title="Title a">
                    <div>this is content a</div>
                </li-collapse-item>
                <li-collapse-item name="b" title="title b">
                    <div>this is content b</div>
                </li-collapse-item>
                <li-collapse-item name="c" title="title c  disable" disabled>
                    <div>this is content c</div>
                </li-collapse-item>
            </li-collapse>
        `}),args:{accordion:!0,modelValue:["a"]}};var t,l,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: args => ({
    components: {
      LiCollapse,
      LiCollapseItem
    },
    setup() {
      return {
        args
      };
    },
    template: \`
            <li-collapse v-bind="args">
                <li-collapse-item name="a" title="Title a">
                    <div>this is content a</div>
                </li-collapse-item>
                <li-collapse-item name="b" title="title b">
                    <div>this is content b</div>
                </li-collapse-item>
                <li-collapse-item name="c" title="title c  disable" disabled>
                    <div>this is content c</div>
                </li-collapse-item>
            </li-collapse>
        \`
  }),
  args: {
    accordion: true,
    modelValue: ["a"]
  }
}`,...(i=(l=e.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};const p=["Default"];export{e as Default,p as __namedExportsOrder,m as default};
