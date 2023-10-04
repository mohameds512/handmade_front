import Employee from '../../../../api/hr/employees/employee';
import { Auth, removeAuth, deleteToken, removeToken, resetPermission, setLogged, setToken } from '../../../../utils/auth';

const employee = new Employee();

const employeeModule = {
  namespaced: true,
  state: {
    Employee: null,
    item: null,
    items: [],
    total: 0,
    load: false,
    employeeAccess:[]
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
  },
  mutations: {
    SET_EMPLOYEE: (state, employee) => {
      state.item = employee;
    },
    SET_EMPLOYEES: (state, employees) => {
      state.items = employees;
    },
    SET_TOTAL_EMPLOYEES: (state, total) => {
      state.total = total;
    },
    SET_EMPLOYEES_LOAD: (state, load) => {
      state.load = load;
    },
    SET_LOOKUPS(state, lookups) {
      state.lookups = lookups;
    },
  },
  actions: {
    createEmployee({ commit }) {
      return new Promise((resolve, reject) => {
        employee.createEmployee()
          .then((response) => {
            console.log('roles')
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    saveEmployee({ commit },payload) {
      return new Promise((resolve, reject) => {
        employee.saveEmployee(payload.id, payload.query)
          .then((response) => {
            console.log('roles')
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    employees({ commit }, payload) {
      return new Promise((resolve, reject) => { 
        commit('SET_EMPLOYEES_LOAD', true);
        employee.list(payload.query).then(response => {
          commit('SET_EMPLOYEES', response.data);
          commit('SET_TOTAL_EMPLOYEES', response.meta.total);
          commit('SET_EMPLOYEES_LOAD', false);
          commit('SET_LOOKUPS', response.lookups);
          resolve();
        });
      });
    },
    put({ commit }, payload) {
      commit('app/UPDATE_LOAD', true, { root: true });
      return new Promise((resolve, reject) => {
        employee
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
        commit('SET_EMPLOYEES_LOAD', true);
        employee
          .setAccessControl(payload)
          .then(response => {
            commit('SET_EMPLOYEES_LOAD', false);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    get({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit('SET_EMPLOYEES_LOAD', true);
        employee
          .getEmployee(id)
          .then(response => {
            commit('SET_EMPLOYEE', response.data);
            if ( response && response.data && typeof response.data == 'object') {
              commit('app/UPDATE_PAGE_DETAILS', response.data, {root: true});
            }
            commit('SET_EMPLOYEES_LOAD', false);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    remove({ commit }, id) {
      return new Promise((resolve, reject) => {
        employee
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
        employee
          .restore(id)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    accessEmployee({ commit }, payload) {
      console.log('in module------------');
      console.log({payload})
      return new Promise((resolve, reject) => {
        employee
          .addAccessEmployee(payload)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getEmployeeAccess({commit},id) {
      commit('SET_EMPLOYEES_LOAD', true);
      return new Promise((resolve, reject) => {
        employee
          .getAccessEmployee(id)
          .then(response => {
            commit('SET_EMPLOYEES_ACCESS', response.data);
            
            resolve(response);
          })
          .catch(error => {
          
            reject(error);
            
          });
      });
    },
    resetEmployeeAccess({commit},id) {
      return new Promise((resolve, reject) => {
        employee
          .resetEmployeeAccess(id)
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

export default employeeModule;
