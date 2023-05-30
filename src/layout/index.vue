<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="layoutSettingStore.fold ? 'fold' : ''">
            <Logo :title="$t('title.text')"></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件-->
                <!-- 菜单组件-->
                <el-menu :collapse="layoutSettingStore.fold ? true : false" :default-active="route.path"
                    background-color="#706fd3" text-color="white" active-text-color="yellowgreen" :router="true">
                    <!--根据路由动态生成菜单-->
                    <Menu :menuList="menuList"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="layoutSettingStore.fold ? 'fold' : ''">
            <Tabbar />
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main" :class="layoutSettingStore.fold ? 'fold' : ''">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user.ts'
import { useRoute } from 'vue-router'
import uselayoutSettingStore from '@/store/modules/setting.ts'


const route = useRoute()
// 获取菜单是否折叠信息
const layoutSettingStore = uselayoutSettingStore()
// 获取路由表信息  并传送给 菜单组件
const userStore = useUserStore()
const menuList = userStore.menuRoutes

</script>


<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        transition: all 0.3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }

        &.fold {
            width: $base-menu-min-width;
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width );
            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width );
            left: $base-menu-min-width;
        }

    }
}
</style>