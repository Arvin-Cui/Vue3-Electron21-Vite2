<template>
<!--  <TopHeader />-->
  <div class="wraper-container-no-drag">
    <div class="layout-container">
      <Siderbar></Siderbar>
      <div class="layout-right">
        <div class="layout-navbar">
          <Navbar></Navbar>
        </div>
        <div :class="['layout-content',isCollapse?'layout-content-collapse':'']" >
          <AppMain />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import TopHeader from '@/render/layout/navBar/TopHeader.vue'
import Siderbar from "@/render/layout/sideBar/Sidebar.vue";
import Navbar from "@/render/layout/navBar/Navbar.vue";
import AppMain from '@/render/layout/AppMain.vue'
import {useAppStore} from '@/render/store/modules/app'
import {watchTheme} from  '@/render/hooks/watchTheme'
const appStore = useAppStore()
const isCollapse = computed(()=>{
  return appStore.isCollapse
})
watchTheme()
// if(window.electronAPI && window.electronAPI.ipcRenderer){
//   window.electronAPI?.ipcRenderer?.on('on-shortcut-event',(event:any,data:any)=>{
//     console.log(event,data)
//   })
// }

</script>

<style lang="scss" scoped>
.layout-container{
  display: flex;
  .layout-right:not(.layout-content-collapse){
    width: calc(100vw - #{$sideBarWidth});
  }
  .layout-right{
    width: calc(100vw - #{$sideBarExpandWidth});
  }
  .layout-content{
    //min-height: calc(100vh);
    background: #ffffff;
  }
}
</style>
