import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'

const router = createRouter({
    // 路由模式
    history: createWebHashHistory(),
    routes: constantRoute,
})

export default router
