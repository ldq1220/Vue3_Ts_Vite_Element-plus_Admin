<template>
    <el-config-provider :locale="locale">
        <RouterView></RouterView>
    </el-config-provider>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
let locale = ref(zhCn)
</script>

<style scoped></style>
