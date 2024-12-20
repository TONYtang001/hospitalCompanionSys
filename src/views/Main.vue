<template>
    <div class="common-layout">
        <el-container>
        <!-- <el-aside width="200px">Aside</el-aside> -->
        <Aside />
        <el-container>
            <!-- <el-header>Header</el-header> -->
             <!-- 这里到底应不应该保留<el-aside>和<el-header>标签？？？？ -->
            <el-header><Header /></el-header>
             
            <el-main>
                <!-- 路由出口 -->
                <router-view/>
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Aside from '../components/aside.vue'
import Header from '../components/navHeader.vue'
</script>


<!-- less嵌套语法 -->
<style lang="less" scoped>
.common-layout {
    height: 100%;
    .el-container {
        height: 100%;
    }
}
</style>
