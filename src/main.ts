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
const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
// 引入全局组件
import gloablComponent from './components/index'

import axios from 'axios'
axios({
    url: '/api/user/login',
    method: 'post',
    data: {
        username: 'admin',
        password: '111111',
    },
}).then((res) => {
    console.log(res)
})

app.use(gloablComponent)

app.mount('#app')
