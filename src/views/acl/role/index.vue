<template>
    <div>
        <el-card>
            <el-form :inline="true" class="search_box">
                <el-form-item label="职位搜索">
                    <el-input placeholder="请输入您想搜索的职位！"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                    <el-button type="warning">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>


        <el-card style="margin-top: 10px;">
            <el-button type="primary" icon="Edit" @click="addRole">添加角色</el-button>

            <el-table :data="tableData" border style="width: 100%;margin-top: 10px;">
                <el-table-column type="index" label="#" width="80" align="center" />
                <el-table-column prop="id" label="id" width="80" align="center" />
                <el-table-column prop="roleName" label="职位名称" align="center" />
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip align="center" />
                <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip align="center" />
                <el-table-column label="操作" align="center" width="280">
                    <template #default="scope">
                        <el-button type="success" size="small" icon="User">分配权限</el-button>
                        <el-button type="primary" size="small" icon="Edit" @click="roleUpdata(scope.row)">编辑</el-button>

                        <el-popconfirm :title="`你确定要删除${scope.row.roleName}?`" width="260px"
                            @confirm="removeRolebtn(scope.row.id)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>

        <el-dialog v-model="dialogFormVisible" title="新增角色">
            <el-form :model="RoleParams" :rules="rules" ref="form">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input placeholder="请你输入职位名称" v-model="RoleParams.roleName"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="save">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { getAllRole, addOrUpdataRole, removeRole } from '@/api/acl/role'

onMounted(() => {
    getRoleData()
})

const validatePass = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack();
    } else {
        callBack(new Error('职位名称至少两位'))
    }
}
// 表格数据
let tableData = ref()
// dialog 数据
let RoleParams: any = reactive({
    roleName: ''
})
// dialog 表单校验
const rules = reactive({
    roleName: [{ required: true, trigger: 'blur', validator: validatePass }]
})
// 表单实例
const form = ref()
// 当前页
let currentPage = ref(1)
// 当前每页多少条
let pageSize = ref(10)
// 共多少条
let total = ref()
// 搜索数据
let searchText = ref('')
// 控制 新增or编辑 form表单 dialog 隐藏显示
let dialogFormVisible = ref(false)


// 获取表格最新数据
const getRoleData = async (pager = 1) => {
    //修改当前页码
    currentPage.value = pager;
    let res: any = await getAllRole(currentPage.value, pageSize.value, searchText.value)
    if (res.code === 200) {
        total.value = res.data.total;
        tableData.value = res.data.records;
    }
}

// 点击选择数据
const handleSizeChange = (value: any) => {
    pageSize.value = value
    getRoleData()
}
// 点击分页
const handleCurrentChange = (value: any) => {
    getRoleData(value)
}

// 新增角色
const addRole = () => {
    dialogFormVisible.value = true
    //清空数据
    Object.assign(RoleParams, {
        roleName: '',
        id: ''
    });
    //清空上一次表单校验错误结果
    nextTick(() => {
        form.value.clearValidate();
    })
}

// 编辑角色
const roleUpdata = (row: any) => {
    dialogFormVisible.value = true
    // RoleParams = { ...row }
    Object.assign(RoleParams, row);
}

// 点击确定按钮
const save = async () => {
    // 表单验证通过
    await form.value.validate();
    let res = await addOrUpdataRole(RoleParams)

    if (res.code == 200) {
        //对话框显示
        dialogFormVisible.value = false;
        // 清除数据

        //再次获取全部的已有的职位
        getRoleData(RoleParams.id ? currentPage.value : 1);
    }
}

// 删除角色
const removeRolebtn = async (id: number) => {
    let res: any = await removeRole(id)

    if (res.code == 200) {
        getRoleData(currentPage.value)
    }
}


</script>

<script lang="ts">
export default {
    name: "Role"
}
</script>

<style scoped>
.search_box {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
