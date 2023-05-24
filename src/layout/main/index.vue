<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<script setup lang='ts'>
import { watch, ref, nextTick } from 'vue';
import uselayoutSettingStore from '@/store/modules/setting';
const layoutSettingStore = uselayoutSettingStore()

const flag = ref(true)  // 定义组件销毁变量 通过v-if进行销毁

watch(() => layoutSettingStore.refresh, () => {
    flag.value = false
    // 利用nextTick 生命周期钩子 在组件销毁后的下一个阶段 创建组件
    nextTick(() => {
        flag.value = true
    })
})

</script>

<style scoped>
.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all 1.5s;
}

.fade-enter-to {
    opacity: 1;
}
</style>
