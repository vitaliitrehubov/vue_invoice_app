import { ref, toRefs, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { i18n } from "../boot/i18n.js";
import { invoiceData } from "../constants/invoiceData.js";
import { statuses } from "src/constants/invoicesTable";
import { database } from "../firebase/firebaseInit.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const useInvoice = () => {
  const {
    getters: { getInvoices },
    dispatch,
  } = useStore();

  const { params } = useRoute();

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
    let invoices = [];
    const results = await getDocs(collectionRef);
    invoices = results.docs.map((item) => item.data());
    console.log(invoices);
  };

  const createInvoice = async () => {
    try {
      isLoading.value = true;
      console.log("loading", isLoading.value);
      addDoc(collectionRef, { id: "1111", num: 2 });
    } catch (e) {
      console.log(e);
    } finally {
      isLoading.value = false;
      console.log("finished", isLoading.value);
    }
  };

  const editInvoice = async () => {};

  const deleteInvoice = () => dispatch("deleteInvoice", { id: params.id });

  const statusFilter = ref(statuses.value[0]);

  const { t } = i18n.global;

  const filteredInvoices = computed(() => {
    if (statusFilter.value.value === "All") {
      return getInvoices;
    } else {
      return getInvoices.filter(
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
    createInvoice,
    editInvoice,
    deleteInvoice,
    clearForm,
    isFormFilledOut,
    ...toRefs(formData.value),
  };
};
