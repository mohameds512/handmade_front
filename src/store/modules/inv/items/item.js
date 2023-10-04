import Item from "@/api/inv/items/item"; //////


 const items = new Item();

const itemsModule = {
  namespaced: true,
  state: {
    item: null,
    items: [],
    total: 0,
    load: false,
  },
  getters: {
    item(state) {
      return state.item;
    },
    items(state) {
      return state.items;
    },
    total(state) {
      return state.total;
    },
    load(state) {
      return state.load;
    },
  },
  mutations: {
 
    SET_ITEM: (state, item) => {
      state.item = item;
    },
    SET_ITEMS: (state, items) => {
        state.items = items;
      },
    SET_TOTAL_ITEMS: (state, total) => {
        state.total = total;
      },
  
      SET_ITEMS_LOAD: (state, load) => {
        state.load = load;
      },
  },
  actions: {
    

    items({commit}, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_ITEMS_LOAD', true);
            items.list(payload.query).then(response => {
                commit('SET_ITEMS', response.data);
                commit('SET_TOTAL_ITEMS', response.meta.total);
                commit('SET_ITEMS_LOAD', false);
                resolve();
            });
        });
    },
    put({commit}, payload) {
        commit('app/UPDATE_LOAD', true, {root: true});
        return new Promise((resolve, reject) => {
            items
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
            commit('SET_ITEMS_LOAD', true);
            items.get(id)
                .then(response => {
                    commit('SET_ITEM', response.data);
                    commit('SET_ITEMS_LOAD', false);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    remove({ commit }, id) {
      return new Promise((resolve, reject) => {
        items
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

export default itemsModule;
