<template>
<div class="sidebar-container">
  <el-scrollbar>
    <Logo />
    <el-menu
        :default-active="currenPath"
        class="el-menu-vertical"
        :collapse="isCollapse"
        :collapse-transition="false"
        @open="handleOpen"
        @close="handleClose"
        v-if="menuList.length"
    >
      <SideBarItem v-for="(item,index) in menuList" :menuItem="item" :key="index" :index="item.path"/>
    </el-menu>
  </el-scrollbar>
  <Tip />
</div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref, watchEffect} from 'vue'
import {useRouter} from "vue-router";
const router=useRouter()
import Logo from './Logo.vue'
import SideBarItem from  './SidebarItem.vue'
import Tip from './Tip.vue'

import {useAppStore} from '@/render/store/modules/app'

import {wacthRouter} from '@/render/hooks/watchRouter'
const {currenPath,menuList}=wacthRouter('menu')

const appStore = useAppStore()
const isCollapse = computed(()=>{
  return appStore.isCollapse
})

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.sidebar-container{
  background: var(--menu-bg-color);
  height: 100vh;
  position: relative;
  border-right: 1px solid #383E47;
}
.el-menu-vertical{
  min-height: calc(100vh - #{$sideBarLogoHeight});
  background: var(--menu-bg-color);
}
.el-menu-vertical:not(.el-menu--collapse) {
  min-height: calc(100vh - #{$sideBarLogoExpandHeight});
  width: $sideBarExpandWidth;
  background: var(--menu-bg-color);
}
</style>