<template>
    <div class="header-container flex-box">
        <div class="header-left flex-box">
            <el-icon class="icon" size="20" @click="store.commit('collapseMenu')"><Fold /></el-icon>
            <ul class="flex-box">
                <li 
                    v-for="(item, index) in selectMenu"
                    :key="item.path"
                    :class="{selected: route.path === item.path}"
                    class="tab flex-box">
                    <el-icon size="12"><component :is="item.icon" /></el-icon>
                    <router-link class="text flex-box" :to="{path: item.path}">
                        {{ item.name }}
                    </router-link>
                    <el-icon class="close" size="12" @click="closeTab(item, index)"><Close /></el-icon>
                </li>
            </ul>
        
        </div>
        <div class="header-right">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link flex-box">
                    <!-- 头像与用户名 -->
                    <el-avatar
                        :src=userInfo.avatar
                    />
                    <p class="user-name">{{userInfo.name}}</p>
                <el-icon class="el-icon--right">
                </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人空间</el-dropdown-item>
                    <el-dropdown-item command="cancel">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
    import { computed, reactive, ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex'
    import { authAdmin } from '../api'
    const router = useRouter()
    // 拿到当前的路由信息
    const route = useRoute()
    // 拿到store的实例对象，里面包含一些方法,store是一个全局对象，每个应用将仅仅包含一个 store 实例
    const store = useStore()

    const selectMenu = computed(() => store.state.menu.selectMenu)

    //点击关闭tag

const closeTab = (item, index) => { 
    store.commit('closeMenu', item)
    // 删除的非当前页tag
    if (route.path !== item.path) { 
        return
    }
    const selectMenuData = selectMenu.value
    // 删除的最后一项
    if (index === selectMenuData.length) {
        // 如果tag只有一个元素
        if (!selectMenuData.length) { 
            router.push('/')
        } else {
            router.push({
                path: selectMenuData[index - 1].path 
            })
        }
    } else { // 如果删除的是中间位置tag
        router.push({
            path: selectMenuData[index].path 
        })
    }
} 


const userInfo = JSON.parse(localStorage.getItem('pz_userInfo'))

// 从Vuex中获取当前状态的用户名（全局状态管理）
// const userName = computed(() => store.state.user.userName)

// const paginationData = reactive({
//     pageNum: 1,
//     pageSize: 10
// })

// const userName = ref('admin') 
// // 获取当前用户名
// const getName = () => {
//     authAdmin(paginationData)
//     .then((data)=>{
//         console.log(data,'111111');
        
//         if (data.data.code === 10000){
//             userName.value = data.data.data.list[0].name 
//             console.log('当前用户:', userName.value);
//         }
//     })
// }

// onMounted(() => {
//     getName()
// })


// 用户下拉菜单（登出功能）
const handleClick = (command) => {
    if (command === 'cancel') {
        localStorage.removeItem('pz_token')
        localStorage.removeItem('pz_userInfo')
        localStorage.removeItem('pz_V3pz')
        window.location.href = window.location.origin
    }
}

</script>


<style lang="less" scoped>
// 把flex布局样式抽象出来，便于复用
.flex-box {
    display: flex;
    align-items: center;
    height: 100%;
}
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #fff;
    padding-right: 25px;
    .header-left {
        height: 100%;
        .icon {
            width: 45px;
            height: 100%;
        }
        .icon:hover {
            background-color: #f5f5f5;
            cursor: pointer;
        }
        .tab {
            padding: 0 10px;
            height: 100%;
            .text {
                margin: 0 5px;
            }
            .close {
                visibility: hidden;
            }
            // &符号代表同级
            &.selected {
                a {
                    color: #409eff;
                }
                i {
                    color: #409eff;
                }
                background-color: #f5f5f5;
            }
        }
        .tab:hover {
            background-color: #f5f5f5;
            .close {
                visibility: inherit;
                cursor: pointer;
                color: #000;
            }
        }
    }
    .header-right {
        .user-name {
            margin-left: 10px;
        }
    }
    a {
        height: 100%;
        color: #333;
        font-size: 15px;
    }
}
</style>