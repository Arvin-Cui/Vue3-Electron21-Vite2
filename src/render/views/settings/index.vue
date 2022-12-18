<template>
   <div class="wraper-container">
    {{count}}
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useCache} from '@/render/hooks/useCache'
const {wsCache}=useCache('localStorage')

const count = ref('配置管理')


</script>

<style scoped>

</style>
