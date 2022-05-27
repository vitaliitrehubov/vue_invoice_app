import { i18n } from "../boot/i18n.js";
import { computed, watch, ref } from "vue";

const { t } = i18n.global;

export const statuses = computed(() => [
  { label: t("common.all"), value: "all" },
  { label: t("common.pending"), value: "pending" },
  { label: t("common.paid"), value: "paid" },
]);

export const columns = computed(() => [
  {
    name: "invoiceId",
    field: "invoiceId",
    label: t("common.invoiceId"),
    align: "left",
  },
  {
    name: "clientName",
    field: "clientName",
    label: t("common.clientName"),
    align: "left",
  },
  {
    name: "dueDate",
    field: "dueDate",
    label: t("common.dueDate"),
    align: "left",
  },
  {
    name: "status",
    field: "status",
    label: t("common.status"),
    align: "center",
  },
  { name: "total", field: "total", label: t("common.total"), sortable: true },
]);

export const statusFilter = ref(statuses.value[0]);

watch(
  () => i18n.global.locale,
  () => (statusFilter.value.label = t(`common.${statusFilter.value.value}`))
);
