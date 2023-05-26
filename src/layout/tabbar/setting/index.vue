<template>
    <el-select v-model="lang" @change="changeLang" placeholder="中文">
        <el-option label="中文" value="zn" />
        <el-option label="英文" value="en" />
    </el-select>
    <el-button size="small" icon="Refresh" circle @click="refreshCom"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>

    <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
        <!-- 表单元素 -->
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker size="small" @change="changeThemeColor" v-model="themeColor" show-alpha />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" v-model="dark" class="mt-2" style="margin-left: 24px" inline-prompt
                    active-icon="MoonNight" inactive-icon="Sunny" />
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button size="small" icon="Setting" circle></el-button>
        </template>
    </el-popover>

    <img :src="userStore.userAvatar" style="width: 24px;height: 24px;margin:0px 10px;border-radius: 50%;">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.userName }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import uselayoutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';

import { useI18n } from "vue-i18n";
const { locale } = useI18n();

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const layoutSettingStore = uselayoutSettingStore()

const lang = ref()
// 切换语言
const changeLang = () => {
    locale.value = lang.value
}

const refreshCom = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh
}

// 控制全屏按钮
const fullScreen = () => {
    // 通过 fullscreenElement 获取当前是否为全屏模式
    let full = document.fullscreenElement
    if (!full) {
        // 利用dom  文档根节点的方法 requestFullscreen 实现全屏模式 
        document.documentElement.requestFullscreen()
    } else {
        // 退出全屏
        document.exitFullscreen()
    }
}

// 退出登录
const logout = async () => {
    await userStore.userLogout()
    const path = route.path
    router.push({ path: '/login', query: { redirect: path } })
}

// 切换暗黑模式
let dark = ref(false)
const changeDark = () => {
    let html = document.documentElement
    dark.value ? html.className = 'dark' : html.className = ''
}

// 主题颜色设置
let themeColor = ref()
const changeThemeColor = () => {
    const el = document.documentElement
    el.style.setProperty('--el-color-primary', themeColor.value)
}
</script>

<script lang="ts">
export default {
    name: "Setting"
}
</script>
<style scoped></style>