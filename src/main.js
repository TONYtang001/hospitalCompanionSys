import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import panelHead from './components/panelHead.vue'


// 刷新后的动态路由添加(因为浏览器每次刷新都会重新生成一个APP实例，store是挂载在APP实例上的，所以也会随之初始化，先前的数据就没了，所以使用Vuex的vuex-persistedstate插件来实现持久化存储)
const storageInfo = JSON.parse(localStorage.getItem('pz_V3pz'))
if (storageInfo) {
  store.commit('dynamicMenu', storageInfo.menu.routerList)
  store.state.menu.routerList.forEach(item => {
    router.addRoute('main', item)
  });
}







// 添加路由守卫（防止用户直接在网址处修改路由然后到处乱跳）
router.beforeEach((to, from) => {
  const token = localStorage.getItem('pz_token')
  // 若非登录界面token不存在
  if (!token && to.path !== '/login'){
    return '/login'
  } else if(token && to.path === '/login'){
    return '/'
  } else {
    return true
  }
})


// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 全局注入公共组件
app.component('panelhead', panelHead)

app.use(router)
app.use(store)
app.mount('#app')
// createApp(App).mount('#app')
