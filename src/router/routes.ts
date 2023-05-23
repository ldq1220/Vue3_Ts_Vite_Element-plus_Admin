// 定义常量路由
export const constantRoute = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404', // 重定向到404页面
        name: 'any',
    },
]
