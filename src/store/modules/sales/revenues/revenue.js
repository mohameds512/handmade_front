import Revenue from "@/api/sales/revenues/revenue"; //////


 const revenues = new Revenue();

const revenuesModule = {
  namespaced: true,
  state: {
    revenue: null,
    revenues: [],
    total: 0,
    load: false,
  },
  getters: {
    revenue(state) {
      return state.revenue;
    },
    revenues(state) {
      return state.revenues;
    },
    total(state) {
      return state.total;
    },

  },
  mutations: {
 
    SET_REVENUE: (state, revenue) => {
      state.revenue = revenue;
    },
    SET_REVENUES: (state, revenues) => {
        state.revenues = revenues;
      },
    SET_TOTAL_REVENUES: (state, total) => {
        state.total = total;
      },
  
      SET_REVENUES_LOAD: (state, load) => {
        state.load = load;
      },
  },
  actions: {
    

    items({commit}, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_REVENUES_LOAD', true);
            revenues.list(payload.query).then(response => {
                commit('SET_REVENUES', response.data);
                commit('SET_TOTAL_REVENUES', response.meta.count);
                commit('SET_REVENUES_LOAD', false);
                resolve();
            });
        });
    },
    put({commit}, payload) {
        commit('app/UPDATE_LOAD', true, {root: true});
        return new Promise((resolve, reject) => {
            revenues
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
            commit('SET_REVENUES_LOAD', true);
            revenues.get(id)
                .then(response => {
                    commit('SET_REVENUE', response.data);
                    commit('SET_REVENUES_LOAD', false);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    remove({ commit }, id) {
      return new Promise((resolve, reject) => {
        revenues
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

export default revenuesModule;
