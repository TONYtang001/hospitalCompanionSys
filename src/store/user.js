const storageInfo = JSON.parse(localStorage.getItem('pz_V3pz'))

const state = storageInfo ? storageInfo.user : {
    // userName: storageInfo.user.userName,
    userName: 'admin',
}
// Vuex 中的 mutation 非常类似于事件(函数)
const mutations = {
    setUserName(state, newName) {
        state.userName = newName; // 更新用户名
    }

}

export default {
    state,
    mutations
}