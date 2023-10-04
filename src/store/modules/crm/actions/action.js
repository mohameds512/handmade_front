import Action from "@/api/crm/actions/action";


 const actions = new Action();

const actionsModule = {
  namespaced: true,
  state: {
    action: null,
    actions: [],
    total: 0,
    load: false,
  },
  getters: {
    action(state) {
      return state.action;
    },
    actions(state) {
      return state.actions;
    },
    total(state) {
      return state.total;
    },
    load(state) {
      return state.load;
    },
  },
  mutations: {
 
    SET_ACTION: (state, action) => {
      state.action = action;
    },
    SET_ACTIONS: (state, actions) => {
        state.actions = actions;
      },
    SET_TOTAL_ACTIONS: (state, total) => {
        state.total = total;
      },
  
      SET_ACTIONS_LOAD: (state, load) => {
        state.load = load;
      },
  },
  actions: {
    

    items({commit}, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_ACTIONS_LOAD', true);
            actions.list(payload.query).then(response => {
                commit('SET_ACTIONS', response.data);
                commit('SET_TOTAL_ACTIONS', response.meta.total);
                commit('SET_ACTIONS_LOAD', false);
                resolve();
            });
        });
    },
    put({commit}, payload) {
        commit('app/UPDATE_LOAD', true, {root: true});
        return new Promise((resolve, reject) => {
            actions
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
            commit('SET_ACTIONS_LOAD', true);
            actions.get(id)
                .then(response => {
                    commit('SET_ACTION', response.data);
                    commit('SET_ACTIONS_LOAD', false);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    remove({ commit }, id) {
      return new Promise((resolve, reject) => {
        actions
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

export default actionsModule;
