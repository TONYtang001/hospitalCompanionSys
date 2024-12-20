<template>
    <el-menu
        :style="{ width: !isCollapse ? '230px' : '64px', transition: 'width 0.3s ease' }"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :default-active="active"
      >
        <p class="logo-Ig">{{ isCollapse ? 'DIDI' : 'DIDI陪诊' }}</p>
        <!-- 使用TreeMenu组件,并用v-bind传入menudata数据 -->
        <TreeMenu :index="1" :menuData="menuData" />
      </el-menu>
</template>

<script setup>
    import TreeMenu from './treeMenu.vue';
    import { useRouter } from 'vue-router';
    import { reactive, computed } from 'vue';
    import { useStore } from 'vuex'

    const store = useStore()
    const isCollapse = computed(() => store.state.menu.isCollapse)
    const router = useRouter();
    // console.log(router, 'router');
    // 获取路由配置,创建响应式数据(这是路由数据写死的版本)
    // const menuData = reactive(router.options.routes[0].children)
    // 动态路由版本的menuData
    const menuData = computed(() => store.state.menu.routerList)

    // console.log(menuData, 'menuData')

    const active = computed(() => store.state.menu.menuActive)
    

    const handleOpen = (key, keyPath) => {
        console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
        console.log(key, keyPath);
    };
</script>

<style lang="less" scoped>
.aside-container {
    height: 100%;
    // width: 200px;
    .logo-Ig {
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
    }
}
</style>

