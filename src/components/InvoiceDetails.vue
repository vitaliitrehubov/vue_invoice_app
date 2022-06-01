<template>
  <div>
    <invoice-form v-if="isPopupOpen" @submitForm="edit" @close-popup="isPopupOpen = false"
      :actionBtnLabel="$t('common.update')" :formHeader="$t('invoiceForm.editInvoice')" v-bind="invoiceDetailsState">
    </invoice-form>

    <template v-if="invoiceDetailsState.isLoading">
      <q-inner-loading :showing="true">
        <q-spinner-gears size="10vw" color="primary" />
      </q-inner-loading>
    </template>

    <template v-else>
      <div class="q-pa-md q-gutter-sm flex justify-between">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="arrow_left" to="/" :label="$t('common.back')" color="accent" class="text-h6" />
        </q-breadcrumbs>
        <div>
          <q-btn color="positive" @click="isPopupOpen = true" icon="edit" :label="$t('common.edit')" />
          <q-btn color="negative" @click="deleteInvoice(params.id)" icon="delete" :label="$t('common.delete')"
            class="q-ml-md" />
        </div>
      </div>
      <div>
        {{ invoiceDetailsState.invoice }}
      </div>
    </template>
  </div>
</template>

<script setup>
import InvoiceForm from './InvoiceForm.vue';
import { useInvoice } from 'src/composition/useInvoice';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const { params } = useRoute()
const { editInvoice, deleteInvoice, loadSingleInvoice, invoiceDetailsState } = useInvoice()

const isPopupOpen = ref(false)

const edit = async (data) => {
  isPopupOpen.value = false
  invoiceDetailsState.isLoading = true
  await editInvoice(params.id, { ...data })
  await loadSingleInvoice(params.id)
  invoiceDetailsState.isLoading = false
}

onBeforeMount(loadSingleInvoice(params.id))
</script>
