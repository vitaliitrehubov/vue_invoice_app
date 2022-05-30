const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
  },
  {
    name: "InvoicePage",
    path: "/invoices/:id",
    component: () => import("components/InvoiceItem.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: "404Page",
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
