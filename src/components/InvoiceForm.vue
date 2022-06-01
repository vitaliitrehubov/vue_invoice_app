<template>
  <the-dialog width="600" @closePopup="$emit('closePopup')">
    <template #popupHeader>
      <p class="text-h5 q-pl-md q-ma-none">{{ formHeader }}</p>
    </template>

    <template #popupContent>
      <q-form>
        <div class="q-my-md">
          <p class="text-subtitle1 q-mb-xs text-grey">{{ $t('invoiceForm.billTo') }}</p>
          <div class="q-mb-sm">
            <q-input v-model="invoiceState.clientName" lazy-rules :rules="[ruleRequiredField]"
              :label="$t('invoiceForm.clientName')" filled />
          </div>
          <div class="row q-gutter-sm q-mb-sm">
            <div class="col">
              <q-input v-model="invoiceState.clientEmail" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('invoiceForm.clientEmail')" filled />
            </div>
            <div class="col">
              <q-input v-model="invoiceState.clientStreet" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('invoiceForm.streetAddress')" filled />
            </div>
          </div>

          <div class="row q-gutter-sm">
            <div class="col">
              <q-input v-model="invoiceState.clientZipCode" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('invoiceForm.zipCode')" filled />
            </div>
            <div class="col">
              <q-input v-model="invoiceState.clientCity" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('invoiceForm.city')" filled />
            </div>
            <div class="col">
              <q-input v-model="invoiceState.clientCountry" lazy-rules :rules="[ruleRequiredField]"
                :label="$t('invoiceForm.country')" filled />
            </div>
          </div>
        </div>

        <div class="q-my-md">
          <p class="text-subtitle1 q-mb-xs text-grey">{{ $t('invoiceForm.paymentDetails') }}</p>

          <div class="row q-gutter-sm">
            <div class="col">
              <q-input v-model="invoiceState.paymentDueDate" filled mask="date"
                :label="$t('invoiceForm.paymentDueDate')" :rules="['date', ruleRequiredField]" />
            </div>
            <div class="col">
              <q-input v-model="invoiceState.paymentAmount" lazy-rules :rules="[ruleRequiredField]" maxlength="10"
                :label="$t('invoiceForm.paymentAmount')" filled />
            </div>
            <div class="col">
              <q-select filled v-model="invoiceState.invoiceStatus" :options="invoiceStatuses"
                :model-value="invoiceState.invoiceStatus" :rules="[ruleRequiredField]"
                :label="$t('invoiceForm.invoiceStatus')" />
            </div>
          </div>
        </div>
      </q-form>
    </template>

    <template #popupFooter>
      <div class="row justify-between">
        <q-btn @click="clearForm" color="negative" :label="$t('invoiceForm.discard')" />
        <q-btn @click="$emit('submitForm', invoiceState)" :disabled="!isFormFilledOut" type="submit" class="q-ml-sm"
          color="positive">{{
              actionBtnLabel
          }}</q-btn>
      </div>
    </template>
  </the-dialog>
</template>

<script setup>
import TheDialog from './shared/TheDialog.vue'
import { onBeforeUnmount, reactive, computed } from 'vue'
import { ruleRequiredField, invoiceData } from '../constants/invoiceData';
import { invoiceStatuses } from 'src/constants/invoicesTable';

const props = defineProps({
  actionBtnLabel: {
    type: String,
    required: true
  },
  formHeader: {
    type: String,
    required: true
  },
  invoice: {
    type: Object,
    default: () => ({ ...invoiceData })
  }
})

const emits = defineEmits(['closePopup', 'submitForm'])

const invoiceState = reactive({ ...props.invoice })

const isFormFilledOut = computed(() => {
  for (const key in invoiceState) {
    if (
      invoiceState[key] === "" ||
      invoiceState[key] === null ||
      typeof invoiceState[key] == "undefined"
    )
      return false;
  }

  return true;
});

const clearForm = () => {
  for (const key in invoiceState) {
    invoiceState[key] = null;
  }
};

onBeforeUnmount(clearForm)
</script>
