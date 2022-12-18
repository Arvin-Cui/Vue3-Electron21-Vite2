<template>
      <div class="breadcrumb-container">
        <div :class="[currenPath===item.path?'breadcrumb-item-active':'','breadcrumb-item']" v-for="(item,index) in breadCrumbList" :key="index">
          <el-tooltip
              class="box-item"
              effect="dark"
              :content="item.title"
              placement="top-start"
          >
            <p>{{item.title}}</p>
          </el-tooltip>
          <i-ep-Close class="icon" v-if="item.showClose"></i-ep-Close>
        </div>
      </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {useAppStore} from "@/render/store/modules/app";
// 引入icon
import {imgLocalUrl} from "@/render/utils/imgLocalUrl";

import {wacthRouter} from '@/render/hooks/watchRouter'
const {currenPath,menuList}=wacthRouter('breadcrumb')

const close=imgLocalUrl('@/assets/layout/close-bread.png')
const appStore = useAppStore()

const breadCrumbList=computed(()=>{
  return appStore.breadCrumbList
})
</script>

<style lang="scss" scoped>
.breadcrumb-container{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
    .breadcrumb-item{
      width: 106px;
      height: 32px;
      background: var(--breadcrumb-back-color);
      border-radius: 6px 6px 0px 0px;
      margin-right: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      p{
        text-align: center;
        width: 65px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: var(--breadcrumb-text-color);
      }
      .icon{
        font-size: 12px;
        color: var(--breadcrumb-text-color);
        margin-left: 4px;
      }
    }
  .breadcrumb-item-active{
    background: var(--breadcrumb-active-back-color);
    p{
      font-family: PingFang SC-Semibold, PingFang SC;
      color: var(--breadcrumb-active-text-color);
    }
    .icon{
      color: var(--breadcrumb-active-text-color);
    }
  }
  .breadcrumb-item:hover{
    opacity: .8;
  }
}
</style>