<template>
   <div class="wraper-container register-container">
    <div class="register-header">
      <div class="register-header_left">
        <span class="title">
          新闻信息终端
        </span>
        <span class="divider">

        </span>
        <span class="sub-title">
          新用户注册申请
        </span>
      </div>
      <img :src="closeIcon" class="close-icon wraper-container-no-drag"  @click="handleBackLogin()"/>
    </div>
     <div class="register-main wraper-container-no-drag">
       <el-form
           ref="ruleFormRef"
           :model="ruleForm"
           :rules="rules"
           label-width="80px"
           class="demo-ruleForm"
           :size="formSize"
           status-icon
       >
         <el-form-item label="手机号码" prop="phone">
           <el-input-number :controls="false" v-model="ruleForm.phone" />
         </el-form-item>
         <el-form-item label="用户名" prop="user">
           <el-input v-model="ruleForm.user" />
         </el-form-item>
         <el-form-item label="登录密码" prop="pass">
           <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
         </el-form-item>
         <el-form-item label="确认密码" prop="checkPass">
           <el-input
               v-model="ruleForm.checkPass"
               type="password"
               autocomplete="off"
           />
         </el-form-item>
         <el-form-item label="注册来源" prop="source">
           <el-select v-model="ruleForm.source" placeholder="Activity zone">
             <el-option label="Zone one" value="shanghai" />
             <el-option label="Zone two" value="beijing" />
           </el-select>
         </el-form-item>
         <el-form-item label="邀请码" prop="invatationCode">
           <el-input-number :controls="false" v-model="ruleForm.invatationCode" />
         </el-form-item>
         <el-form-item label="申请原因" prop="applactionReason">
           <el-input v-model="ruleForm.applactionReason" type="textarea" />
         </el-form-item>
         <el-form-item label="验证码" prop="checkCode">
           <div class="checkCode-box">
             <el-input style="width: 186px"   v-model="ruleForm.checkCode"  autocomplete="off" />
             <div class="getcode-btn">
               获取验证码
             </div>
           </div>
         </el-form-item>
       </el-form>
       <p class="back-login" @click="handleBackLogin()">
         返回登录界面
       </p>
       <div class="submit-btn" @click="submitForm(ruleFormRef)">
         注册申请
       </div>
     </div>

     <el-dialog v-model="visible" :show-close="false" style="width: 446px;">
       <template #header>
         <div class="register-success-header">
           <div class="register-header_left">
        <span class="title">
          新闻信息终端
        </span>
             <span class="divider">

        </span>
             <span class="sub-title">
          新用户注册申请
        </span>
           </div>
           <img :src="closeIcon" class="close-icon" @click="handleCloseModal"/>
         </div>
       </template>
         <div class="register-success-content">
            <div class="icon-box">
              <img :src="messageIcon" />
            </div>
            <p>已完成注册申请! </p>
            <p>后续请关注注册手机短信，通知审核结果</p>
           <div class="btn">
             返回登录界面
           </div>
         </div>
     </el-dialog>
   </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
// 引入本地图片方法
import {imgLocalUrl} from '@/render/utils/imgLocalUrl'

