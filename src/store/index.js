import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state() {
      return {
        invoices: [
          {
            invoiceId: 0,
            clientName: "Kate Midlton",
            dueDate: "pes",
            status: "Pending",
            total: 1000,
          },
          {
            invoiceId: 1,
            clientName: "Jorge Jr.",
            dueDate: "pes",
            status: "Paid",
            total: 500,
          },
          {
            invoiceId: 2,
            clientName: "Vitalii Trehubov A.",
            dueDate: "pes",
            status: "Pending",
            total: 1500,
          },
          {
            invoiceId: 3,
            clientName: "Mr. John",
            dueDate: "pes",
            status: "Paid",
            total: 200,
          },
          {
            invoiceId: 4,
            clientName: "Kate Huston",
            dueDate: "pes",
            status: "Pending",
            total: 900,
          },
          {
            invoiceId: 5,
            clientName: "Duglas Bob",
            dueDate: "pes",
            status: "Paid",
            total: 250,
          },
          {
            invoiceId: 6,
            clientName: "L. Unopp",
            dueDate: "pes",
            status: "Pending",
            total: 10500,
          },
        ],
        counter: "sfsff",
      };
    },
    mutations: {
      deleteInvoice(state, { id }) {
        alert("invoice deleted: " + id);
      },
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
