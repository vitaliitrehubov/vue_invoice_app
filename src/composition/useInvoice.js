import { ref, toRefs } from "vue";
import { invoiceData } from "../constants/invoiceData.js";
import { database } from "../firebase/firebaseInit.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const useInvoice = () => {
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

  const deleteInvoice = async () => {};

  return {
    isLoading,
    loadInvoices,
    createInvoice,
    editInvoice,
    deleteInvoice,
    clearForm,
    ...toRefs(formData.value),
  };
};
