<template>
  <el-dialog
    :model-value="props.dialogVisible"
    :title="isEditor ? '编辑' : '新增'"
    width="500"
    draggable
    :before-close="cancleEvent"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" status-icon>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="form.age" :min="1" :max="100" controls-position="right" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button :disabled="confirmLoading" @click="cancleEvent">取消</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="confirmEvent">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import type { User } from '@renderer/indexedDB/dexie/User'
import type { FormInstance, FormRules } from 'element-plus'
import { dbGetUser, dbAddUser, dbUpdateUser } from '@renderer/indexedDB/dexie/index'

interface Props {
  dialogVisible: boolean
  isEditor: boolean
  id?: number | null
}

const props = defineProps<Props>()
const emits = defineEmits(['cancle', 'confirm'])
function cancleEvent() {
  formRef.value?.resetFields()
  emits('cancle')
}
const confirmLoading = ref(false)
async function confirmEvent() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      await addUserFn()
      formRef.value?.resetFields()
      emits('confirm')
    } else {
      console.log('error submit!', fields)
    }
  })
}
async function addUserFn() {
  if (confirmLoading.value === true) return
  confirmLoading.value = true
  if (props.id) {
    const res = await dbUpdateUser({
      id: props.id,
      name: form.value.name,
      age: form.value.age
    })
    console.log(res)
  } else {
    const res = await dbAddUser({
      name: form.value.name,
      age: form.value.age
    })
    console.log(res)
  }
  confirmLoading.value = false
}

const formRef = ref<FormInstance>()
const form = ref<User>({
  name: '',
  age: 1
})
const rules = reactive<FormRules<User>>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { required: true, message: '请输入姓名', trigger: 'change' }
  ],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }]
})

watch(
  () => props.dialogVisible,
  (newVal) => {
    if (newVal && props.id) {
      getUserById()
    }
  }
)

async function getUserById() {
  const res = await dbGetUser(props.id!)
  form.value = res!
}
</script>
