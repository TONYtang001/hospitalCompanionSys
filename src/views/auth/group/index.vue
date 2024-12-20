<template>
    <PanelHead :route="route" />
    <div class="btns">
        <el-button :icon="Plus" type="primary" size="small" @click="open(null)">add</el-button>
    </div>
    <el-table :data="tableData.list" style="width: 100%;">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="昵称" />
        <el-table-column prop="permissionName" label="菜单权限" width="500px"/>
        <el-table-column label="操作">
            <!-- scope.row 是指当前行的数据对象。el-table 组件会为每一行生成一个 scope 对象，
             其中包含该行的所有数据。通过 scope.row，
             可以访问到该行的具体数据，例如 id、name 和 permission 等字段。 -->
            <template #default="scope">
                <el-button
                type="primary"
                @click="open(scope.row)"
                >
                edit
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
     <div class="pagination-info">
        <el-pagination
        v-model:current-page="paginationData.pageNum"
        :page-size="paginationData.pageSize"
        :background="false"
        size="small"
        layout="total, prev, pager, next, sizes"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        />
     </div>
    
    
    <el-dialog 
        v-model="dialogFromVisible" 
        :before-close="beforeClose"
        title="添加权限"
        width="500"
    >
        <el-form
            ref="formRef"
            label-width="100px"
            label-position="left"
            :model="form"
            :rules="rules"
        >
            <el-form-item v-show="false" prop="id">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请填写权限名称"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="permissions">
                <el-tree 
                ref="treeRef"
                :data="permissionData"
                style="max-width: 600px;"
                node-key="id"
                show-checkbox
                :default-checked-keys="defaultKeys"
                :default-expanded-keys="[2]"
                >
                </el-tree>
            </el-form-item>
        </el-form>    
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="confirm(formRef)">
                Confirm
                </el-button>
            </div>
        </template>

    </el-dialog>
</template>

<script setup>

import { ref, reactive, onMounted, nextTick } from 'vue';
import { userGetMenu, userSetMenu, menuList } from '../../../api';
import { Plus } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';


const route = useRoute()

    onMounted(() => {
        // 菜单数据
        userGetMenu()
        .then(({data})=>{
            console.log(data);
            permissionData.value = data.data
        })
        getListData()
    })

    // 分页
    const handleSizeChange = (val) => {
        paginationData.pageSize = val
        getListData()
    }

    const handleCurrentChange = (val) => {
        paginationData.pageNum = val
        getListData()
    }


    const paginationData = reactive({
        pageNum: 1,
        pageSize: 10
    })

    // 列表数据
    const tableData = reactive({
        list: [],
        total: 0
    })

    // 打开弹窗
    const open = (rowData = {}) => {
        dialogFromVisible.value = true
        // 弹窗打开form生成是异步的
        // 使用 nextTick 可以确保等到 DOM 更新完成后，再将 rowData 中的 id 和 name 赋值给 form，并设置树形选择框的选中状态。
        nextTick(() => {
            if(rowData){
                // 浅拷贝
                Object.assign(form, { id: rowData.id, name: rowData.name})
                treeRef.value.setCheckedKeys(rowData.permission)
            }
        })
    }


    // 获取权限列表数据
    const getListData = () => {
        menuList(paginationData)
        .then((data) => {
            console.log(data, 'listData');
            const {list, total} = data.data.data
            tableData.list = list
            tableData.total = total
        })
    }

    const form = reactive({
        id: '',
        name: '',
        permissions: ''   
    })
    // 树形菜单权限数据
    const permissionData = ref([])

    // 弹窗显示参数（默认置false
    const dialogFromVisible = ref(false)
    // 关闭弹窗回调函数
    const beforeClose = () => {
        dialogFromVisible.value = false
        // 重置表单和tree选择树
        formRef.value.resetFields()
        treeRef.value.setCheckedKeys(defaultKeys)
    }
    // 选中权限
    const defaultKeys = [4, 5]
    const treeRef = ref()

    // 提交表单
    const formRef = ref()
    // formEl 是在调用 confirm 函数时传入的，是通过 ref 获取的表单组件的引用
    const confirm = async (formEl) => {
        if (!formEl) return
        // valid表示表单是否合法
        await formEl.validate((valid, fields)=>{
            if (valid) {
                const permissions = JSON.stringify(treeRef.value.getCheckedKeys())
                userSetMenu({name: form.name, permissions, id: form.id})
                .then((data)=>{
                    // console.log(data, 'confirmData');
                    if(data.data.code === 10000){
                        ElMessage.success(data.data.data)
                    }
                    beforeClose()
                    getListData()
                })


            }else {
                console.log('error submit!', fields)
            }
        })
    }

    // 表单校验
    const rules = reactive({
        name: [{ required: true, trigger: 'blur', message: '请输入权限名称'}],
    })
</script>

<style scoped>
    .btns {
        padding: 10px 0 10px 10px;
        background-color: #fff;
    }
</style>