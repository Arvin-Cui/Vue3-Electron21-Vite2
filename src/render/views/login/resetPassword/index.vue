<template>
   <div class="wraper-container reset-container">
     <div class="reset-header">
       <div class="reset-header_left">
        <span class="title">
          新闻信息终端
        </span>
         <span class="divider">

        </span>
         <span class="sub-title">
          重置密码
        </span>
       </div>
       <img :src="closeIcon" class="close-icon wraper-container-no-drag" @click="handleBackLogin"/>
     </div>
    <div class="wraper-container-no-drag">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="80px"
          class="demo-ruleForm"
      >
        <div class="code-box">

          <el-form-item prop="phone" style="margin-bottom: 24px;">
            <el-input style="width: 360px;height: 44px" placeholder="请输入注册手机号" clearable  v-model="ruleForm.phone"  autocomplete="off" >
              <template #prefix>
                <img :src="phoneIcon" class="phone-icon">
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="checkCode" style="margin-bottom: 26px">
            <div class="checkCode-box">
              <el-input style="width: 210px;height: 44px" placeholder="输入短信验证码" clearable  v-model="ruleForm.checkCode"  autocomplete="off" >
                <template #prefix>
                  <img :src="checkcodeIcon" class="checkCode-icon">
                </template>
              </el-input>
              <div class="getcode-btn">
                获取验证码
              </div>
            </div>
          </el-form-item>
        </div>
        <div class="divider-box">
          <div class="tip">请输入新的登录密码</div>
        </div>
        <div class="password-box">
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
        </div>
      </el-form>
      <div class="submit-btn" @click="submitForm(ruleFormRef)">
        登 录
      </div>
    </div>
   </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
// 引入本地图片方法
import {imgLocalUrl} from '@/render/utils/imgLocalUrl'
import {FormInstance} from "element-plus";

// 引入icon
const closeIcon=imgLocalUrl('@/assets/login/closeIcon.png')
const phoneIcon=imgLocalUrl('@/assets/login/phone.png')
const checkcodeIcon=imgLocalUrl('@/assets/login/yzm.png')

const ruleFormRef = ref<FormInstance>()
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
  pass: '',
  checkPass: '',
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
const rules = reactive({
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  checkCode: [{ validator: validateCheckcode, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur',required: true, }],
  checkPass: [{ validator: validatePass2, trigger: 'blur',required: true, }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      handleBackLogin()
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
const handleBackLogin=()=>{
    window.electronAPI.setBackLogin()
}
</script>

<style lang="scss" scoped>
.reset-container{
  width: 490px;
  height: 492px;
  background: #FFFFFF;
  box-shadow: 0px 4px 14px 0px rgba(0,0,0,0.3);
  border-radius: 6px 6px 6px 6px;
  //:deep(.el-form-item__error) {
  //  color: #FFFFFF;
  //}
  :deep(.el-form-item__content){
    margin-left: 0 !important;
  }
  :deep(.el-input){
    width: 334px;
    height: 36px;

  }
  :deep(.el-input__wrapper){
    border-radius: 0;
  }
    .reset-header{
      width: 100%;
      height: 66px;
      display: flex;
      align-items: center;
      padding-left: 24px;
      background: #F44311;
      position: relative;
    .reset-header_left{
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

  .code-box{
    padding: 20px 65px 30px;

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
  .divider-box{
    width: 100%;
    height: 1px;
    background: #DCDCDC;
    position: relative;
    margin-bottom: 30px;
    .tip{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      padding: 10px;
      background: #FFFFFF;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #6F6F79;
    }
  }
  .password-box{
    padding-left: 40px;
  }
  .submit-btn{
    margin: auto;
    cursor: pointer;
    text-align: center;
    width: 334px;
    height: 38px;
    background: #F44311;
    border-radius: 3px 3px 3px 3px;
    line-height: 38px;
    font-size: 16px;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    margin-top: 48px;
  }
  .submit-btn:hover{
    opacity: .8;
  }
}
</style>
