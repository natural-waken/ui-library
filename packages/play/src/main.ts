import { createApp } from 'vue'
import App from './App.vue'
import UiLibrary, { zhCn } from 'ui-library'

// 引入样式     不然只有 App.vue  中组件  没有样式
import 'ui-library/dist/index.css'

createApp(App).use(UiLibrary, { locale: zhCn }).mount('#app')



// 下面是演示按需引入的操作
// import { createApp } from 'vue'
// import App from './App.vue'
// import { LiButton, LiAlert } from 'ui-library'

// // 引入样式     不然只有 App.vue  中组件  没有样式
// import 'ui-library/dist/theme/Button.css'
// import 'ui-library/dist/theme/Alert.css'

// createApp(App).use(LiButton).use(LiAlert).mount('#app')
