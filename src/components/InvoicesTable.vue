<template>
  <div class="q-pt-lg invoices-table">
    <q-table :rows="rows" :columns="columns" class="q-pa-lg" row-key="invoiceId"
      :rows-per-page-label="$t('common.rowsPerPage')" :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) =>
      $t('common.paginationLable', { firstRowIndex, endRowIndex, totalRowsNumber })">
      <template #top="props">
        <div class="col-2 q-table__title">{{ $t('common.invoices') }}</div>
        <q-space />
        <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen" class="q-ml-md" />
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td key="invoiceId" :props="props">
            <router-link class="invoice-link" to="/sdfsfsf"># {{ props.row.invoiceId }}</router-link>
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
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n({ useScope: 'global' })

// const props = defineProps({
//   rows: {
//     type: Array,
//     default: () => []
//   }
// })


const columns = computed(() => [
  { name: 'invoiceId', field: 'invoiceId', label: t('common.invoiceId'), align: 'left' },
  { name: 'clientName', field: 'clientName', label: t('common.clientName'), align: 'left' },
  { name: 'dueDate', field: 'dueDate', label: t('common.dueDate'), align: 'left' },
  { name: 'status', field: 'status', label: t('common.status'), align: 'center' },
  { name: 'total', field: 'total', label: t('common.total'), sortable: true }
])

const rows = [
  { invoiceId: 0, clientName: 'Kate Midlton', dueDate: 'pes', status: 'Pending', total: 1000 },
  { invoiceId: 1, clientName: 'Jorge Jr.', dueDate: 'pes', status: 'Paid', total: 500 },
  { invoiceId: 2, clientName: 'Vitalii Trehubov A.', dueDate: 'pes', status: 'Pending', total: 1500 },
  { invoiceId: 3, clientName: 'Mr. John', dueDate: 'pes', status: 'Paid', total: 200 },
  { invoiceId: 4, clientName: 'Kate Huston', dueDate: 'pes', status: 'Pending', total: 900 },
  { invoiceId: 5, clientName: 'Duglas Bob', dueDate: 'pes', status: 'Paid', total: 250 },
  { invoiceId: 6, clientName: 'L. Unopp', dueDate: 'pes', status: 'Pending', total: 10500 }
]

</script>

<style lang="scss" scoped>
.invoices-table {
  width: 900px;
  margin: 0 auto;
}

.invoice-link {
  color: $primary;
  font-size: 16px;
}
</style>

