<template>
  <div>
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
          <q-btn color="positive" icon="edit" :label="$t('common.edit')" />
          <q-btn color="negative" @click="deleteInvoice(params.id)" icon="delete" :label="$t('common.delete')"
            class="q-ml-md" />
        </div>
      </div>

      <h2>{{ invoiceDetailsState.invoice?.dueDate }}</h2>
    </template>
  </div>
</template>

<script setup>
import { useInvoice } from 'src/composition/useInvoice';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router'

const { params } = useRoute()
const { deleteInvoice, loadSingleInvoice, invoiceDetailsState } = useInvoice()

onBeforeMount(loadSingleInvoice(params.id))
</script>
