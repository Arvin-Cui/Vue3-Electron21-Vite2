<template>
   <div class="wraper-container">
    {{count}}
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useCache} from '@/render/hooks/useCache'
const {wsCache}=useCache('localStorage')

const count = ref('审阅区历史')


</script>

<style scoped>

</style>
