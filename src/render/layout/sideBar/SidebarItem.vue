<template>
  <div class="sidebaritem-container">
    <el-menu-item :index="index" v-if="hasChildNumber()" @click="handleToPage">
      <img class="icon-img" :src="menuItem.children?menuItem.children[0].meta.icon:menuItem.meta.icon"/>
      <template #title>{{menuItem.children?menuItem.children[0].meta.title:menuItem.meta.title}}</template>
    </el-menu-item>
    <el-sub-menu :index="index" v-else>
      <template #title>
        <img class="icon-img" :src="menuItem.meta.icon"/>
        <span>{{menuItem.meta.title}}</span>
      </template>
      <SidebarItem v-for="(item,index) in menuItem.children" :menu-item="item" :index="item.path"/>
    </el-sub-menu>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect} from 'vue'
import {useRouter} from "vue-router";
import {useAppStore} from "@/render/store/modules/app";
const appStore = useAppStore()
const router=useRouter()
const props= defineProps({
  menuItem:Object,
  index:String
})
const hasChildNumber=()=>{
  if(!props.menuItem?.children || props.menuItem?.children?.length===1){
    return true
  }else{
    return false
  }
}
const handleToPage=()=>{
  router.push({
    path:props.menuItem?.path
  })
  const index=appStore.breadCrumbList.findIndex(item=>{
    return item.path===props.menuItem?.path
  })
  if(index===-1){
    const data={
      title:props.menuItem?.children[0].meta.title,
      path:props.menuItem?.path,
      showClose:false,
      type:'route'
    }
    appStore.setBreadCrumbList(data,'route')
  }
}
</script>

<style lang="scss" scoped>
.sidebaritem-container{
  .icon-img{
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 14px;
  }
}
</style>
