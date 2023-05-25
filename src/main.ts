import { createApp } from 'vue'
import App from './App.vue'
// 引入全局样式
import '@/styles/index.scss'

// 引入element-puls
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// element-plus中文包
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// svg
import 'virtual:svg-icons-register'
// 引入全局组件
import gloablComponent from './components/index'
// 引入路由
import router from './router'
// 引入pinia
import store from './store'
// 全局引入element-puls的icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 全局引入element-puls的icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus, {
    locale: zhCn,
})

app.use(router)
app.use(store)

app.use(gloablComponent)

app.mount('#app')
