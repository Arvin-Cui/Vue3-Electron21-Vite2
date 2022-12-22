<template>
      <div class="login-password-container">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
        >
          <el-form-item prop="userName" style="margin-bottom: 24px">
            <el-input placeholder="请输入注册手机号/用户名" clearable  v-model="ruleForm.userName"  autocomplete="off" >
              <template #prefix>
                <img :src="usernameIcon" class="username-icon">
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass" style="margin-bottom: 26px">
            <el-input placeholder="请输入密码" clearable  v-model="ruleForm.pass" type="password" autocomplete="off" >
              <template #prefix>
                <img :src="passwordIcon" class="password-icon">
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="login-pre-action">
          <div class="login-pre-action_left">
            <div class="action-box" @click="handleSetLogin('autoLogin')">
              <img :src="autoLogin?selecttrue:selectfalse">
              <span>自动登录</span>
            </div>
            <div class="action-box"  @click="handleSetLogin('rememberPassword')">
              <img :src="rememberPassword?selecttrue:selectfalse">
              <span>记住密码</span>
            </div>
          </div>
          <div class="login-pre-action_right" @click="handleOpenReset">
              <span>重置密码</span>
          </div>
        </div>
        <div class="submit-btn" @click="submitForm(ruleFormRef)">
          登 录
        </div>
      </div>
</template>

<script lang="ts" setup>
import {computed, reactive, ref} from 'vue'
import type { FormInstance } from 'element-plus'
// 引入本地图片方法
import {imgLocalUrl} from '@/render/utils/imgLocalUrl'
// 引入store
import {useLoginStore} from '@/render/store/modules/login'
import {useCache} from '@/render/hooks/useCache'
const {wsCache}=useCache('localStorage')
// 引入icon
const usernameIcon=imgLocalUrl('@/assets/login/username.png')
const passwordIcon=imgLocalUrl('@/assets/login/password.png')
const selecttrue=imgLocalUrl('@/assets/login/selecttrue.png')
const selectfalse=imgLocalUrl('@/assets/login/selectfalse.png')

// 使用store
const loginStore = useLoginStore()
// 引入store登陆设置
const autoLogin=computed(()=>{
  return loginStore.loginSetting.autoLogin
})
const rememberPassword=computed(()=>{
  return loginStore.loginSetting.rememberPassword
})

const ruleFormRef = ref<FormInstance>()
// 设置记住密码、自动登录等
const handleSetLogin=(e:String)=>{
  loginStore.setLoginSetting(e)
}
// 表单提交
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
const validateUserName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入注册手机号/用户名'))
  } else if (value.length>15) {
    callback(new Error("超出最大15个字符长度"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  userName:'',
  pass: '',
})

const rules = reactive({
  userName: [{ validator: validateUserName, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      handleToLogin()
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const handleToLogin=()=>{
  wsCache.set('login',true,{exp : 100})
  window.electronAPI.setLogin('登陆成功')
}
// 打开重置密码
const handleOpenReset=()=>{
  window.electronAPI.openRestPassword()
}
</script>

<style lang="scss" scoped>
.login-password-container{
  :deep(.el-form-item__error) {
    color: #FFFFFF;
  }
  :deep(.el-form-item__content){
    margin-left: 0 !important;
  }
  :deep(.el-input){
    width: 360px;
    height: 44px;

  }
  :deep(.el-input__wrapper){
    border-radius: 0;
  }
  .username-icon{
    width: 20px;
    height: 20px;
    display: inline-block;
  }
  .password-icon{
    width: 20px;
    height: 20px;
    display: inline-block;
  }
  .submit-btn{
    cursor: pointer;
    text-align: center;
    width: 360px;
    height: 44px;
    line-height: 44px;
    background: linear-gradient(180deg, #FFDE00 0%, #FEAB1A 100%);
    box-shadow: 2px 3px 6px 0px #EA2437;
    font-size: 20px;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: #E21D26;
  }
  .submit-btn:hover{
    opacity: .8;
  }
  .login-pre-action{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    .login-pre-action_left{
      display: flex;
      align-items: center;
    .action-box{
      display: flex;
      align-items: center;
      margin-right: 28px;
      cursor: pointer;
      img{
        width: 16px;
        height: 16px;
        display: block;
        margin-right: 8px;
      }
      span{
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
    }
    .login-pre-action_right{
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      cursor: pointer;
    }
    .login-pre-action_right:hover{
      opacity: .8;
    }
  }
}
</style>