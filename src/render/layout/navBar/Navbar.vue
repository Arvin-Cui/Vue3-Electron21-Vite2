<template>
  <div class="navbar-container">
    <TopHeader />
    <Navigation />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TopHeader from './TopHeader.vue'
import Navigation from './Navigation.vue'
</script>

<style lang="scss" scoped>
.navbar-container{
  width: 100%;
}
</style>
