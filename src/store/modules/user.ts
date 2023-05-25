import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import { ref } from 'vue'
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes'

// 创建用户小仓库  ~函数式
const useUserStore = defineStore('User', () => {
    // 存储用户路由表
    let menuRoutes: any = []
    menuRoutes = [...constantRoute, ...asnycRoute, anyRoute]

    const token = ref('TOKEN')
    token.value = localStorage.getItem('token') || '' // 获取当前用户的 token 值或从登录页面获取。
    const userName = ref() // 定义用户信息
    const userAvatar = ref() // 定义用户头像信息

    // 用户登录
    const userLogin = async (data: any) => {
        let res: any = await reqLogin(data)
        // 返回状态码为200 表示登录验证成功  进行token存储
        if (res.code === 200) {
            token.value = res.data.token
            localStorage.setItem('token', res.data.token)

            return 'ok'
        } else {
            // 抛出一个 promise 错误 在登录页使用try catch 捕获错误信息
            return Promise.reject(new Error(res.data.message))
        }
    }
    // 用户登录成功获取用户信息
    const userInfo = async () => {
        let res: any = await reqUserInfo()

        if (res.code === 200) {
            userName.value = res.data.checkUser.username
            userAvatar.value = res.data.checkUser.avatar
        }
    }

    return {
        token,
        userLogin,
        menuRoutes,
        userInfo,
        userName,
        userAvatar,
    }
})

export default useUserStore
