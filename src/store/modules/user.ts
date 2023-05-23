import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'

// 创建用户小仓库
const useUserStore = defineStore('User', {
    state: () => {
        return {}
    },
    actions: {
        // 用户登录方法
        async userLogin(data: any) {
            let res = await reqLogin(data)
            console.log(res)
        },
    },
    getters: {},
})

export default useUserStore
