import { i18n } from "../boot/i18n.js";
const { t } = i18n.global;

export const invoiceData = {
  client: {
    country: null,
    city: null,
    street: null,
    zipCode: null,
    name: null,
    email: null,
  },
  biller: {
    country: null,
    city: null,
    street: null,
    zipCode: null,
  },
  payment: {
    dueDate: null,
    dueDateUnix: null,
    terms: null,
  },
  invoice: {
    date: null,
    dateUnix: null,
    terms: null,
    status: null,
    total: null,
    invoicesList: null,
    productDescr: null,
  },
};

export const ruleRequiredField = (val) =>
  val !== null && val !== "" ? null : t("createInvoiceForm.requiredField");
