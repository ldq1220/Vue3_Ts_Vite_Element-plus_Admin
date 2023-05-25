import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'

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
