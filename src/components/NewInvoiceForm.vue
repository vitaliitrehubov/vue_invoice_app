<template>
  <the-dialog width="600" @closePopup="$emit('closePopup')">
    <template #popupHeader>
      <p class="text-h5 q-pl-md q-ma-none">{{ $t('createInvoiceForm.newInvoice') }}</p>
    </template>

    <template #popupContent>
      <q-form @submit.prevent="createInvoice">
        <div class="q-my-md">
          <p class="text-subtitle1 q-mb-xs text-grey">{{ $t('createInvoiceForm.billTo') }}</p>
          <div class="q-mb-sm">
            <q-input v-model.trim="client.name" lazy-rules :rules="[ruleRequiredField]"
              :label="$t('createInvoiceForm.clientName')" filled />
          </div>
          <div class="row q-gutter-sm q-mb-sm">
            <div class="col">
              <q-input v-model.trim="client.email" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.clientEmail')" filled />
            </div>
            <div class="col">
              <q-input v-model.trim="client.street" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.streetAddress')" filled />
            </div>
          </div>

          <div class="row q-gutter-sm">
            <div class="col">
              <q-input v-model.trim="client.zipCode" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.zipCode')" filled />
            </div>
            <div class="col">
              <q-input v-model.trim="client.city" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.city')" filled />
            </div>
            <div class="col">
              <q-input v-model.trim="client.country" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.country')" filled />
            </div>
          </div>
        </div>

        <div class="q-my-md">
          <p class="text-subtitle1 q-mb-xs text-grey">{{ $t('createInvoiceForm.billFrom') }}</p>
          <div class="q-mb-sm">
            <q-input v-model.trim="biller.street" lazy-rules :rules="[ruleRequiredField]"
              :label="$t('createInvoiceForm.streetAddress')" filled />
          </div>

          <div class="row q-gutter-sm">
            <div class="col">
              <q-input v-model.trim="biller.zipCode" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.zipCode')" filled />
            </div>
            <div class="col">
              <q-input v-model.trim="biller.city" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.city')" filled />
            </div>
            <div class="col">
              <q-input v-model.trim="biller.country" :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.country')" filled />
            </div>
          </div>
        </div>
      </q-form>
    </template>

    <template #popupFooter>
      <div class="row justify-between">
        <q-btn @click="clearForm" color="negative" :label="$t('createInvoiceForm.discard')" />
        <q-btn :disabled="!isFormFilledOut" type="submit" class="q-ml-sm" color="positive"
          :label="$t('createInvoiceForm.createInvoice')" />
      </div>
    </template>
  </the-dialog>
</template>

<script setup>
import { onBeforeUnmount } from 'vue'
import TheDialog from './shared/TheDialog.vue'
import { useInvoice } from '../composition/useInvoice.js'
import { ruleRequiredField } from '../constants/invoiceData';

const {
  client,
  biller,
  clearForm,
  createInvoice,
  isFormFilledOut
} = useInvoice()

onBeforeUnmount(() => clearForm())
</script>
