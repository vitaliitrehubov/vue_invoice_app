<template>
  <div>
    <div class="q-pa-md q-gutter-sm flex justify-between">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="arrow_left" to="/" :label="$t('common.back')" color="accent" class="text-h6" />
      </q-breadcrumbs>

      <div>
        <q-btn color="green" icon="edit" :label="$t('common.edit')" />
        <q-btn color="red" @click="deleteInvoice" icon="delete" :label="$t('common.delete')" class="q-ml-md" />
      </div>
    </div>

    <h1>{{ $store.state.counter }}</h1>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const { params } = useRoute()
const { commit } = useStore()
const deleteInvoice = () => commit('deleteInvoice', { id: params.id })
</script>


