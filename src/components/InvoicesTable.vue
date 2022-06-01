<template>
  <div class="q-pt-lg">
    <q-table :rows="filteredInvoices" :columns="columns" :loading="isLoading" class="q-pa-lg invoices-table"
      row-key="invoiceId" :rows-per-page-label="$t('common.rowsPerPage')" :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) =>
      $t('common.paginationLabel', { firstRowIndex, endRowIndex, totalRowsNumber })"
      :no-data-label="$t('common.noInvoicesLabel')" :loading-label="$t('common.loading')">
      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template #top="props">
        <div class="col-2 q-table__title flex items-center">{{ $t('common.invoices') }}
          <q-badge class="q-ml-md q-pa-sm text-weight-bold" color="primary">
            {{ filteredInvoices.length }}
          </q-badge>
        </div>
        <q-space />
        <q-select filled v-model="statusFilter" :options="statuses" style="width: 160px" :label="$t('common.status')" />
        <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen" class="q-ml-md" />
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            <router-link class="text-secondary" :to="{ name: 'InvoiceDetails', params: { id: props.row.id } }">#
              {{ props.row.id }}</router-link>
          </q-td>
          <q-td key="clientName" :props="props">{{ truncateLongText(props.row.clientName, 25) }}
          </q-td>
          <q-td key="paymentDueDate" :props="props">{{ props.row.paymentDueDate }}</q-td>
          <q-td key="invoiceStatus" :props="props">
            <q-badge :color="props.row.invoiceStatus.value === 'Pending' ? 'grey-7' : 'positive'">
              {{ $t(`common.${props.row.invoiceStatus.value.toLowerCase()}`) }}
            </q-badge>
          </q-td>
          <q-td key="paymentTotal" :props="props">$ {{ props.row.paymentAmount }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { statuses, columns } from 'src/constants/invoicesTable';
import { useInvoice } from 'src/composition/useInvoice';
import { onBeforeMount } from 'vue'
import { truncateLongText } from '../utils/utils.js'

const { statusFilter, filteredInvoices, isLoading, loadInvoices } = useInvoice()

onBeforeMount(() => loadInvoices())
</script>

<style scoped lang="scss">
.invoices-table {
  width: 900px;
  margin: 0 auto;

  &.fullscreen {
    width: unset;
  }
}
</style>
