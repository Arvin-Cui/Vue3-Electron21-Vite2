<template>
  <div class="app-main-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AppMain"
}
</script>

<style lang="scss" scoped>
.app-main-container{
    width: 100%;
  height: calc(100vh - #{$topHeaderHeight} - #{$navigationHeight});
  background: #F5F6F7;
}
</style>