import request from '../utils/requset'

// 发送验证码post
export const getCode = (data) => {
    return request.post('/get/code', data)
}

// 注册用户（验证码校验）post
export const userAuthentication = (data) => {
    return request.post('/user/authentication', data)
}

// 登录post
export const login = (data) => {
    return request.post('/login', data)
}

// 账号管理列表get
export const authAdmin = (params) => {
    return request.get('/auth/admin', {params})
}
// export const authAdmin = () => {
//     return request.get('/auth/admin?pageNum=1&pageSize=10')
// }

// 菜单权限数据
export const userGetMenu = () => {
    return request.get('/user/getmenu')
}


// 菜单权限数据
export const userSetMenu = (data) => {
    return request.post('/user/setmenu', data)
}


// 菜单权限列表
export const menuList = (params) => {
    return request.get('/menu/list', {params})
}

// 权限下拉列表
export const menuSelectList = () => {
    return request.get('/menu/selectlist')
}

// 用户信息修改
export const updateUser = (data) => {
    return request.post('/update/user', data)
}

// 登录后获取用户权限菜单
export const menuPermissions = () => {
    return request.get('/menu/permissions')
}

// 获取陪护师头像
export const photoList = () => {
    return request.get('/photo/list')
}

// 陪护师创建
export const companion = (data) => {
    return request.post('/companion', data)
}

// 获取陪护师列表
export const companionList = (params) => {
    return request.get('/companion/list', {params})
}

// 陪护师删除
export const deleteCompanion = (data) => {
    return request.post('/delete/companion', data)
}

// 获取订单列表
export const adminOrder = (params) => {
    return request.get('/admin/order', {params})
}

// 服务状态完成
export const updateOrder = (data) => {
    return request.post('/update/order', data)
}

// 首页数据表盘信息
export const report = () => {
    return request.get('/report')
}