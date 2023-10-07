import { login, logout, Register } from '../../../../api/system/auth'; // getInfo
import User from '../../../../api/hr/users/user';
import { Auth, removeAuth, deleteToken, removeToken, resetPermission, setLogged, setToken } from '../../../../utils/auth';

const user = new User();

const userModule = {
  namespaced: true,
  state: {
    auth: null,
    item: null,
    items: [],
    total: 0,
    load: false,
    userAccess:[]
  },
  getters: {
    items(state) {
      return state.items;
    },
    item(state) {
      return state.item;
    },
    load(state) {
      return state.load;
    },
    total(state) {
      return state.total;
    },
    status(state) {
      return state.item.removed;
    },
    lookups(state) {
      return state.lookups;
    },
    userAccess(state){
      return state.userAccess;
    }
  },
  mutations: {
    SET_AUTH: (state, user) => {
      state.auth = user;
    },
    SET_USERS: (state, users) => {
      state.items = users;
    },
    SET_TOTAL_USERS: (state, total) => {
      state.total = total;
    },
    SET_USERS_LOAD: (state, load) => {
      state.load = load;
    },
    SET_USER: (state, user) => {
      state.item = user;
    },
    SET_LOOKUPS(state, lookups) {
      state.lookups = lookups;
    },
    SET_USER_ACCESS(state,userAccess){
      state.userAccess=userAccess;
    }
  },
  actions: {
    createUser({ commit }) {
      return new Promise((resolve, reject) => {
        user.createUser()
          .then((response) => {
            console.log('roles')
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    saveUser({ commit },payload) {
      return new Promise((resolve, reject) => {
        user.saveUser(payload.id, payload.query)
          .then((response) => {
            console.log('roles')
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    login({ commit, dispatch }, userInfo) {
      const { email, password ,FCMuserToken} = userInfo;
      commit('app/UPDATE_LOAD', true, { root: true });
      return new Promise((resolve, reject) => {
        login({ email: email.trim(), password: password ,FCMuserToken:FCMuserToken})
          .then(response => {
            setLogged('1');
            setToken(response.data.token);
            Auth(JSON.stringify(response.data));
            commit('app/UPDATE_LOAD', false, { root: true });
            resolve();
          })
          .catch(error => {
            commit('app/UPDATE_LOAD', false, { root: true });
            reject(error);
          });
      });
    },
    logout({ commit },data) {
      return new Promise((resolve, reject) => {
        logout(data)
          .then(() => {
            setLogged('0');
            removeToken();
            deleteToken();
            removeAuth();
            resetPermission();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    users({ commit }, payload) {
      return new Promise((resolve, reject) => { 
        commit('SET_USERS_LOAD', true);
        user.list(payload.query).then(response => { 
          commit('SET_USERS', response.data.data);
          commit('SET_TOTAL_USERS', response.data.total);
          commit('SET_USERS_LOAD', false);
          commit('SET_LOOKUPS', response.lookups);
          resolve();
        });
      });
    },
    put({ commit }, payload) {
      commit('app/UPDATE_LOAD', true, { root: true });
      return new Promise((resolve, reject) => {
        user
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
    setAccessControl({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('SET_USERS_LOAD', true);
        user
          .setAccessControl(payload)
          .then(response => {
            commit('SET_USERS_LOAD', false);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    uploadPhoto({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('SET_USERS_LOAD', true);
        user
          .setPhoto(payload)
          .then(response => {
            commit('SET_PHOTO', response.data);
            commit('SET_USERS_LOAD', false);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    get({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit('SET_USERS_LOAD', true);
        user
          .get(id)
          .then(response => {
            console.log('response');
            console.log(response.data.user);
            commit('SET_USER', response.data.user);
            if ( response && response.data && typeof response.data == 'object') {
              commit('app/UPDATE_PAGE_DETAILS', response.data, {root: true});
            }
            commit('SET_USERS_LOAD', false);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    remove({ commit }, id) {
      return new Promise((resolve, reject) => {
        user
          .remove(id)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    restore({ commit }, id) {
      return new Promise((resolve, reject) => {
        user
          .restore(id)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    accessUser({ commit }, payload) {
      console.log('in module------------');
      console.log({payload})
      return new Promise((resolve, reject) => {
        user
          .addAccessUser(payload)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getUserAccess({commit},id) {
      commit('SET_USERS_LOAD', true);
      return new Promise((resolve, reject) => {
        user
          .getAccessUser(id)
          .then(response => {
            commit('SET_USER_ACCESS', response.data);
            
            resolve(response);
          })
          .catch(error => {
          
            reject(error);
            
          });
      });
    },
    resetUserAccess({commit},id) {
      return new Promise((resolve, reject) => {
        user
          .resetAccessUser(id)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    
  },
};

export default userModule;
