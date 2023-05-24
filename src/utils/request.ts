// 引入axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'

// 创建axios实例
const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

// 配置请求拦截器
request.interceptors.request.use((config) => {
    // 配置请求头
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
        config.headers.token = token
    }
    return config
})

// 配置响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data // 返回响应数据
    },
    (error) => {
        // 失败回调
        let message = ''
        const status = error.response.status // 状态码或错误信息

        switch (status) {
            case 401:
                message = '您没有权限访问此页面,token过期'
                break
            case 403:
                message = '您访问的页面权限不足,无效访问'
                break
            case 404:
                message = '请求地址错误'
                break
            case 500:
                message = '服务器出现问题'
                break
            default:
                message = '网络出现问题'
                break
        }
        // 错误的提示信息
        ElMessage({
            type: 'error',
            message,
        })
        return error.response.data // 返回响应数据或错误信息的包装器
    },
)

export default request
