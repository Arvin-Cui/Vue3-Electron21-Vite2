<template>
   <div class="wraper-container">
    {{count}}
     <el-button type="success">Success</el-button>
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useCache} from '@/render/hooks/useCache'
const {wsCache}=useCache('localStorage')

const count = ref('运营管理')


</script>

<style scoped>

</style>
