<template>
 <div class="header-container">
   <div class="logo-box"></div>
   <div class="action-box wraper-container">
     <i-ep-SemiSelect class="mini-icon" @click="handleChangeScreen('miniScreen')"></i-ep-SemiSelect>
     <i-ep-FullScreen class="mini-icon" @click="handleChangeScreen('fullScreen')"></i-ep-FullScreen>
     <i-ep-CloseBold class="mini-icon" @click="handleChangeScreen('closeScreen')"></i-ep-CloseBold>
   </div>
 </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const handleChangeScreen=(value:string)=>{
    window.electronAPI.setScreen(value)
}
</script>

<style lang="scss" scoped>
.header-container{
  width: 100%;
  height: 40px;
  background: var(--top-header-back-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  .logo-box{
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 50%;
  }
  .action-box{
    .mini-icon{
      color: #ffffff;
      font-size: 14px;
      margin-right: 15px;
      cursor: pointer;
    }
    .mini-icon:hover{
      opacity: .5;
    }
  }

}
</style>
