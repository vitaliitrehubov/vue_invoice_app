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
      <div class="q-mt-lg">
        <q-card class="q-pa-lg" style="width: 500px; margin: 0 auto">
          <q-card-section>
            <p class="text-h6 flex justify-between">
              <span class="text-grey">{{ $t('common.invoice') }}</span>
              <span>{{ invoiceDetailsState.invoice.id }}</span>
            </p>
          </q-card-section>

          <q-card-section>
            <div class="q-py-sm flex justify-between" v-for="(value, key) of invoiceDetailsState.invoice" :key="key">
              <span class="text-grey">{{ $t(`invoiceForm.${key}`) }}</span>
              <template v-if="key === 'invoiceStatus'">
                <q-badge :color="value.value.toLowerCase() === 'pending' ? 'grey-7' : 'positive'">
                  {{ $t(`common.${value.value.toLowerCase()}`) }}
                </q-badge>
              </template>
              <template v-else>
                <span>{{ value }}</span>
              </template>
            </div>
          </q-card-section>
        </q-card>
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
