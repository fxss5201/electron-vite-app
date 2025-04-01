<template>
  <div class="page-box">
    <el-form :inline="true" :model="queryForm" style="margin: 18px 0 0 18px">
      <el-form-item label="名称">
        <el-input v-model="queryForm.name" placeholder="名称" clearable style="width: 180px" />
      </el-form-item>
      <el-form-item>
        <el-button plain @click="getUserList">搜索</el-button>
        <el-button plain @click="addUserFn">新增用户</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="userList">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="toDetailEvent(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm title="确定删除？" @confirm="deleteEvent(scope.row)">
            <template #reference>
              <el-button link type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="sizes, prev, pager, next, jumper, total"
      :total="total"
      style="margin: 18px"
      @change="pageChangeFn"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import type { UserType } from '@renderer/types/userType'

const loading = ref(false)
const queryForm = reactive({
  name: ''
})
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)
const userList = ref<UserType[]>([])
onMounted(() => {
  getUserList()
})

async function getUserList() {
  loading.value = true
  const res = await window.electron.ipcRenderer.invoke('getUsersAction', {
    name: queryForm.name,
    page: currentPage.value,
    pageSize: pageSize.value
  })
  if (res) {
    total.value = res.total
    userList.value = res.list
  }
  loading.value = false
}
function pageChangeFn(page: number, size: number) {
  console.log(page, size)
  currentPage.value = page
  pageSize.value = size
  getUserList()
}

const dialogVisible = ref(false)
function addUserFn() {
  dialogVisible.value = true
  window.electron.ipcRenderer.send('userDialogPage', {})
}
window.electron.ipcRenderer.on('userDialogPageClose', () => {
  dialogVisible.value = false
})
window.electron.ipcRenderer.on('userDialogPageConfirm', () => {
  getUserList()
  dialogVisible.value = false
})

function toDetailEvent(row: UserType) {
  dialogVisible.value = true
  window.electron.ipcRenderer.send('userDialogPage', {
    id: row.id
  })
}
async function deleteEvent(row: UserType) {
  const res = await window.electron.ipcRenderer.invoke('deleteUserAction', {
    id: row.id
  })
  console.log(res)
  getUserList()
}
</script>
