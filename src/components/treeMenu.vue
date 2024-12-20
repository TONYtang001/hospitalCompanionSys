<!-- 动态子菜单组件 -->
<!-- <template>
    <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
    </el-menu-item>
</template> -->
<!-- 仔细学一下这一段的写法！！！！ -->
 <!-- 少写了一个<template>让我debug3小时 -->
<template>
  <template v-for="(item, index) in props.menuData">
      <el-menu-item
          @click="handleClick(item, `${props.index}-${item.meta.id}`)"
          v-if="!item.children || item.children.length == 0"
          :index="`${props.index}-${item.meta.id}`"
          :key="`${props.index}-${item.meta.id}`">
          <el-icon size="20">
              <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.name }}</span>
      </el-menu-item>
      <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
          <template #title>
              <el-icon size="20">
                  <component :is="item.meta.icon"></component>
              </el-icon>
              <span>{{ item.meta.name }}</span>
          </template>
          <tree-menu
          :index="`${props.index}-${item.meta.id}`"
          :menuData="item.children"
          />
      </el-sub-menu>
  </template>
</template>
<script setup>
// setup语法糖会自动默认导出template中的内容 , 所以不需要export default 
import {useRouter} from 'vue-router'
import { useStore } from 'vuex';
// 子组件接收父组件传入的数据
const props = defineProps(['menuData', 'index'])
console.log(props, 'props');

const router = useRouter()
const store = useStore()
const handleClick = (item, active) => {
  console.log(item, 'item')
  store.commit('addMenu', item.meta)
  store.commit('updateMenuActive', active)
  router.push(item.meta.path)

}

</script>

<style lang="less" scoped>  
</style>
