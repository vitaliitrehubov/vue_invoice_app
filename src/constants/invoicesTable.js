import { i18n } from "../boot/i18n.js";
import { computed } from "vue";

const { t } = i18n.global;

export const statuses = computed(() => [
  { label: t("common.all"), value: "All" },
  { label: t("common.pending"), value: "Pending" },
  { label: t("common.paid"), value: "Paid" },
]);

export const invoiceStatuses = computed(() => [
  { label: t("common.pending"), value: "pending" },
  { label: t("common.paid"), value: "paid" },
]);

export const columns = computed(() => [
  {
    name: "id",
    field: "id",
    label: t("common.invoiceId"),
    align: "left",
  },
  {
    name: "name",
    field: "name",
    label: t("common.name"),
    align: "left",
  },
  {
    name: "paymentDueDate",
    field: "paymentDueDate",
    label: t("common.dueDate"),
    align: "left",
  },
  {
    name: "invoiceStatus",
    field: "invoiceStatus",
    label: t("common.status"),
    align: "center",
  },
  {
    name: "paymentTotal",
    field: "paymentTotal",
    label: t("common.total"),
    sortable: true,
  },
]);
