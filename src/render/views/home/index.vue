<template>
   <div class="">
    {{count}}
     <el-button type="primary" @click="handleChange">操作</el-button>
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useCache} from '@/render/hooks/useCache'
import TopHeader from "@/render/layout/navBar/TopHeader.vue"
import {useAppStore} from '@/render/store/modules/app'
import {useOpenByBrowser} from '@/render/hooks/useOpenByBrowser'
import {loginApi} from "@/render/api/login";
import {ipcRenderer} from "electron";

const {wsCache}=useCache('localStorage')


const count = ref('欢迎您')
const handleGetCache=()=>{
 const res=wsCache.get('login')
  console.log(res)
}


const appStore = useAppStore()
const {openByBrowser}=useOpenByBrowser()

const handleChange=async ()=>{
  const params={}
  const res=await loginApi(params)
  // console.log(import.meta.env)
  // appStore.increment()
  //  wsCache.set('test','111')
  // const res= wsCache.get('test')
  //  console.log(res)
  //  const url='https://m.up678.com/'
  //  openByBrowser(url)
  // window.open('https://m.up678.com/','_blank')
  // console.log(window.electronAPI)
  // window.electronAPI.setTitle('1111')
  // document.body.className = 'dark';
  // document.documentElement.style.setProperty('--dark-bg-color','red')
}

</script>

<style scoped>

</style>
