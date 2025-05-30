<template>
  <el-form :inline="true" :model="queryForm" style="margin: 18px 0 0 18px">
    <el-form-item label="名称">
      <el-input v-model="queryForm.name" placeholder="名称" clearable style="width: 180px" />
    </el-form-item>
    <el-form-item>
      <el-button plain @click="getUserList">搜索</el-button>
      <el-button plain @click="addUserFn">新增用户</el-button>
    </el-form-item>
  </el-form>
  <el-table v-loading="loading" :data="userList" stripe>
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

  <UserDialog
    :id="detailId"
    :dialog-visible="dialogVisible"
    :is-editor="isEditor"
    @cancle="cancleFn"
    @confirm="confirmFn"
  ></UserDialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import type { User } from '@renderer/indexedDB/dexie/User'
import UserDialog from './UserDialog.vue'
import { dbGetUsers, dbDeleteUser } from '@renderer/indexedDB/dexie/index'

const loading = ref(false)
const queryForm = reactive({
  name: ''
})
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)
const userList = ref<User[]>([])
onMounted(() => {
  getUserList()
})

async function getUserList() {
  loading.value = true
  const res = await dbGetUsers({
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
  isEditor.value = false
}
function cancleFn() {
  dialogVisible.value = false
  detailId.value = null
}
function confirmFn() {
  getUserList()
  cancleFn()
}

const isEditor = ref(false)
const detailId = ref<number | null>(null)
function toDetailEvent(row) {
  isEditor.value = true
  detailId.value = row.id!
  dialogVisible.value = true
}
async function deleteEvent(row) {
  await dbDeleteUser(row.id)
  getUserList()
}
</script>
