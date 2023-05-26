<template>
    <template v-for="item in menuList" :key="item.path">
        <!--没有子路由-->
        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <!-- <span>{{ item.meta.title }}</span> -->
                    <span>{{ $t(`menu.${item.meta.title}`) }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由但是只有一个子路由 -->
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <!-- <span>{{ item.meta.title }}</span> -->
                    <span>{{ $t(`menu.${item.children[0].meta.title}`) }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由且个数大于一个1 -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ $t(`menu.${item.meta.title}`) }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>


<script setup lang='ts'>
import { defineProps } from 'vue';

defineProps(['menuList'])
</script>

<!-- 注意 必须开启这个  要不然 在组件内幕调用自己 递归是不生效的 -->
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style></style>
