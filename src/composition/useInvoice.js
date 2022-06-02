import { reactive, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { i18n } from "../boot/i18n.js";
import { NOTIFY_SHOW_MSG } from "../plugins/notify/notify.js";
import { invoiceData } from "../constants/invoiceData.js";
import { statuses } from "src/constants/invoicesTable";
import { database } from "../firebase/firebaseInit.js";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const { t } = i18n.global;

export const useInvoice = () => {
  const invoiceDetailsState = reactive({
    invoice: { ...invoiceData },
    isLoading: false,
  });

  const { getters, dispatch } = useStore();
  const router = useRouter();

  const collectionRef = collection(database, "invoices");
  const isLoading = ref(false);

  const loadInvoices = async () => {
    isLoading.value = true;
    await dispatch("loadInvoices");
    isLoading.value = false;
  };

  const loadSingleInvoice = async (id) => {
    try {
      invoiceDetailsState.isLoading = true;

      const docRef = doc(database, "invoices", id);
      const invoiceData = await getDoc(docRef, id);

      invoiceDetailsState.invoice = await { ...invoiceData.data(), id: invoiceData.id };

      if (!invoiceDetailsState.invoice) {
        router.push({ name: "404Page" });
      }
    } catch (e) {
      console.log(e);
    } finally {
      invoiceDetailsState.isLoading = false;
    }
  };

  const createInvoice = async (data) => {
    try {
      addDoc(collectionRef, { ...data });
      NOTIFY_SHOW_MSG({
        color: "positive",
        message: t("common.invoiceAction.create.success"),
        icon: "assignment",
      });
    } catch (e) {
      NOTIFY_SHOW_MSG({
        color: "negative",
        message: t("common.invoiceAction.create.error"),
        icon: "error",
      });
      console.log(e);
    }
  };

  const editInvoice = async (invoiceId, invoiceData) => {
    try {
      const docRef = doc(database, "invoices", invoiceId);
      await updateDoc(docRef, { ...invoiceData });
      NOTIFY_SHOW_MSG({
        color: "positive",
        message: t("common.invoiceAction.edit.success"),
        icon: "delete",
      });
    } catch (e) {
      NOTIFY_SHOW_MSG({
        color: "negative",
        message: t("common.invoiceAction.edit.error"),
        icon: "error",
      });
      console.log(e);
    }
  };

  const deleteInvoice = async (invoiceId) => {
    try {
      const docRef = doc(database, "invoices", invoiceId);
      await deleteDoc(docRef);
      NOTIFY_SHOW_MSG({
        color: "positive",
        message: t("common.invoiceAction.delete.success"),
        icon: "delete",
      });
    } catch (e) {
      NOTIFY_SHOW_MSG({
        color: "negative",
        message: t("common.invoiceAction.delete.error"),
        icon: "error",
      });
      console.log(e);
    } finally {
      router.push({ name: "HomePage" });
    }
  };

  const statusFilter = ref(statuses.value[0]);

  const filteredInvoices = computed(() => {
    if (statusFilter.value.value === "All") {
      return getters.getInvoices;
    } else {
      return getters.getInvoices.filter(
        ({ invoiceStatus }) =>
          invoiceStatus.value.toLowerCase() === statusFilter.value.value.toLowerCase()
      );
    }
  });

  watch(
    () => i18n.global.locale,
    () => {
      statusFilter.value.label = t(
        `common.${statusFilter.value.value.toLowerCase()}`
      );
    }
  );

  return {
    filteredInvoices,
    statusFilter,
    isLoading,
    loadInvoices,
    loadSingleInvoice,
    invoiceDetailsState,
    createInvoice,
    editInvoice,
    deleteInvoice,
  };
};
