<template>
    <PanelHead :route="route" />
    <el-table :data="tableData.list" style="width: 100%;">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="昵称" />
        <el-table-column prop="permissions_id" label="所属组别">
            <template #default="scope">
                <!-- 相当于用账号信息中对应的permissions_id来找到权限（角色）名称 -->
                {{ permissionName(scope.row.permissions_id) }}
            </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" />
        <el-table-column prop="active" label="状态">
            <template #default="scope">
                <el-tag :type="scope.row.active ? 'success' : 'danger'">{{ scope.row.active ? '正常' : '失效' }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
            <template #default="scope">
                <div class="flex-box">
                    <el-icon><Clock /></el-icon>
                    <span style="margin-left: 10px;">{{ scope.row.create_time }}</span>
                </div>
            </template>
        </el-table-column>
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
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile" disabled></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="菜单权限" prop="permissions_id">
                <el-select
                    v-model="form.permissions_id"
                    placeholder="请选择菜单权限"
                    style="width: 240px;"
                >
                    <el-option 
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
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
import { onMounted, reactive, ref } from 'vue';
import {authAdmin, menuSelectList, updateUser} from '../../../api'
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';


const route = useRoute()


// Vuex全局用户名状态管理
const store = useStore();


const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})

// 列表数据
const tableData = reactive({
    list: [],
    total: 0
})

// 权限选择列表
const options = ref([])
// 根据权限ID匹配权限名称
const permissionName = (id) => {
    // 查找 options.value 数组中第一个 id 等于传入的 id 的元素，查到会返回该元素，否则返回 undefined
    const data = options.value.find(el => el.id === id)
    return data ? data.name : '超级管理员'
}


// onMounted是干嘛的==>生命周期钩子，在组件加载后，自动执行里面的代码
onMounted(() => {
    getListData()

    menuSelectList()
    .then(({data})=>{
        console.log(data, 'menuSelectList');
        options.value = data.data
    })

})

// 请求列表数据
const getListData = () => {
    authAdmin(paginationData)
    // authAdmin()
    .then(({data}) => {
        console.log(data, 'authAdmin');
        const {list, total} = data.data
        list.forEach(item => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD')
        });
        tableData.list = list
        tableData.total = total

        if(data.code === 10000){
            ElMessage.success(`${data.data.list[0].name}-${data.data.list[0].mobile}`)
            // 更新vuex的store中的当前用户名
            store.commit('setUserName', data.data.list[0].name);
        }
    })
}

// 分页
const handleSizeChange = (val) => {
    paginationData.pageSize = val
    getListData()
}

const handleCurrentChange = (val) => {
    paginationData.pageNum = val
    getListData()
}

// 弹窗
const dialogFromVisible = ref(false)

const beforeClose = () => {
    dialogFromVisible.value = false
        // 重置表单和tree选择树
    formRef.value.resetFields()
}

// 弹窗数据修改
const form = reactive({
    name: '',
    permissions_id: '',
    mobile: ''
})

// 获取表单实例
const formRef = ref()
// 表单提交
const confirm = async (formEl) => {
        if (!formEl) return
        // valid表示表单是否合法
        await formEl.validate((valid, fields)=>{
            if (valid) {
                updateUser({name: form.name, permissions_id: form.permissions_id})
                .then((data)=>{
                    // console.log(data, 'updateUser');
                    if(data.data.code === 10000){
                        // ElMessage.success(data.data.data)
                        // dialogFromVisible.value = false
                        beforeClose()
                        getListData()
                    }
                })
            }else {
                console.log('error submit!', fields)
            }
        })
    }


// 表单校验规则
const rules = reactive({
    name: [{ required: true, trigger: 'blur', message: '请输入昵称'}],
    permissions_id: [{ required: true, trigger: 'blur', message: '请选择权限角色' }]
})


// 打开弹窗
const open = (rowData) => {
    dialogFromVisible.value = true
    // 浅拷贝，将自定义的对象复制到form中
    Object.assign(form, { name: rowData.name, permissions_id: rowData.permissions_id, mobile: rowData.mobile})
    
    }


</script>

<style lang="less" scoped>
.flex-box {
    display: flex;
    align-items: center;
}
</style>