//  Start of Selection
import { createStore } from 'vuex';
import menu from './menu'
import user from './user'
import createPersistedstate from 'vuex-persistedstate'

const store = createStore({
  // 这是Vuex的一个插件，用于实现store的持久化存储，本质上是把store的内容存储到localstorage里面
  plugins: [new createPersistedstate({
    key: 'pz_V3pz'
  })],
  modules: {
    menu,
    user
  }
});

export default store;