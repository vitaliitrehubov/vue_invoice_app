import { i18n } from "../boot/i18n.js";
import { computed } from "vue";

const { t } = i18n.global;

export const statuses = computed(() => [
  { label: t("common.all"), value: "All" },
  { label: t("common.pending"), value: "Pending" },
  { label: t("common.paid"), value: "Paid" },
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
