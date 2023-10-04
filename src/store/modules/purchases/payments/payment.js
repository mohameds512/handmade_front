import Payment from "@/api/purchases/payments/payment"; //////


 const payments = new Payment();

const paymentsModule = {
  namespaced: true,
  state: {
    payment: null,
    payments: [],
    total: 0,
    load: false,
  },
  getters: {
    payment(state) {
      return state.payment;
    },
    payments(state) {
      return state.payments;
    },
    total(state) {
      return state.total;
    },
    load(state) {
      return state.load;
    },
  },
  mutations: {
 
    SET_PAYMENT: (state, payment) => {
      state.payment = payment;
    },
    SET_PAYMENTS: (state, payments) => {
        state.payments = payments;
      },
    SET_TOTAL_PAYMENTS: (state, total) => {
        state.total = total;
      },
  
      SET_PAYMENTS_LOAD: (state, load) => {
        state.load = load;
      },
  },
  actions: {
    

    items({commit}, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_PAYMENTS_LOAD', true);
            payments.list(payload.query).then(response => {
                commit('SET_PAYMENTS', response.data);
                commit('SET_TOTAL_PAYMENTS', response.meta.total);
                commit('SET_PAYMENTS_LOAD', false);
                resolve();
            });
        });
    },
    put({commit}, payload) {
        commit('app/UPDATE_LOAD', true, {root: true});
        return new Promise((resolve, reject) => {
            payments
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
            commit('SET_PAYMENTS_LOAD', true);
            payments.get(id)
                .then(response => {
                    commit('SET_PAYMENT', response.data);
                    commit('SET_PAYMENTS_LOAD', false);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    remove({ commit }, id) {
      return new Promise((resolve, reject) => {
        payments
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

export default paymentsModule;
