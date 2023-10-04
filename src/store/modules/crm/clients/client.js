import Client from "@/api/crm/clients/client"; //////


 const clients = new Client();

const clientsModule = {
  namespaced: true,
  state: {
    client: null,
    clients: [],
    total: 0,
    load: false,
  },
  getters: {
    client(state) {
      return state.client;
    },
    clients(state) {
      return state.clients;
    },
    total(state) {
      return state.total;
    },
    load(state) {
      return state.load;
    },
  },
  mutations: {
    SET_CLIENT: (state, client) => {
      state.client = client;
    },
    SET_CLIENTS: (state, clients) => {
        state.clients = clients;
      },
    SET_TOTAL_CLIENTS: (state, total) => {
        state.total = total;
      },
  
      SET_CLIENTS_LOAD: (state, load) => {
        state.load = load;
      },
  },
  actions: {
    

    items({commit}, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_CLIENTS_LOAD', true);
            clients.list(payload.query).then(response => {
                commit('SET_CLIENTS', response.data);
                commit('SET_TOTAL_CLIENTS', response.meta.total);
                commit('SET_CLIENTS_LOAD', false);
                resolve();
            });
        });
    },
    put({commit}, payload) {
        commit('app/UPDATE_LOAD', true, {root: true});
        return new Promise((resolve, reject) => {
            clients
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
            commit('SET_CLIENTS_LOAD', true);
            clients.get(id)
                .then(response => {
                    commit('SET_CLIENT', response.data);
                    commit('SET_CLIENTS_LOAD', false);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    remove({ commit }, id) {
      return new Promise((resolve, reject) => {
        clients
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

export default clientsModule;
