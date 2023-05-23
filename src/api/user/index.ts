import request from '@/utils/request'

// 定义请求地址字典
const requestDict = {
    login_url: '/user/login',
    userinfo_url: '/user/info',
}

// 定义登录接口
export const reqLogin = (data: any) => {
    request.post(requestDict.login_url, data)
}

// 定义获取用户信息接口
export const reqUserInfo = (data: any) => {
    request.get(requestDict.userinfo_url, data)
}
