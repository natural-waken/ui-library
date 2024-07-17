import ConfigProvider from "./ConfigProvider.vue";
import { withInstall } from '@ui-library/utils'

export const LiConfigProvider = withInstall(ConfigProvider)

export * from './types'
export * from './hooks'
// 使用 withInstall 函数包装 ConfigProvider 组件，使其可以通过 Vue.use() 方法进行全局注册。