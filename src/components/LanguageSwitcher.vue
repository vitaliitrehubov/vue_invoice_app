<template>
  <div>
    <q-btn-toggle v-model="chosenLang" toggle-color="primary" :options="langOptions" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { langOptions } from '../constants/languages'
import { useI18n } from 'vue-i18n'

const chosenLang = ref(
  localStorage.getItem('languagePreference') ?? 'en'
)

const { locale } = useI18n({ useScope: 'global' })
locale.value = chosenLang.value

watch(chosenLang, (val) => {
  localStorage.setItem('languagePreference', val)
  locale.value = val
})
</script>

