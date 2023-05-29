<template>
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column prop="address" label="操作" width="230px">
            <template #default="scoped">
                <el-button type="primary" size="small" :disabled="scoped.row.level == 4 ? true : false"
                    @click="addMenu(scoped.row)">{{
                        scoped.row.level == 3 ? '添加功能'
                        : '添加菜单' }}</el-button>
                <el-button type="success" size="small" :disabled="scoped.row.level == 1 ? true : false"
                    @click="updateMenu(scoped.row)">编辑</el-button>
                <el-popconfirm :title="`你确定要删除${scoped.row.name}?`" width="260px" @confirm="deleteMenu(scoped.row.id)">
                    <template #reference>
                        <el-button type="danger" size="small"
                            :disabled="scoped.row.level == 1 ? true : false">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>

    <!-- 新增 or 编辑 弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="新增菜单" width="500px">
        <el-form :model="formData">
            <el-form-item label="名称">
                <el-input placeholder="请你输入菜单名称" v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-input placeholder="请你输入权限数值" v-model="formData.code"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="save">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import { reqAllPermisstion, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/permission';
import { ElMessage } from "element-plus";

// 表格数据
let tableData = ref([])
// 新增 or 编辑 弹窗展示
let dialogFormVisible = ref(false)
let formData = reactive({
    id: 0,
    name: '', // 名称   
    code: '', // 权限编码
    level: 0, 	// 级别   0：一级；1：二级；2：三级。
    pid: 0   	// 父级级别。
})


onMounted(() => {
    getHasPermisstion()
})

// 获取菜单数据的方法
const getHasPermisstion = async () => {
    let res: any = await reqAllPermisstion()
    if (res.code == 200) {
        tableData.value = res.data
    }
}

// 新增菜单
const addMenu = (row: any) => {
    // 清空数据
    Object.assign(formData, {
        id: 0,
        name: '',
        code: '',
        level: 0,
        pid: 0
    })
    dialogFormVisible.value = true
    formData.level = row.level + 1 // 级别加1 
    formData.pid = row.id
}

// 编辑菜单
const updateMenu = (row: any) => {
    Object.assign(formData, row)
    dialogFormVisible.value = true
}

// 新增菜单 or 编辑菜单 确定方法
const save = async () => {
    //发请求:新增子菜单|更新某一个已有的菜单的数据
    let res: any = await reqAddOrUpdateMenu(formData);
    if (res.code == 200) {
        //对话框隐藏
        dialogFormVisible.value = false;
        //提示信息
        ElMessage({ type: 'success', message: formData.id ? '更新成功' : '添加成功' })
        //再次获取全部最新的菜单的数据
        getHasPermisstion();
    }
}


// 删除菜单
const deleteMenu = async (id: number) => {
    let res: any = await reqRemoveMenu(id);
    if (res.code == 200) {
        ElMessage({ type: 'success', message: '删除成功' });
        getHasPermisstion();
    }
}



</script>

<style></style>
