<template>
  <div class="q-pt-lg invoices-table">
    <q-table style="width: 900px; margin: 0 auto" :rows="filteredInvoices" :columns="columns" class="q-pa-lg"
      row-key="invoiceId" :rows-per-page-label="$t('common.rowsPerPage')" :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) =>
      $t('common.paginationLable', { firstRowIndex, endRowIndex, totalRowsNumber })"
      :no-data-label="$t('common.noInvoicesLabel')">
      <template #top="props">
        <div class="col-2 q-table__title flex items-center">{{ $t('common.invoices') }}
          <q-badge class="q-ml-md q-pa-sm text-weight-bold" color="secondary">
            {{ filteredInvoices.length }}
          </q-badge>
        </div>
        <q-space />
        <q-select filled v-model="statusFilter" :options="statuses" :label="$t('common.status')" style="width: 150px" />

        <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen" class="q-ml-md" />
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td key="invoiceId" :props="props">
            <router-link class="text-secondary" :to="{ name: 'InvoicePage', params: { id: props.row.invoiceId } }">#
              {{ props.row.invoiceId }}</router-link>
          </q-td>
          <q-td key="clientName" :props="props">{{ props.row.clientName }}</q-td>
          <q-td key="dueDate" :props="props">{{ props.row.dueDate }}</q-td>
          <q-td key="status" :props="props">
            <q-badge :color="props.row.status === 'Pending' ? 'grey-7' : 'positive'">
              {{ $t(`common.${props.row.status === 'Pending' ? 'pending' : 'paid'}`) }}
            </q-badge>
          </q-td>
          <q-td key="total" :props="props">$ {{ props.row.total }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { statuses, columns, statusFilter } from 'src/constants/invoicesTable.js';

const store = useStore()

const filteredInvoices = computed(() => {
  if (statusFilter.value.value === 'pending') {
    return store.state.invoices.filter(({ status }) => status === 'Pending')
  }

  if (statusFilter.value.value === 'paid') {
    return store.state.invoices.filter(({ status }) => status === 'Paid')
  }

  return store.state.invoices
})
</script>
