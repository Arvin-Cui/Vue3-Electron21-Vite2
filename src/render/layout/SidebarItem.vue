<template>
  <div :class="['side-item-container',{'selected':isSelected}]"  @click="handleToPage">
    <div class="title">{{props.menuItem?props.menuItem.meta.title:""}}</div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect} from 'vue'
import {useRouter} from "vue-router";
const router=useRouter()
const props= defineProps({
  menuItem:Object
})
const isSelected=ref(false)
watchEffect(()=>{
  isSelected.value=router.currentRoute.value.path===props.menuItem?.path
})
onMounted(()=>{
})
const handleToPage=()=>{
  router.push({
    path:props.menuItem?.path
  })
}
</script>

<style lang="scss" scoped>
.side-item-container{
  width: 100%;
  height: 50px;
  display: flex;

  line-height: 50px;
  cursor: pointer;
  .title{
    width: 100%;
    text-align: center;
      color: #ffffff;
  }
}
.side-item-container:hover{
  opacity: .8;
}
.selected{
  background: #2d8cf0;
}
</style>
