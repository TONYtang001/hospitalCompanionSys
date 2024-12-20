const storageInfo = JSON.parse(localStorage.getItem('pz_V3pz'))

// 优先渲染本地存储的信息

const state = storageInfo ? storageInfo.menu : {
    isCollapse: false,
    selectMenu: [],
    routerList: [],
    menuActive: '1-1'
}
// Vuex 中的 mutation 非常类似于事件(函数)
const mutations = {
    // 作用是对当前状态取反
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    addMenu(state, payload){
        // payload为传入的数据
        // 对数据去重
        // findIndex的参数是一个回调函数，这里直接使用一个箭头函数
        if (state.selectMenu.findIndex(item => item.path === payload.path) === -1) {
            state.selectMenu.push(payload)
        }
    },
    closeMenu(state, payload){
        const index = state.selectMenu.findIndex(val => val.name === payload.name)
        state.selectMenu.splice(index, 1)
    },
    // 不是很理解这一块代码（动态路由）
    dynamicMenu(state, payload){
        console.log(payload,'dynamicMenu');

        // 通过glob导入文件
        const modules = import.meta.glob('../views/**/**/*.vue')
        console.log(modules, 'modules');
        function routerSet(router) {
            router.forEach(route => {
                // 判断没有子菜单，拼接路由数据
                if (!route.children) {
                    const url = `../views${route.meta.path}/index.vue`
                    // 拿到获取的Vue组件
                    route.component = modules[url]
                } else {
                    routerSet(route.children)
                }
            })
        }
        routerSet(payload)
        // 拿到完整的路由数据
        state.routerList = payload

        
        
    },
    updateMenuActive(state, payload){
        state.menuActive = payload
    }

}

export default {
    state,
    mutations
}