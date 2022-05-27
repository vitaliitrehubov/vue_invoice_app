<template>
  <div class="flex q-pa-sm">
    <language-switcher></language-switcher>
    <mode-switcher></mode-switcher>
  </div>
  <router-view />
</template>

<script setup>
import ModeSwitcher from './components/ModeSwitcher.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
</script>
