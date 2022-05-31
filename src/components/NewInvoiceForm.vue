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
            <q-input v-model.trim="clientName" lazy-rules :rules="[ruleRequiredField]"
              :label="$t('createInvoiceForm.clientName')" filled />
          </div>
          <div class="row q-gutter-sm q-mb-sm">
            <div class="col">
              <q-input v-model.trim="clientEmail" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.clientEmail')" filled />
            </div>
            <div class="col">
              <q-input v-model.trim="clientStreet" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.streetAddress')" filled />
            </div>
          </div>

          <div class="row q-gutter-sm">
            <div class="col">
              <q-input v-model.trim="clientZipCode" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.zipCode')" filled />
            </div>
            <div class="col">
              <q-input v-model.trim="clientCity" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.city')" filled />
            </div>
            <div class="col">
              <q-input v-model.trim="clientCountry" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.country')" filled />
            </div>
          </div>
        </div>

        <div class="q-my-md">
          <p class="text-subtitle1 q-mb-xs text-grey">{{ $t('createInvoiceForm.paymentDetails') }}</p>

          <div class="row q-gutter-sm">
            <div class="col">
              <q-input filled v-model="paymentDueDate" mask="date" :label="$t('createInvoiceForm.paymentDueDate')"
                :rules="['date', ruleRequiredField]" />
            </div>
            <div class="col">
              <q-input v-model.trim="paymentAmount" lazy-rules :rules="[ruleRequiredField]" maxlength="10"
                :label="$t('createInvoiceForm.paymentAmount')" filled />
            </div>
            <div class="col">
              <q-select filled v-model="invoiceStatus" :options="invoiceStatuses" :rules="[ruleRequiredField]"
                :label="$t('createInvoiceForm.invoiceStatus')" />
            </div>
          </div>
        </div>
      </q-form>
    </template>

    <template #popupFooter>
      <div class="row justify-between">
        <q-btn @click="clearForm" color="negative" :label="$t('createInvoiceForm.discard')" />
        <q-btn @click="addInvoice" :disabled="!isFormFilledOut" type="submit" class="q-ml-sm" color="positive"
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
import { invoiceStatuses } from 'src/constants/invoicesTable';
import { useStore } from 'vuex'

const { dispatch } = useStore()
const emits = defineEmits(['closePopup'])

const {
  paymentAmount,
  paymentDueDate,
  invoiceStatus,
  clientName,
  clientEmail,
  clientStreet,
  clientCity,
  clientCountry,
  clientZipCode,
  invoiceCreationDate,
  clearForm,
  createInvoice,
  isFormFilledOut
} = useInvoice()


const addInvoice = async () => {
  await createInvoice()
  emits('closePopup')
  dispatch('loadInvoices')
}

onBeforeUnmount(clearForm)
</script>
