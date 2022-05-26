<template>
  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
    <q-card class="" :style="`width: ${width}px`">
      <q-card-actions align="right">
        <q-btn flat icon="close" color="red" @click="$emit('close-popup')" />
      </q-card-actions>

      <slot name="popupHeader" />

      <q-card-section>
        <slot name="popupContent" />
      </q-card-section>

      <q-card-section>
        <slot name="popupFooter" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
const props = defineProps({
  width: {
    type: [Number, String],
    default: 300
  }
})

const persistent = true
</script>

