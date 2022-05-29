import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import { database } from "../firebase/firebaseInit.js";
import { collection, getDocs } from "firebase/firestore";
const collectionRef = collection(database, "invoices");

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
        invoices: [],
      };
    },
    mutations: {
      deleteInvoice(state, { id }) {
        alert("invoice deleted: " + id);
      },
      loadInvoices(state, { invoices }) {
        state.invoices = invoices;
      },
    },
    actions: {
      deleteInvoice(context, payload) {
        setTimeout(() => {
          context.commit("deleteInvoice", payload);
        }, 2000);
      },
      async loadInvoices({ commit }) {
        try {
          let invoices = [];
          const results = await getDocs(collectionRef);
          invoices = results.docs.map((item) => item.data());
          commit("loadInvoices", { invoices });
        } catch (e) {
          console.log(e);
        }
      },
    },
    getters: {
      getInvoices: (state) => state.invoices,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
