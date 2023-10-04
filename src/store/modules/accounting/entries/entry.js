import Entry from '../../../../api/accounting/entries/entry';

const entries = new Entry();

const entriesModule = {
  namespaced: true,
  state: {
    accounts:null,
    load: false,
  },
  getters: {
    accounts(state) {
      return state.items;
    },
    load(state) {
      return state.load;
    },
  },
  mutations: {
    SET_ACCOUNTS: (state, accounts) => {
      state.accounts = accounts;
    },
    SET_JOURNAL_LOAD: (state, load) => {
        state.load = load;
      },
  },
  actions: {
    createEntry({ commit }) {
      return new Promise((resolve, reject) => {
        entries.createEntry()
          .then((response) => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    saveEntry({ commit },payload) {
      return new Promise((resolve, reject) => {
        entries.saveEntry(payload.query)
          .then((response) => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    entries({ commit }, payload) {
      return new Promise((resolve, reject) => { 
        commit('SET_JOURNAL_LOAD', true);
        entries.list(payload.query).then(response => {
        //   commit('SET_ENTRIES', response.data);
        //   commit('SET_TOTAL_ENTRIES', response.total);
          commit('SET_JOURNAL_LOAD', false);
          resolve();
        });
      });
    },
    put({ commit }, payload) {
      commit('app/UPDATE_LOAD', true, { root: true });
      return new Promise((resolve, reject) => {
        entries
          .put(payload.id, payload.query)
          .then(response => {
            commit('app/UPDATE_LOAD', false, { root: true });
            resolve();
          })
          .catch(error => {
            commit('app/UPDATE_LOAD', false, { root: true });
            reject(error);
          });
      });
    },
  },
};

export default entriesModule;
