<template>
    <div class="logo">
        <img src="../../../public//logo.png" alt="">
        <p>{{ title }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
let props = defineProps(['title'])

</script>
<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 8px;

    img {
        width: 40px;
        height: 40px;
    }

    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 10px;
    }
}
</style>