<template>
  <q-layout class="q-pa-sm">
    <div class="row justify-end">
      <q-btn :label="$t('common.newInvoice')" icon="add" color="positive" @click="openPopup" />
    </div>
    <invoice-form v-if="isPopupOpen" @submitForm="addInvoice" @closePopup="closePopup"
      :actionBtnLabel="$t('invoiceForm.createInvoice')" :formHeader="$t('invoiceForm.newInvoice')">
    </invoice-form>
    <invoices-table></invoices-table>
  </q-layout>
</template>

<script setup>
import InvoiceForm from '../components/InvoiceForm.vue'
import InvoicesTable from '../components/InvoicesTable.vue'
import { useInvoice } from '../composition/useInvoice.js'
import { useStore } from 'vuex'
import { ref } from 'vue'

const { createInvoice } = useInvoice()
const { dispatch } = useStore()

const addInvoice = async (data) => {
  closePopup()
  await createInvoice(data)
  await dispatch('loadInvoices')
}

const isPopupOpen = ref(false)
const openPopup = () => isPopupOpen.value = true
const closePopup = () => isPopupOpen.value = false
</script>

