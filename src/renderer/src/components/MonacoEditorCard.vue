<template>
  <MonacoEditor
    v-model="model"
    :language="monacoEditorLanguage"
    :theme="theme"
    :options="monacoEditorOptions"
  ></MonacoEditor>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MonacoEditor from '@renderer/components/MonacoEditor.vue'
import type { Options, Theme } from '@renderer/components/MonacoEditor.vue'
import { monacoEditorSupportLanguagesMap } from '@renderer/components/fileConfig'
import { useDark } from '@vueuse/core'

const model = defineModel({ type: String, default: '' })

const { lang, isEditor = false } = defineProps<{
  lang: string
  isEditor?: boolean
}>()

const monacoEditorLanguage = computed(() => {
  return monacoEditorSupportLanguagesMap[lang] || lang
})

const isDark = useDark()
const theme = computed<Theme>(() => {
  return isDark.value ? 'vs-dark' : 'vs'
})

const monacoEditorOptions = computed<Options>(() => {
  return {
    readOnly: !isEditor
  }
})
</script>
