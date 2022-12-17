<template>
  <div class="login-container wraper-container">
    <div class="theme-select">
      {{showDark?'暗黑模式':'明亮模式'}}
      <el-switch
          v-model="showDark"
          @change="handleChange"
      />
    </div>
   <div class="content wraper-center">
     <h1>{{ count }}</h1>
     <el-button type="primary" @click="handleToLogin">登录</el-button>
   </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useCache} from '@/render/hooks/useCache'
const {wsCache}=useCache('localStorage')
const count = ref('登录界面')
const showDark=ref(false)
const handleToLogin=()=>{
  wsCache.set('login',true,{exp : 100})
  window.electronAPI.setLogin('登陆成功')
}
const handleChange=(e:boolean)=>{
  if(e){
    document.body.className = 'dark';
    // document.documentElement.style.setProperty('--dark-bg-color','red')
  }else{
    document.body.className = '';
    // document.documentElement.style.setProperty('--dark-bg-color','red')
  }
}
</script>

<style lang="scss" scoped>
.login-container{
  width: 100vw;
  height: 100vh;
  background: var(--login-bg-color);
  .content{
    width: 500px;
    height: 500px;
  }
  .theme-select{
    position: fixed;
    right: 100px;
    top: 20px;
  }
}
</style>
