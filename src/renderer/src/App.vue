<template>
  <el-config-provider :locale="zhCn">
    <el-alert
      v-if="!online"
      title="网络出现问题，请查看网络连接是否正常"
      type="warning"
      show-icon
      :closable="false"
      class="my-alert"
    />
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive :include="componentNames">
          <Suspense>
            <component :is="Component" />

            <template #fallback> 正在加载... </template>
          </Suspense>
        </keep-alive>
      </transition>
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import { useOnline, useDark } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useKeepAliveStore } from '@renderer/stores/KeepAliveStore'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import 'nprogress/nprogress.css'

useDark()
const router = useRouter()
const online = useOnline()
const keepAliveStore = useKeepAliveStore()
const { addComponentName } = keepAliveStore
const { componentNames } = storeToRefs(keepAliveStore)

const { start: startNProgress, done: doneNProgress } = useNProgress()
router.beforeEach((to, _from, next) => {
  if (to.meta?.keepAlive) {
    addComponentName(to.name as string)
  }
  startNProgress()
  next()
})
router.afterEach((to) => {
  document.title = `${to.meta.title as string} | electron-vite-app`
  doneNProgress()
})
</script>

<style scoped lang="scss">
.my-alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
</style>
