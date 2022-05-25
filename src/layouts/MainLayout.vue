<template>
  <q-layout view="lHh Lpr lFf" class="q-pa-sm">
    <language-switcher></language-switcher>
    <div class="row justify-end">
      <q-btn :label="$t('common.newInvoice')" icon="add" color="positive" @click="openPopup" />
    </div>
    <new-invoice-form v-if="isPopupOpen" @closePopup="closePopup"></new-invoice-form>
  </q-layout>
</template>

<script setup>
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import NewInvoiceForm from '../components/NewInvoiceForm.vue'
import TheDialog from '../components/shared/TheDialog.vue'
import { ref } from 'vue'

const isPopupOpen = ref(false)
const openPopup = () => isPopupOpen.value = true
const closePopup = () => isPopupOpen.value = false
</script>

