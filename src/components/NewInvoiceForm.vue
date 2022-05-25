<template>
  <the-dialog width="600" @close-popup="$emit('closePopup')">
    <template #popupHeader>
      <p class="text-h5 q-pl-md q-ma-none">{{ $t('createInvoiceForm.newInvoice') }}</p>
    </template>

    <template #popupContent>
      <form @submit.prevent="submit">
        <div class="q-my-md">
          <p class="text-subtitle1 q-mb-xs">{{ $t('createInvoiceForm.billTo') }}</p>
          <div>
            <q-input v-model="client.name" :standout="standout" :label="$t('createInvoiceForm.clientName')" />
          </div>
          <div class="row q-gutter-sm q-my-sm">
            <div class="col">
              <q-input v-model="client.email" :standout="standout" :label="$t('createInvoiceForm.clientEmail')" />
            </div>
            <div class="col">
              <q-input v-model="client.street" :standout="standout" :label="$t('createInvoiceForm.streetAddress')" />
            </div>
          </div>

          <div class="row q-gutter-sm">
            <div class="col">
              <q-input v-model="client.zipCode" :standout="standout" :label="$t('createInvoiceForm.zipCode')" />
            </div>
            <div class="col">
              <q-input v-model="client.city" :standout="standout" :label="$t('createInvoiceForm.city')" />
            </div>
            <div class="col">
              <q-input v-model="client.country" :standout="standout" :label="$t('createInvoiceForm.country')" />
            </div>
          </div>
        </div>

        <div class="q-my-md">
          <p class="text-subtitle1 q-mb-xs">{{ $t('createInvoiceForm.billFrom') }}</p>
          <div class="q-mb-sm">
            <q-input v-model="biller.street" :standout="standout" :label="$t('createInvoiceForm.streetAddress')" />
          </div>

          <div class="row q-gutter-sm">
            <div class="col">
              <q-input v-model="biller.zipCode" :standout="standout" :label="$t('createInvoiceForm.zipCode')" />
            </div>
            <div class="col">
              <q-input v-model="biller.city" :standout="standout" :label="$t('createInvoiceForm.city')" />
            </div>
            <div class="col">
              <q-input v-model="biller.country" :standout="standout" :label="$t('createInvoiceForm.country')" />
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
          <q-btn class="q-ml-sm" color="positive" :label="$t('createInvoiceForm.createInvoice')" />
        </div>
      </div>
    </template>
  </the-dialog>
</template>

<script setup>
import { onBeforeUnmount } from 'vue'
import TheDialog from './shared/TheDialog.vue'
import { useInvoiceForm } from '../composition/useInvoiceForm.js'

const standout = 'bg-grey-8 text-white'
const { client, biller, clearForm } = useInvoiceForm()

onBeforeUnmount(() => clearForm())
</script>

