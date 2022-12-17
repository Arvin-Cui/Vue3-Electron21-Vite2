<template>
  <div class="sideBar-container">
    <div v-for="(item,index) in menuList" :key="index" >
      <sidebar-item  v-for="(it,ind) in item.children" :key="ind" :menuItem="it"></sidebar-item>
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {constantRouterMap} from '@/render/router/index'
import SidebarItem from "@/render/layout/SidebarItem.vue";
let menuList = ref<any>([])
onMounted(()=>{
  menuList.value=constantRouterMap.filter((item=>{
    return !(item as any).hidden
  }))
})
</script>

<style lang="scss" scoped>
.sideBar-container{
  width: 200px;
  height: calc(100vh - 40px);
  background: #293146;
}
</style>
