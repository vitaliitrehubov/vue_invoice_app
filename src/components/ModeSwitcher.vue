<template>
  <div class="q-ml-lg">
    <q-checkbox v-model="isDarkModeActive" />
    <span class="text-subtitle2">{{ $t('common.darkMode') }}</span>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, watch } from 'vue'

const isDarkModeActive = ref(
  localStorage.getItem('theme') === 'dark' ? true : false
)

const $q = useQuasar()
$q.dark.set(isDarkModeActive.value)

watch(isDarkModeActive, (val) => {
  $q.dark.set(val)
  localStorage.setItem('theme', val === false ? 'light' : 'dark')
})
</script>

