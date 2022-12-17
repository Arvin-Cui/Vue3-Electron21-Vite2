<template>
  <TopHeader />
  <div class="wraper-container">

    <div class="layout-container">
      <Siderbar></Siderbar>
      <div class="layout-right">
        <Navbar></Navbar>
        <div class="layout-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TopHeader from '@/render/layout/TopHeader.vue'
import Siderbar from "@/render/layout/Sidebar.vue";
import Navbar from "@/render/layout/Navbar.vue";
// if(window.electronAPI && window.electronAPI.ipcRenderer){
//   window.electronAPI?.ipcRenderer?.on('on-shortcut-event',(event:any,data:any)=>{
//     console.log(event,data)
//   })
// }

</script>

<style lang="scss" scoped>
.layout-container{
  display: flex;
  .layout-right{
    width: calc(100vw - 200px);
  }
  .layout-content{
    min-height: calc(100vh - 90px);
    background: #ffffff;
  }
}
</style>
