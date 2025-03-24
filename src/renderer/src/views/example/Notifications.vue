<template>
  <div class="page-box">
    <h1>Notifications</h1>
    <el-form :model="form" label-width="auto" style="width: 600px;margin: 0 auto;">
      <el-form-item label="通知标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="通知内容">
        <el-input v-model="form.body" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button plain @click="onSubmit">发送通知</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue'

const form = reactive({
  title: '',
  body: '',
})

const onSubmit = () => {
  window.electron.ipcRenderer.send('sendNotification', toRaw(form))
}
</script>

<style lang="scss" scoped>
</style>
