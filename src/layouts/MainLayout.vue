<template>
  <q-layout class="q-pa-sm">
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
import { onBeforeRouteLeave } from 'vue-router';
import { useStore } from 'vuex'

const { getters } = useStore()

onBeforeRouteLeave((to, from, next) => {
  // if (to.params.id) {
  //   getters.getInvoices.some(({ id }) => id === to.params.id) && next()
  // } else {
  //   next({ name: '404Page' })
  //   return
  // }
  next({ name: '404Page' })
})

const isPopupOpen = ref(false)
const openPopup = () => isPopupOpen.value = true
const closePopup = () => isPopupOpen.value = false
</script>

