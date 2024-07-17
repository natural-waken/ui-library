import { createApp } from 'vue'
import App from './App.vue'
import UiLibrary, { zhCn } from 'ui-library'

// 引入样式     不然只有 App.vue  中组件  没有样式
import 'ui-library/dist/index.css'

createApp(App).use(UiLibrary, { locale: zhCn }).mount('#app')
