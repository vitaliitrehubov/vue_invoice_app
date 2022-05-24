<template>
  <div>
    <button
      @click="switchLang"
    >{{ i18n.global.locale === 'en' ? 'Змінити мову на Українська' : 'Switch to English' }}
    </button>
    <h1>{{ $t('common.labels.invoice', { number: 9 }) }}</h1>
  </div>
  <router-view />
</template>

<script setup>
import { i18n } from '@/plugins/i18n'
const switchLang = () => {
  i18n.global.locale = i18n.global.locale === 'en' ? 'ua' : 'en'
}
</script>

<style lang="scss">
</style>
