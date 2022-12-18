<template>
  <div class="app-loading">
    <div class="app-loading-wrap">
      <div class="app-loading-title">
<!--        <img src="/logo.png" class="app-loading-logo" alt="Logo" />-->
        <div class="app-loading-title">加载页面</div>
      </div>
      <div class="app-loading-item">
        <div class="app-loading-outter"></div>
        <div class="app-loading-inner"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useCache} from '@/render/hooks/useCache'
const {wsCache}=useCache('localStorage')

onMounted(()=>{
  if(!wsCache.get('login')){
    window.electronAPI.isShowLogin(true)
  }else{
    window.electronAPI.isShowLogin(false)
  }
})
const count = ref('加载页面')
</script>

<style lang="scss" scoped>
.app-loading {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #f0f2f5;
  //background: #b6ccee;
}

.app-loading .app-loading-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.app-loading .app-loading-title {
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.app-loading .app-loading-logo {
  width: 100px;
  margin: 0 auto 15px auto;
}

.app-loading .app-loading-item {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 60px;
  vertical-align: middle;
  border-radius: 50%;
}

.app-loading .app-loading-outter {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid #2d8cf0;
  border-bottom: 0;
  border-left-color: transparent;
  border-radius: 50%;
  animation: loader-outter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
}

.app-loading .app-loading-inner {
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  width: 40px;
  height: 40px;
  border: 4px solid #87bdff;
  border-right: 0;
  border-top-color: transparent;
  border-radius: 50%;
  animation: loader-inner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
}

@-webkit-keyframes loader-outter {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loader-outter {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader-inner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

@keyframes loader-inner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
</style>
