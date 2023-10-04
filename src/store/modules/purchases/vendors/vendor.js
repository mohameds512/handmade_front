import Vendor from "@/api/purchases/vendors/vendor"; //////


 const vendors = new Vendor();

const vendorsModule = {
  namespaced: true,
  state: {
    vendor: null,
    vendors: [],
    total: 0,
    load: false,
  },
  getters: {
    vendor(state) {
      return state.vendor;
    },
    vendors(state) {
      return state.vendors;
    },
    total(state) {
      return state.total;
    },
    load(state) {
      return state.load;
    },
  },
  mutations: {
 
    SET_VENDOR: (state, vendor) => {
      state.vendor = vendor;
    },
    SET_VENDORS: (state, vendors) => {
        state.vendors = vendors;
      },
    SET_TOTAL_VENDORS: (state, total) => {
        state.total = total;
      },
      SET_VENDORS_LOAD: (state, load) => {
        state.load = load;
      },
  },
  actions: {
    
    vendors({commit}, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_VENDORS_LOAD', true);
            vendors.list(payload.query).then(response => {
                commit('SET_VENDORS', response.data);
                commit('SET_TOTAL_VENDORS', response.meta.total);
                commit('SET_VENDORS_LOAD', false);
                resolve();
            });
        });
    },
        
    createVendor({commit},) {
      return new Promise((resolve, reject) => {
          commit('SET_VENDORS_LOAD', true);
          vendors.create().then(response => {
              commit('SET_VENDORS_LOAD', false);
              resolve(response);
          });
      });
  },
    getStates({commit}, payload) {
      return new Promise((resolve, reject) => {
          vendors.getStates(payload.query).then(response => {
            // commit('SET_STATES', response.data.states);
            resolve(response);
          });
      });
  },
    put({commit}, payload) {
        commit('app/UPDATE_LOAD', true, {root: true});
        return new Promise((resolve, reject) => {
            vendors
                .saveVendor(payload.id, payload.query)
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
            commit('SET_VENDORS_LOAD', true);
            vendors.get(id)
                .then(response => {
                    commit('SET_VENDORS', response.data);
                    commit('SET_VENDORS_LOAD', false);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    remove({ commit }, id) {
      return new Promise((resolve, reject) => {
        vendors
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

export default vendorsModule;