// 引入关闭icon
const closeIcon=imgLocalUrl('@/assets/login/closeIcon.png')
const messageIcon=imgLocalUrl('@/assets/login/message-icon.png')
const visible=ref<Boolean>(false)
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  phone: null,
  user:'',
  pass: '',
  checkPass: '',
  source: '',
  invatationCode:null,
  applactionReason:'',
})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入登录密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入登录密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("请输入登录密码 请输入一致密码!"))
  } else {
    callback()
  }
}
const checkPhone=(rule: any, value: any, callback: any)=> {
  if (!value) {
    callback(new Error('请输入手机号码'))
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
const rules = reactive<FormRules>({
  phone: [
    {validator: checkPhone, required: true,trigger: 'blur' },
  ],
  user: [
    { required: true, message: '请输入注册用户名', trigger: 'blur' },
    { min: 0, max: 15, message: '长度最大15个字符', trigger: 'blur' },
  ],
  pass: [{ validator: validatePass, trigger: 'blur',required: true, }],
  checkPass: [{ validator: validatePass2, trigger: 'blur',required: true, }],
  source: [
    {
      required: true,
      message: '请选择注册来源',
      trigger: 'change',
    },
  ],
  invatationCode: [
    {validator: checkPhone, required: true, message: '请输入邀请人的手机号码', trigger: 'blur' },
  ],
  applactionReason:[
    { required: true, message: '请填写注册申请的原因，例如从何处得知本应用，主要使用目的等', trigger: 'blur' },
    { min: 0, max: 15, message: '长度最大15个字符', trigger: 'blur' },
  ],
  checkCode:[
    { required: true, message: '请输入手机验证码', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      visible.value=true
      console.log('submit!')
    } else {
      visible.value=true
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const handleCloseModal=()=>{
  visible.value=false
}

// 返回登录页
const handleBackLogin=()=>{
  window.electronAPI.setRegister()
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header){
  padding: 0;
  margin-right: 0;
}
:deep(.el-dialog__body){
  padding: 0;
}
:deep(.el-overlay-dialog){
  position: absolute;
  left: 5%;
  bottom: unset;
  right: unset;
}
.register-container{
  width: 600px;
  height: 740px;
  background: #FFFFFF;
  position: relative;
  box-shadow: 0px 4px 14px 0px rgba(0,0,0,0.3);
  border-radius: 6px 6px 6px 6px;
  .register-header{
    width: 100%;
    height: 66px;
    display: flex;
    align-items: center;
    padding-left: 24px;
    background: #F44311;
    position: relative;
    .register-header_left{
      display: flex;
      align-items: center;
      .title{
         font-size: 24px;
         font-family: PingFang SC-Semibold, PingFang SC;
         font-weight: 600;
         color: #FFFFFF;
       }
      .divider{
        display: block;
        width: 1px;
        height: 26px;
        background:  rgba(255,255,255,0.5);
        margin: 0 16px;
      }
      .sub-title{
        font-size: 18px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255,255,255,0.9);
      }
    }
    .close-icon{
      position: absolute;
      right: 14px;
      top: 14px;
      width: 20px;
      height: 20px;
      cursor:pointer;
    }
    .close-icon:hover{
      opacity: .8;
    }
  }
  .register-main{
    padding-top: 20px;
    padding-left:95px;
    :deep(.el-form-item__error) {
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
    }
    :deep(.el-form-item__content){
      margin-left: 0 !important;
    }
    :deep(.el-input){
      width: 334px;
      height: 36px;
    }
    :deep(.el-input-number){
      width: 334px;
      height: 36px;
      line-height: 36px;
    }
    :deep(.el-textarea){
      width: 334px;
    }
    :deep(.el-input__wrapper){
      border-radius: 0;
    }
    :deep(.el-form-item){
      margin-bottom: 25px;
    }
    .checkCode-box{
      display: flex;
      align-items: center;
      .getcode-btn{
        width: 136px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: linear-gradient(180deg, #FFDE00 0%, #FEAB1A 100%);
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #E21D26;
        cursor: pointer;
        margin-left: 12px;
      }
      .getcode-btn_gray{
        background: #999999;
        color: #FFFFFF;
      }
      .getcode-btn:hover{
        opacity: .8;
      }

    }
    .back-login{
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #1F65EE;
      line-height: 16px;
      margin-top: 20px;
      margin-bottom: 15px;
      margin-left: 30px;
      cursor: pointer;
    }
    .back-login:hover{
      opacity: .8;
    }
  }
  .submit-btn{
    width: 334px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    margin:0 auto;
    background: #F44311;
    border-radius: 3px 3px 3px 3px;
    font-size: 16px;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    cursor: pointer;
  }
  .submit-btn:hover{
    opacity: .8;
  }
  .header-box{
    display: flex;
    align-items: center;
    background: #F44311;
    .title{
      font-size: 24px;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
    }
    .divider{
      display: block;
      width: 1px;
      height: 26px;
      background:  rgba(255,255,255,0.5);
      margin: 0 16px;
    }
    .sub-title{
      font-size: 18px;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255,255,255,0.9);
    }
  }
  .register-success-header{
    width: 100%;
    height: 66px;
    display: flex;
    align-items: center;
    padding-left: 24px;
    background: #F44311;
    position: relative;
    .register-header_left{
      display: flex;
      align-items: center;
      .title{
        font-size: 24px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
      }
      .divider{
        display: block;
        width: 1px;
        height: 26px;
        background:  rgba(255,255,255,0.5);
        margin: 0 16px;
      }
      .sub-title{
        font-size: 18px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255,255,255,0.9);
      }
    }
    .close-icon{
      position: absolute;
      right: 14px;
      top: 14px;
      width: 20px;
      height: 20px;
      cursor:pointer;
    }
    .close-icon:hover{
      opacity: .8;
    }
  }
  .register-success-content{
    padding-top: 24px;
    padding-bottom: 40px;
    .icon-box{
      width: 40px;
      height: 40px;
      margin: 0px auto 16px;
      img{
        width: 40px;
        height: 40px;
      }
    }
    p:nth-of-type(1){
      text-align: center;
      font-size: 18px;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #282D30;
      margin-bottom: 14px;
    }
    p:nth-of-type(2){
      text-align: center;
      font-size: 13px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 600;
      color: #4A4E50;
      margin-bottom: 20px;
    }
    .btn{
      width: 199px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      background: #F44311;
      border-radius: 3px 3px 3px 3px;
      margin: auto;
      font-size: 16px;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      cursor: pointer;
    }
    .btn:hover{
      opacity: .8;
    }

  }
}
</style>
