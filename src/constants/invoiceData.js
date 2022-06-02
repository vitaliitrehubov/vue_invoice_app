import { i18n } from "../boot/i18n.js";
const { t } = i18n.global;

export const invoiceData = {
  name: null,
  street: null,
  city: null,
  country: null,
  email: null,
  zipCode: null,
  paymentDueDate: null,
  paymentAmount: null,
  invoiceStatus: null,
};

export const ruleRequiredField = (val) =>
  val !== null && val !== "" ? null : t("invoiceForm.requiredField");
