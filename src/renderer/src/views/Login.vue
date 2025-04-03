<template>
  <div class="flex h-screen items-center justify-center">
    <div class="w-full px-12">
      <div class="my-6 flex justify-center">
        <img class="h-17 w-17" :src="logo" alt="logo" />
      </div>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" class="w-full">
        <el-form-item prop="account" label="账号">
          <el-input v-model="form.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-full" @click="submitForm(formRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { onKeyStroke } from '@vueuse/core'
import logo from '@renderer/assets/images/256x256.png'

interface RuleForm {
  account: string
  password: string
}
const formRef = ref<FormInstance>()
const form = reactive<RuleForm>({
  account: '',
  password: ''
})
const rules = reactive<FormRules<RuleForm>>({
  account: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 12,
      message: '密码长度在 6 到 12 个字符之间'
    }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      handleLogin()
    } else {
      console.log('error submit!')
    }
  })
}

function handleLogin() {
  window.electron.ipcRenderer.send('login', toRaw(form))
}

onKeyStroke('Enter', () => {
  submitForm(formRef.value)
})
</script>
