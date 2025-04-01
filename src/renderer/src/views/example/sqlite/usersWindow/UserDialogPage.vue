<template>
  <div style="padding: 18px 18px 0">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" status-icon>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="form.age" :min="1" :max="100" controls-position="right" />
      </el-form-item>
      <el-form-item>
        <div style="width: 100%; display: flex; justify-content: flex-end">
          <el-button :disabled="confirmLoading" @click="cancleEvent">取消</el-button>
          <el-button type="primary" :loading="confirmLoading" @click="confirmEvent">确认</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { UserType } from '@renderer/types/userType'
import type { FormInstance, FormRules } from 'element-plus'

const route = useRoute()

function cancleEvent() {
  formRef.value?.resetFields()
  window.electron.ipcRenderer.send('removeUserDialogPageWindow')
}
const confirmLoading = ref(false)
async function confirmEvent() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      await addUserFn()
      formRef.value?.resetFields()
      window.electron.ipcRenderer.send('userDialogPageWindowConfirm')
    } else {
      console.log('error submit!', fields)
    }
  })
}
async function addUserFn() {
  if (confirmLoading.value === true) return
  confirmLoading.value = true
  if (route.query.id) {
    const res = await window.electron.ipcRenderer.invoke('updateUserAction', {
      id: route.query.id,
      name: form.value.name,
      age: form.value.age
    })
    console.log(res)
  } else {
    const res = await window.electron.ipcRenderer.invoke('addUserAction', {
      name: form.value.name,
      age: form.value.age
    })
    console.log(res)
  }
  confirmLoading.value = false
}

const formRef = ref<FormInstance>()
const form = ref<UserType>({
  name: '',
  age: 1
})
const rules = reactive<FormRules<UserType>>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { required: true, message: '请输入姓名', trigger: 'change' }
  ],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }]
})

watch(
  () => route.query,
  (newVal) => {
    document.title = newVal.id ? '编辑用户' : '新增用户'
    if (newVal && newVal.id) {
      getUserById()
    }
  },
  {
    immediate: true
  }
)

async function getUserById() {
  const res = await window.electron.ipcRenderer.invoke('getUserByIdAction', {
    id: route.query.id
  })
  form.value = res
}
</script>

<style lang="scss" scoped></style>
