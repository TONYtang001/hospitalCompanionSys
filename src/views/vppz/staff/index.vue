<template>
    <PanelHead :route="route" />
    <div class="btns">
        <el-button :icon="Plus" type="primary" size="small" @click="open(null)">add</el-button>
        <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="Are you sure to delete this?"
            @confirm="confirmEvent"
        >
            <template #reference>
            <el-button :icon="Delete" type="danger" size="small">Delete</el-button>
            </template>
        </el-popconfirm>
    </div>
    
    <el-table :data="tableData.list" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="昵称" />
        <el-table-column prop="avatar" label="头像">
            <template #default="scope">
                <el-image
                    style="width: 50px;height: 50px;"
                    :src="scope.row.avatar"
                />
            </template>
        </el-table-column> 
        <el-table-column prop="sex" label="性别">
            <template #default="scope">
                {{ scope.row.sex === '1' ? '男' : '女' }}
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
        title="陪护师添加"
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
                <el-input v-model="form.id" />
            </el-form-item>
            <el-form-item label="昵称" prop="name">
                <el-input v-model="form.name" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-button v-if="!form.avatar" type="primary" @click="dialogImgVisible=true">点击上传</el-button>
                <el-image 
                    v-else
                    :src="form.avatar"
                    style="width: 100px;height: 100px;"
                />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" value="1" />
                    <el-option label="女" value="2" />
                </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input-number v-model="form.age" :min="18" :max="50"/>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="是否生效" prop="active">
                <el-radio-group v-model="form.active">
                    <el-radio :value="0">失效</el-radio>
                    <el-radio :value="1">生效</el-radio>
                </el-radio-group>
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
    <el-dialog 
        v-model="dialogImgVisible" 
        :before-close="beforeClose"
        title="选择图像"
        width="680"
    >
        <div class="image-list">
            <div v-for="(item, index) in fileList" :key="item.name" class="img-box" @click="selectIndex = index">
                <div v-if="selectIndex === index" class="select">
                    <el-icon color="#fff"><Check /></el-icon>
                </div>
                <el-image 
                    style="width: 148px;height: 148px;"
                    :src="item.url"
                />
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogImgVisible=false">Cancel</el-button>
                <el-button type="primary" @click="confirmImage">Confirm</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
    import { ref, reactive, onMounted, nextTick } from 'vue'
    import { Plus, InfoFilled, Delete } from '@element-plus/icons-vue';
    import { photoList, companion, companionList, deleteCompanion } from '../../../api'
    import dayjs from 'dayjs';
    import { ElMessage } from 'element-plus';
    import { useRoute } from 'vue-router';


    const route = useRoute()


    onMounted(() => {
        photoList()
        .then(({data}) => {
            fileList.value = data.data
        })
        getListData()
    })


    
    // 表单弹窗
    const dialogFromVisible = ref(false)

    // 选择头像弹窗
    const dialogImgVisible = ref(false)
    const fileList = ref([])
    // 选中的头像
    const selectIndex = ref(0)

    const confirmImage = () => {
        form.avatar = fileList.value[selectIndex.value].url
        dialogImgVisible.value = false
    }

    const beforeClose = () => {
        dialogFromVisible.value = false
        // 重置表单和tree选择树
        formRef.value.resetFields()
    }

    const formRef = ref()
    const form = reactive({
        id: '',
        mobile: '',
        active: 1,
        age: 28,
        avatar: '',
        name: '',
        sex: ''
    })

    const rules = reactive({
        name: [{ required: true, trigger: 'blur', message: '请输入昵称'}],
        avatar: [{ required: true, message: '请选择头像'}],
        sex: [{ required: true, trigger: 'blur', message: '请选择性别'}],
        mobile: [{ required: true, trigger: 'blur', message: '请填写手机号'}],
    })

    const confirm = async (formEl) => {
        if (!formEl) return
        // valid表示表单是否合法
        await formEl.validate((valid, fields)=>{
            if (valid) {
                // 创建陪护师
                // console.log(form);
                
                companion(form)
                .then(({data})=>{
                    console.log(data, 'companion');
                    if(data.code === 10000){
                        ElMessage.success(data.data)
                        // dialogFromVisible.value = false
                        getListData()
                        beforeClose()
                    }
                })
            }else {
                console.log('error submit!', fields)
            }
        })
    }
    // open方法被打开按钮和编辑按钮复用
    const open = (rowData = {}) => {
        dialogFromVisible.value = true
        nextTick(() => {
            // 如果是编辑
            if (rowData) {
                Object.assign(form, rowData)
            }
        })
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

    // 请求列表数据
    const getListData = () => {
        companionList(paginationData)
        .then(({data}) => {
            console.log(data, 'companionList');

            const {list, total} = data.data
            list.forEach(item => {
                item.create_time = dayjs(item.create_time).format('YYYY-MM-DD')
            });
            tableData.list = list
            tableData.total = total

            if(data.code === 10000){
                
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

    // 多选

    const selectTableData = ref([])

    const handleSelectionChange = (val) => {
        selectTableData.value = val.map(item => ({ id: item.id }))
    }

    const confirmEvent = () => {
        if (!selectTableData.value.length) {
            return ElMessage.warning('请选择至少一项')
        } else {
            deleteCompanion({id: selectTableData.value})
            .then(({data}) => {
                if(data.code === 10000){
                    ElMessage.success('删除成功！')
                    getListData()
                }
            })
        }
    }

</script>

<style lang="less" scoped>
    .btns {
        padding: 10px 0 10px 10px;
        background-color: #fff;
    }
    .image-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .img-box {
            position: relative;
            .select {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 24px;
            height: 24px;
            background-color: #67c23a;
            z-index: 999;
            display: flex;
            justify-content: center;
            align-items: center;
            }
        }
        .el-image {
            margin-right: 10px;
            margin-bottom: 10px;
        }
    }
    .flex-box {
        display: flex;
        align-items: center;
    }
</style>