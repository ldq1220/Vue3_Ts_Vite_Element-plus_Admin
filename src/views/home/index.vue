<template>
    <div>
        <h2>home develop</h2>
        <el-pagination :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" :total="400" />
        <p>{{ $t('menu.home') }}</p>
    </div>
</template>

<script setup lang="ts">
</script>

<style></style>
