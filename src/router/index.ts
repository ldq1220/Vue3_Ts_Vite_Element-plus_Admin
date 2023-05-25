import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute, asnycRoute, anyRoute } from './routes'

const router = createRouter({
    // 路由模式
    history: createWebHashHistory(),
    routes: [...constantRoute, ...asnycRoute, anyRoute],
})

export default router
