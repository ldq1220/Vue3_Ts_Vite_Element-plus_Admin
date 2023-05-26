<template>
    <!-- 顶部左侧静态 -->
    <el-icon style="margin-right:10px">
        <!-- <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component> -->
        <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'" @click="fold"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 面包动态展示路由名字与标题 -->
        <el-breadcrumb-item v-for="item in route.matched" :key="item.path" v-show="item.meta.title" :to="item.path">
            <!-- 图标 -->
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- 面包屑展示匹配路由的标题 -->
            <span>{{ $t(`menu.${item.meta.title}`) }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import uselayoutSettingStore from '@/store/modules/setting.ts'
import { useRoute } from 'vue-router';
const layoutSettingStore = uselayoutSettingStore()

const fold = () => {
    layoutSettingStore.changeFold()
}
const route = useRoute()


</script>

<script lang="ts">
export default {
    name: "Breadcrumb"
}
</script>

<style scoped></style>