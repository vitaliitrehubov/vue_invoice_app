import { ref, toRefs } from "vue";
import { invoiceFormData } from "../constants/invoiceFormData.js";

export const useInvoiceForm = () => {
  const formData = ref({
    ...invoiceFormData,
  });

  const clearForm = () => {
    for (const key in formData.value) {
      for (const innerKey in formData.value[key]) {
        formData.value[key][innerKey] = null;
      }
    }
  };

  return { clearForm, ...toRefs(formData.value) };
};
