<template>
  <the-dialog width="600" @close-popup="$emit('closePopup')">
    <template #popupHeader>
      <p class="text-h5 q-pl-md">{{ $t('createInvoiceForm.newInvoice') }}</p>
    </template>

    <template #popupContent>
      <form @submit.prevent="submit">
        <div class="q-my-sm">
          <q-input v-model="client.name" :standout="standout" :label="$t('createInvoiceForm.clientName')" />
        </div>
        <div class="q-my-sm">
          <q-input v-model="client.email" :standout="standout" :label="$t('createInvoiceForm.clientEmail')" />
        </div>
        <div class="q-my-sm">
          <q-input v-model="client.address.street" :standout="standout"
            :label="$t('createInvoiceForm.streetAddress')" />
        </div>

        <div class="row q-gutter-sm">
          <div class="col">
            <q-input v-model="client.zipCode" :standout="standout" :label="$t('createInvoiceForm.zipCode')" />
          </div>
          <div class="col">
            <q-input v-model="client.address.city" :standout="standout" :label="$t('createInvoiceForm.city')" />
          </div>
          <div class="col">
            <q-input v-model="client.address.country" :standout="standout" :label="$t('createInvoiceForm.country')" />
          </div>
        </div>
      </form>
    </template>
  </the-dialog>
</template>

<script setup>
import TheDialog from './shared/TheDialog.vue'
import { client } from '../constants/newInvoiceData'
const standout = 'bg-grey-8 text-white'
</script>

