<template>
  <q-layout view="lHh Lpr lFf" class="q-pa-sm">
    <div class="row justify-end">
      <q-btn :label="$t('common.newInvoice')" icon="add" color="positive" @click="openPopup" />
    </div>
    <new-invoice-form v-if="isPopupOpen" @closePopup="closePopup"></new-invoice-form>
    <invoices-table></invoices-table>
  </q-layout>
</template>

<script setup>
import NewInvoiceForm from '../components/NewInvoiceForm.vue'
import InvoicesTable from '../components/InvoicesTable.vue'
import { ref } from 'vue'

const isPopupOpen = ref(false)
const openPopup = () => isPopupOpen.value = true
const closePopup = () => isPopupOpen.value = false
</script>

