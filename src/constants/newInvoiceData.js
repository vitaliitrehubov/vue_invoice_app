import { ref, reactive } from "vue";

export const biller = reactive({
  address: {
    country: null,
    city: null,
    street: null,
  },
  zipCode: null,
});

export const client = reactive({
  address: {
    country: null,
    city: null,
    street: null,
  },
  zipCode: null,
  name: null,
  email: null,
});

export const payment = reactive({
  dueDate: null,
  dueDateUnix: null,
  terms: null,
});

export const invoice = reactive({
  date: null,
  dateUnix: null,
  terms: null,
  status: null,
  total: 0,
  invoicesList: [],
});

export const productDescr = ref(null);
