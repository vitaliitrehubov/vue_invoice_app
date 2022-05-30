import { reactive, ref, toRefs, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { i18n } from "../boot/i18n.js";
import { NOTIFY_SHOW_MSG } from "../plugins/notify/notify.js";
import { invoiceData } from "../constants/invoiceData.js";
import { statuses } from "src/constants/invoicesTable";
import { database } from "../firebase/firebaseInit.js";
import { collection, addDoc, deleteDoc, doc, getDoc } from "firebase/firestore";

const { t } = i18n.global;

export const useInvoice = () => {
  const invoiceDetailsState = reactive({
    invoice: null,
    isLoading: false,
  });

  const { getters, dispatch } = useStore();
  const router = useRouter();

  const collectionRef = collection(database, "invoices");
  const isLoading = ref(false);

  const formData = ref({
    ...invoiceData,
  });

  const clearForm = () => {
    for (const key in formData.value) {
      for (const innerKey in formData.value[key]) {
        formData.value[key][innerKey] = null;
      }
    }
  };

  const isFormFilledOut = computed(() => {
    for (const key in formData.value.client) {
      if (!formData.value.client[key]) return false;
    }

    for (const key in formData.value.biller) {
      if (!formData.value.biller[key]) return false;
    }

    return true;
  });

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

      invoiceDetailsState.invoice = await invoiceData.data();

      if (!invoiceDetailsState.invoice) {
        router.push({ name: "404Page" });
      }
    } catch (e) {
      console.log(e);
    } finally {
      invoiceDetailsState.isLoading = false;
    }
  };

  const createInvoice = async () => {
    try {
      addDoc(collectionRef, {
        ...formData.value,
        dueDate: "01.01.2020",
        total: 900,
        status: "Pending",
      });
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

  const editInvoice = async () => {};

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
        ({ status }) => status === statusFilter.value.value
      );
    }
  });

  watch(
    () => i18n.global.locale,
    () =>
      (statusFilter.value.label = t(
        `common.${statusFilter.value.value.toLowerCase()}`
      ))
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
    clearForm,
    isFormFilledOut,
    ...toRefs(formData.value),
  };
};
