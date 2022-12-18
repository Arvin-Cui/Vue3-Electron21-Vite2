<template>
    <div class="navigation-container">
      <Breadcrumb></Breadcrumb>
    </div>
</template>

<script lang="ts" setup>
import Breadcrumb from './Breadcrumb.vue'
</script>

<style lang="scss" scoped>
.navigation-container{
  width: 100%;
  height: 38px;
  padding-left: 20px;
  background: var(--navigation-back-color);
}
</style>