<template>
  <div class="flex h-full flex-col items-stretch px-4 pt-2 pb-4">
    <h3 class="shrink-0">设置</h3>
    <div class="flex-auto">
      <el-tabs v-model="tabActive" tab-position="left" style="height: 100%">
        <el-tab-pane name="0" label="外观">
          <el-form label-width="auto">
            <el-form-item label="主题模式">
              <el-select
                :model-value="setting.theme"
                placeholder="请选择主题模式"
                @change="changeThemeFn"
              >
                <el-option
                  v-for="item in themes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item name="1" label="任务栏位置">
              <el-select
                :model-value="setting.taskbarPosition"
                placeholder="请选择任务栏位置"
                @change="changeTaskbarPositionFn"
              >
                <el-option
                  v-for="item in positions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="关于">
          <div class="text-base">
            <span>当前版本信息</span>
            <el-button plain class="ml-2" @click="checkUpdateFn">检查更新</el-button>
          </div>
          <div class="text-base">版本：{{ versionInfo?.version }}</div>
          <div v-if="versionInfo?.releaseDate" class="text-base">
            更新日期：{{ versionInfo?.releaseDate }}
          </div>
          <template v-if="versionInfo?.shouldUpdate">
            <div class="mt-2 text-base">
              <span>是否有新版本：是</span>
              <el-button plain class="ml-2" @click="updateDownloadFn">立即更新</el-button>
            </div>
            <div class="text-base">最新版本：{{ versionInfo?.newVersion }}</div>
            <div class="text-base">更新日期：{{ versionInfo?.newReleaseDate }}</div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingStore } from '@renderer/stores/settingStore'
import { storeToRefs } from 'pinia'
import { useDark } from '@vueuse/core'
import { useVersionStore } from '@renderer/stores/versionStore'

const route = useRoute()
const tabActive = ref('0')
onMounted(() => {
  tabActive.value = (route.query.tab as string) || '0'
})
const settingStore = useSettingStore()
const { setting } = storeToRefs(settingStore)
const { setSettingTheme, setSettingTaskbarPosition } = settingStore

const themes = ref([
  { label: '跟随系统', value: 'system' },
  { label: '浅色模式', value: 'light' },
  { label: '暗黑模式', value: 'dark' }
])
const changeThemeFn = async (val) => {
  await setSettingTheme(val)
  useDark()
}

const positions = ref([
  { label: '底部', value: 'bottom' },
  { label: '左侧', value: 'left' },
  { label: '右侧', value: 'right' },
  { label: '顶部', value: 'top' }
])
const changeTaskbarPositionFn = async (val) => {
  await setSettingTaskbarPosition(val)
}

const versionStore = useVersionStore()
const { versionInfo } = storeToRefs(versionStore)
function checkUpdateFn() {
  window.electron.ipcRenderer.send('check-for-update')
}
function updateDownloadFn() {
  window.electron.ipcRenderer.send('updateDownload')
}
</script>
