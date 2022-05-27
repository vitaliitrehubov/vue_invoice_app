<template>
  <div class="q-pt-lg invoices-table">
    <q-table :rows="rows" :columns="columns" class="q-pa-lg" row-key="invoiceId"
      :rows-per-page-label="$t('common.rowsPerPage')" :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) =>
      $t('common.paginationLable', { firstRowIndex, endRowIndex, totalRowsNumber })"
      :no-data-label="$t('common.noInvoicesLabel')">
      <template #top="props">
        <div class="col-2 q-table__title flex items-center">{{ $t('common.invoices') }}
          <q-badge class="q-ml-md q-pa-sm text-weight-bold" color="secondary">
            {{ rows.length }}
          </q-badge>
        </div>
        <q-space />
        <q-select filled v-model="statusFilter" :options="statuses" :label="$t('common.status')" style="width: 100px" />

        <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen" class="q-ml-md" />
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td key="invoiceId" :props="props">
            <router-link class="invoice-link text-secondary"
              :to="{ name: 'InvoicePage', params: { id: props.row.invoiceId } }">#
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
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'

const store = useStore()

const { t, locale } = useI18n({ useScope: 'global' })

const columns = computed(() => [
  { name: 'invoiceId', field: 'invoiceId', label: t('common.invoiceId'), align: 'left' },
  { name: 'clientName', field: 'clientName', label: t('common.clientName'), align: 'left' },
  { name: 'dueDate', field: 'dueDate', label: t('common.dueDate'), align: 'left' },
  { name: 'status', field: 'status', label: t('common.status'), align: 'center' },
  { name: 'total', field: 'total', label: t('common.total'), sortable: true }
])

const statuses = [
  { label: t('common.all'), value: 'all' },
  { label: t('common.pending'), value: 'pending' },
  { label: t('common.paid'), value: 'paid' }
]


const statusFilter = ref(statuses[0])

watch(locale,
  () => statusFilter.value.label = t(`common.${statusFilter.value.value}`)
)

const rows = computed(() => {
  if (statusFilter.value.value === 'pending') {
    return store.state.invoices.filter(({ status }) => status === 'Pending')
  }

  if (statusFilter.value.value === 'paid') {
    return store.state.invoices.filter(({ status }) => status === 'Paid')
  }

  return store.state.invoices
})

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

