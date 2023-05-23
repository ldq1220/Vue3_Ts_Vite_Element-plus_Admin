<template>
    <div class="box">
        我是hellow
        <h1>hellow组件</h1>
        <h2>想添加我,必须commit带关键词</h2>
        <h2>想添加我,必须commit带关键词</h2>
        <h2>想添加我,必须commit带关键词</h2>
        <h2>想添加我,必须commit带关键词</h2>
        <el-pagination
            :page-sizes="[100, 200, 300, 400]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
        />
        <div>
            <svg-icon
                name="logout"
                width="50px"
                height="50px"
                color="red"
            ></svg-icon>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box {
    width: 400px;
    height: 400px;
    background-color: pink;

    h1 {
        color: red;
    }

    h2 {
        color: $color;
    }
}
</style>
