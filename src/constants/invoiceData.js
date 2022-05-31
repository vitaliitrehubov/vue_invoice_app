import { i18n } from "../boot/i18n.js";
const { t } = i18n.global;

export const invoiceData = {
  clientName: null,
  clientStreet: null,
  clientCity: null,
  clientCountry: null,
  clientEmail: null,
  clientZipCode: null,
  paymentDueDate: null,
  paymentAmount: null,
  invoiceStatus: null,
};

export const ruleRequiredField = (val) =>
  val !== null && val !== "" ? null : t("createInvoiceForm.requiredField");
