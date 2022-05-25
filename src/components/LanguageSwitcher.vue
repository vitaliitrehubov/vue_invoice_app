<template>
  <div>
    <q-btn-toggle v-model="chosenLang" toggle-color="primary" :options="langOptions" />
  </div>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { langOptions } from '../constants/languages'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })
const chosenLang = ref('')

onBeforeMount(() => {
  chosenLang.value = localStorage.getItem('languagePreference') ?? 'en'
})

watch(chosenLang, (val) => {
  localStorage.setItem('languagePreference', val)
  locale.value = val
})
</script>

