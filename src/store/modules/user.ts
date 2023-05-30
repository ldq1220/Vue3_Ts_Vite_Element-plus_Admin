import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import { ref } from 'vue'
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes'
import router from '@/router/index.ts'

//引入深拷贝方法
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'

// 创建用户小仓库  ~函数式
const useUserStore = defineStore('User', () => {
    // 存储用户路由表
    let menuRoutes: any = ref([])

    // menuRoutes = [...constantRoute, ...asnycRoute, anyRoute]

    const token = ref('TOKEN')
    token.value = localStorage.getItem('token') || '' // 获取当前用户的 token 值或从登录页面获取。
    const userName = ref() // 定义用户信息
    const userAvatar = ref() // 定义用户头像信息

    // 用户登录
    const userLogin = async (data: any) => {
        let res: any = await reqLogin(data)
        // 返回状态码为200 表示登录验证成功  进行token存储
        if (res.code === 200) {
            token.value = res.data
            localStorage.setItem('token', res.data)

            return 'ok'
        } else {
            // 抛出一个 promise 错误 在登录页使用try catch 捕获错误信息
            return Promise.reject(new Error(res.data))
        }
    }

    //用于过滤当前用户需要展示的异步路由
    function filterAsyncRoute(asnycRoute: any, routes: any) {
        return asnycRoute.filter((item: any) => {
            if (routes.includes(item.name)) {
                if (item.children && item.children.length > 0) {
                    //硅谷333账号:product\trademark\attr\sku
                    item.children = filterAsyncRoute(item.children, routes)
                }
                return true
            }
        })
    }

    // 用户登录成功获取用户信息
    const userInfo = async () => {
        let res: any = await reqUserInfo()
        if (res.code === 200) {
            userName.value = res.data.username
            userAvatar.value = res.data.avatar
            //计算当前用户需要展示的异步路由
            let userAsyncRoute = filterAsyncRoute(
                cloneDeep(asnycRoute),
                res.data.routes,
            )
            menuRoutes.value = [...constantRoute, ...userAsyncRoute, anyRoute]
            //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加

            menuRoutes.value.forEach((route: any) => {
                router.addRoute(route)
                console.log(route)
            })

            console.log(menuRoutes.value, router.getRoutes())

            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    }

    // 退出登录
    const userLogout = async () => {
        let res: any = await reqLogout()

        if (res.code == 200) {
            token.value = ''
            userName.value = ''
            userAvatar.value = ''
            localStorage.removeItem('token')
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    }

    return {
        token,
        userLogin,
        menuRoutes,
        userInfo,
        userName,
        userAvatar,
        userLogout,
    }
})

export default useUserStore
