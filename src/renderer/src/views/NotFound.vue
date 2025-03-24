<template>
  <el-result
    icon="error"
    title="404"
    sub-title="页面不存在"
  >
    <template #extra>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const goHome = () => {
  router.push('/home');
}
</script>

<style lang="scss" scoped>
</style>
