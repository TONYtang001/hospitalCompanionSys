<template>
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card style="max-width: 400px" class="login-box">
            <!-- 具名插槽的写法 -->
            <template #header>
                <div class="card-header">
                    <img :src="imgUrl" alt="">
                </div>
            </template>
            <div class="jump-link">
                <el-link type="primary" @click="handlechange">{{ formType ? '返回登录' : '注册账号' }}</el-link>
            </div>
            <el-form 
            ref="loginFormRef"
            :model="loginForm" 
            style="max-width: 600px" 
            class="demo-roleForm" 
            :rules="rules">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="手机号" prefix-icon="UserFilled"></el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input v-model="loginForm.passWord" type="password" placeholder="密码" prefix-icon="Lock"></el-input>
                </el-form-item>
                <el-form-item prop="validCode" v-if="formType">
                    <el-input v-model="loginForm.validCode" placeholder="验证码" prefix-icon="Lock">
                        <template #append>
                            <span class="hoverable" @click="countdownChange">{{ countdown.validText }}</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="submitForm(loginFormRef)">
                        {{ formType ? '注册账号' : '登录账号' }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-row>
</template>

<script setup>
// import { ElMessage } from 'element-plus';
// 这里不能再引入了，因为这个项目已经使用了element-plus的按需引入，在这里重复引入会导致样式不生效

// 引入发送验证码的接口
import { useRouter } from 'vue-router';
import { getCode, userAuthentication, login, menuPermissions } from '../../api';

import { ref, reactive, computed, toRaw } from 'vue';
import { Store, useStore } from 'vuex/dist/vuex.cjs.js';

const routerList = computed(() => store.state.menu.routerList)

const store = useStore()

// vite提供的把图片静态资源作为文件引入的方法
const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href

// 表单数据
const loginForm = reactive({
    userName: '',
    passWord: '',
    validCode: ''
})
// 表单状态标记（0登录 1注册）
const formType = ref(0)

const handlechange = () => {
    formType.value = formType.value ? 0 : 1
}

// 发送验证码
const countdown = reactive({
    validText: '获取验证码',
    time: 60
})

let flag = false
const countdownChange = () => {
    if(flag) return
    const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
    if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
        return ElMessage({
            message: '请检查手机号是否正确',
            type: 'warning',
        })
    }

    // 倒计时
    countdown.time = 60; // 重置倒计时
    flag = true; // 设置标记为真
    const timer = setInterval(() => {
        if(countdown.time <= 0){
            clearInterval(timer); // 清除定时器
            countdown.validText = '获取验证码'
            flag = false
        } else {
            countdown.time -= 1
            countdown.validText = `剩余${countdown.time}s`
        }
    }, 1000)

    getCode({tel: loginForm.userName})
    .then(({data})=>{
        // console.log(data, 'data');
        // console.log(data.code, 'data.code');
        if(data.code === 10000){
            ElMessage.success('发送成功！')
        }
    })
}

// 账号校验
const validateUser = (rule, value, callback) => {
    // 判断非空
    if(value === ''){
        callback(new Error('账号不能为空'))
    }else {
        const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        phoneReg.test(value) ? callback() : callback(new Error('账号格式错误，请输入正确手机号'))
    }
}

// 密码校验
const validatePass = (rule, value, callback) => {
    // 判断非空
    if(value === ''){
        callback(new Error('密码不能为空'))
    }else {
        const passReg = /^[a-zA-Z0-9_-]{4,16}$/
        passReg.test(value) ? callback() : callback(new Error('密码格式错误！请输入4到16位字符'))
    }
}

// 表单校验
const rules = reactive({
    userName: [{ validator: validateUser, trigger: 'blur'}],
    passWord: [{ validator: validatePass, trigger: 'blur'}],
})

const loginFormRef = ref()

const router = useRouter()

// 提交表单
// async表示异步处理
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log(loginForm, 'submit!')
            // 注册页面
            if (formType.value){
                userAuthentication(loginForm)
                .then(({data})=>{
                    console.log(data, 'regesterdata');
                    // console.log(data.code, 'data.code');
                    if(data.code === 10000){
                        ElMessage.success('注册成功！')
                        // 切换状态自动跳回登录界面
                        formType.value = 0
                    }
                })
            }else {
                // 登录界面
                // 这里login这个api并不需要loginForm里的validCode这个参数，但是直接传入完整的loginForm也不会报错，这应该是JS的特性吧
                login(loginForm)
                .then(({data})=>{
                    // console.log(data.code, 'data.code');
                    if(data.code === 10000){
                        ElMessage.success('登录成功！')
                        console.log(data, 'logindata');
                        // 把token和用户信息缓存到浏览器本地存储
                        localStorage.setItem('pz_token',data.data.token)
                        localStorage.setItem('pz_userInfo',JSON.stringify(data.data.userInfo))
                        menuPermissions()
                        .then(({data}) => {
                            console.log(data, 'menuPermissions');
                            store.commit('dynamicMenu', data.data)
                            console.log(routerList, 'routerList');
                            toRaw(routerList.value).forEach(item => {
                                router.addRoute('main', item)
                            })
                            router.push('/')
                        })
                        
                    }
                })
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

</script>

<style lang="less" scoped>
:deep(.el-card__header) {
    padding: 0
  }
  .login-container {
    height: 100%;
    // 这里背景图的路径这样写是由原因的：Files in the public directory are served at the root path.
    // Instead of /public/background.gif, use /background.gif.
    background-image: url('/background.gif'); /* 添加背景图 */
    background-size: cover; /* 背景图覆盖整个容器 */
    background-position: center; /* 背景图居中 */
    .card-header{
      background-color: #899fe1;
      img {
        width: 430px;
      }
    }
    .jump-link {
      text-align: right;
      margin-bottom: 10px;
    }
    .login-box {
        background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
        border-radius: 10px; /* 圆角 */
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* 添加阴影 */
        padding: 20px; /* 内边距 */
    }
    .hoverable {
        cursor: pointer; // 鼠标悬停时显示为手型
        &:hover {
            color: #409eff; // 悬停时改变颜色
            text-decoration: underline; // 悬停时添加下划线
        }
    }
  }
</style>