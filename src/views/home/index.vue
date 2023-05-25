<template>
    <div>
        <h2>home develop</h2>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();

onMounted(() => {
    userStore.userInfo()
})



</script>

<style></style>
