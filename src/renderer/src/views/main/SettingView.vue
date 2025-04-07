<template>
  <div class="flex h-full flex-col items-stretch px-4 pt-2 pb-4">
    <h3 class="shrink-0">设置</h3>
    <div class="flex-auto">
      <el-tabs tab-position="left" style="height: 100%">
        <el-tab-pane label="外观">
          <el-form label-width="auto">
            <el-form-item label="主题色">
              <el-select
                :model-value="setting.theme"
                placeholder="请选择主题色"
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
            <el-form-item label="任务栏位置">
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
        <el-tab-pane label="关于"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSettingStore } from '@renderer/stores/settingStore'
import { storeToRefs } from 'pinia'
import { useDark } from '@vueuse/core'

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
</script>
