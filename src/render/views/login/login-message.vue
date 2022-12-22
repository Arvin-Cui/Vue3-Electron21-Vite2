<template>
  <div class="login-message-container">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item prop="phone" style="margin-bottom: 24px">
        <el-input placeholder="请输入注册手机号" clearable  v-model="ruleForm.phone"  autocomplete="off" >
          <template #prefix>
            <img :src="phoneIcon" class="phone-icon">
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkCode" style="margin-bottom: 26px">
        <div class="checkCode-box">
          <el-input style="width: 210px" placeholder="输入短信验证码" clearable  v-model="ruleForm.checkCode"  autocomplete="off" >
            <template #prefix>
              <img :src="checkcodeIcon" class="checkCode-icon">
            </template>
          </el-input>
          <div class="getcode-btn">
            获取验证码
          </div>
        </div>
      </el-form-item>
    </el-form>

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
const phoneIcon=imgLocalUrl('@/assets/login/phone.png')
const checkcodeIcon=imgLocalUrl('@/assets/login/yzm.png')
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
const validateCheckcode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入短信验证码'))
  } else {
    callback()
  }
}
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入注册手机号'))
  } else {
    const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/; //手机号正则表达式
    //const reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/; //座机号正则表达式
    //const reg =/^([1-9]{1})(\d{14}|\d{18})$/; //通用银行账号正则表达式
    //const reg = /^[1-9][0-9]{5}$/; //邮编正则表达式
    //const reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;//传真正则表达式
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}

const ruleForm = reactive({
  phone:'',
  checkCode: '',
})

const rules = reactive({
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  checkCode: [{ validator: validateCheckcode, trigger: 'blur' }],
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
</script>

<style lang="scss" scoped>
.login-message-container{
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
  .phone-icon{
    width: 20px;
    height: 20px;
    display: inline-block;
  }
  .checkCode-icon{
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
    margin-top: 48px;
  }
  .submit-btn:hover{
    opacity: .8;
  }
  .checkCode-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .getcode-btn{
      width: 140px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      background: linear-gradient(180deg, #FFDE00 0%, #FEAB1A 100%);
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #E21D26;
      cursor: pointer;
    }
    .getcode-btn:hover{
      opacity: .8;
    }
  }
}
</style>