<template>
  <div class="q-pt-lg">
    <q-table :rows="filteredInvoices" :columns="columns" class="q-pa-lg invoices-table" row-key="invoiceId"
      :rows-per-page-label="$t('common.rowsPerPage')" :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) =>
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
import { statuses, columns } from 'src/constants/invoicesTable';
import { useInvoice } from 'src/composition/useInvoice';

const { statusFilter, filteredInvoices } = useInvoice()
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
