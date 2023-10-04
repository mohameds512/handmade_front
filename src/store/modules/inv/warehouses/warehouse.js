import Warehouse from "@/api/inv/warehouses/warehouse"; //////


 const warehouses = new Warehouse();

const warehousesModule = {
  namespaced: true,
  state: {
    warehouse: null,
    warehouses: [],
    total: 0,
    load: false,
  },
  getters: {
    warehouse(state) {
      return state.warehouse;
    },
    warehouses(state) {
      return state.warehouses;
    },
    total(state) {
      return state.total;
    },
    load(state) {
      return state.load;
    },
  },
  mutations: {
 
    SET_WAREHOUSE: (state, warehouse) => {
      state.warehouse = warehouse;
    },
    SET_WAREHOUSES: (state, warehouses) => {
        state.warehouses = warehouses;
      },
    SET_TOTAL_WAREHOUSES: (state, total) => {
        state.total = total;
      },
  
      SET_WAREHOUSES_LOAD: (state, load) => {
        state.load = load;
      },
  },
  actions: {
    

    items({commit}, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_WAREHOUSES_LOAD', true);
            warehouses.list(payload.query).then(response => {
                commit('SET_WAREHOUSES', response.data);
                commit('SET_TOTAL_WAREHOUSES', response.meta.total);
                commit('SET_WAREHOUSES_LOAD', false);
                resolve();
            });
        });
    },
    put({commit}, payload) {
        commit('app/UPDATE_LOAD', true, {root: true});
        return new Promise((resolve, reject) => {
            warehouses
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
            commit('SET_WAREHOUSES_LOAD', true);
            warehouses.get(id)
                .then(response => {
                    commit('SET_WAREHOUSES', response.data);
                    commit('SET_WAREHOUSES_LOAD', false);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    remove({ commit }, id) {
      return new Promise((resolve, reject) => {
        warehouses
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

export default warehousesModule;
