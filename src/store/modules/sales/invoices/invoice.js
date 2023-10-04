import Invoice from "@/api/sales/invoices/invoice"; //////


 const invoices = new Invoice();

const invoicesModule = {
  namespaced: true,
  state: {
    invoice: null,
    invoices: [],
    total: 0,
    load: false,
  },
  getters: {
    invoice(state) {
      return state.invoice;
    },
    invoices(state) {
      return state.invoices;
    },
    total(state) {
      return state.total;
    },
    load(state) {
      return state.load;
    },
  },
  mutations: {
 
    SET_INVOICE: (state, invoice) => {
      state.invoice = invoice;
    },
    SET_INVOICES: (state, invoices) => {
        state.invoices = invoices;
      },
    SET_TOTAL_INVOICES: (state, total) => {
        state.total = total;
      },
  
      SET_INVOICES_LOAD: (state, load) => {
        state.load = load;
      },
  },
  actions: {
    

    items({commit}, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_INVOICES_LOAD', true);
            invoices.list(payload.query).then(response => {
                commit('SET_INVOICES', response.data);
                commit('SET_TOTAL_INVOICES', response.meta.total);
                commit('SET_INVOICES_LOAD', false);
                resolve();
            });
        });
    },
    put({commit}, payload) {
        commit('app/UPDATE_LOAD', true, {root: true});
        return new Promise((resolve, reject) => {
            invoices
                .put(payload.id, payload.query)
                .then(response => {
                    commit('app/UPDATE_LOAD', false, {root: true});
                    resolve();
                })
                .catch(error => {
                    commit('app/UPDATE_LOAD', false, {root: true});
                    reject(error);
                });
        });
    },
    get({commit}, id) {
        return new Promise((resolve, reject) => {
            commit('SET_INVOICES_LOAD', true);
            invoices.get(id)
                .then(response => {
                    commit('SET_INVOICE', response.data);
                    commit('SET_INVOICES_LOAD', false);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    remove({ commit }, id) {
      return new Promise((resolve, reject) => {
        invoices
          .remove(id)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    
  },
};

export default invoicesModule;
