<template>
  <the-dialog width="600">
    <template #popupHeader>
      <p class="text-h5 q-pl-md q-ma-none">{{ $t('createInvoiceForm.newInvoice') }}</p>
    </template>

    <template #popupContent>
      <form @submit.prevent="submit">
        <div class="q-my-md">
          <p class="text-subtitle1 q-mb-xs text-grey">{{ $t('createInvoiceForm.billTo') }}</p>
          <div class="q-mb-sm">
            <q-input v-model="client.name" :label="$t('createInvoiceForm.clientName')" filled />
          </div>
          <div class="row q-gutter-sm q-mb-sm">
            <div class="col">
              <q-input v-model="client.email" :label="$t('createInvoiceForm.clientEmail')" filled />
            </div>
            <div class="col">
              <q-input v-model="client.street" :label="$t('createInvoiceForm.streetAddress')" filled />
            </div>
          </div>

          <div class="row q-gutter-sm">
            <div class="col">
              <q-input v-model="client.zipCode" :label="$t('createInvoiceForm.zipCode')" filled />
            </div>
            <div class="col">
              <q-input v-model="client.city" :label="$t('createInvoiceForm.city')" filled />
            </div>
            <div class="col">
              <q-input v-model="client.country" :label="$t('createInvoiceForm.country')" filled />
            </div>
          </div>
        </div>

        <div class="q-my-md">
          <p class="text-subtitle1 q-mb-xs text-grey">{{ $t('createInvoiceForm.billFrom') }}</p>
          <div class="q-mb-sm">
            <q-input v-model="biller.street" :label="$t('createInvoiceForm.streetAddress')" filled />
          </div>

          <div class="row q-gutter-sm">
            <div class="col">
              <q-input v-model="biller.zipCode" :label="$t('createInvoiceForm.zipCode')" filled />
            </div>
            <div class="col">
              <q-input v-model="biller.city" :label="$t('createInvoiceForm.city')" filled />
            </div>
            <div class="col">
              <q-input v-model="biller.country" :label="$t('createInvoiceForm.country')" filled />
            </div>
          </div>
        </div>
      </form>
    </template>

    <template #popupFooter>
      <div class="row justify-between">
        <div>
          <q-btn @click="clearForm" color="negative" :label="$t('createInvoiceForm.discard')" />
        </div>
        <div>
          <q-btn color="blue-grey-6" :label="$t('createInvoiceForm.createDraft')" />
          <q-btn @click="createInvoice" class="q-ml-sm" color="positive"
            :label="$t('createInvoiceForm.createInvoice')" />
        </div>
      </div>
    </template>
  </the-dialog>
</template>

<script setup>
import { onBeforeUnmount } from 'vue'
import TheDialog from './shared/TheDialog.vue'
import { useInvoice } from '../composition/useInvoice.js'

const { client, biller, clearForm, createInvoice } = useInvoice()

onBeforeUnmount(() => clearForm())
</script>

