<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <!-- 登录的表单 -->
                <el-form class="login_form" :rules="rules" :model="loginForm" ref="loginFormDom">
                    <h1>Hello</h1>
                    <h2>欢迎你</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user';
import { ElNotification } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { getTime } from '@/utils/getTime'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const loading = ref(false) // 控制登录按钮 加载效果
const loginFormDom = ref()

const loginForm = reactive({
    username: 'admin',
    password: 'atguigu123',
})

// 组定义表单校验规则
const validateUserName = (_rule: any, value: any, callback: any) => {
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('用户名至少为5位'))
    }
}
const validateUserPass = (_rule: any, value: any, callback: any) => {
    if (value.length >= 6) {
        callback()
    } else {
        callback(new Error('密码至少为6位'))
    }
}

// 表单校验规则
const rules = reactive({
    username: [
        { validator: validateUserName, trigger: 'blur' }
    ],
    password: [
        { validator: validateUserPass, trigger: 'blur' }
    ]
})

const login = async () => {
    // 保证表单校验通过 再发请求
    await loginFormDom.value.validate()

    const path: any = route.query.redirect  // 
    loading.value = true
    try {
        await userStore.userLogin(
            {
                username: loginForm.username,
                password: loginForm.password
            }
        )
        loading.value = false
        router.push({ path: path || '/' })
        ElNotification({
            type: 'success',
            message: '登录成功',
            title: getTime()
        })
    } catch (error: any) {
        loading.value = false
        ElNotification({
            type: 'error',
            message: error.message
        })
    }
}




</script>
<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            font-size: 20px;
            color: white;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>
