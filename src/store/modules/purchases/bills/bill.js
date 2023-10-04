import Bill from "@/api/purchases/bills/bill"; //////

const bills = new Bill();

const billsModule = {
  namespaced: true,
  state: {
    bill: null,
    bills: [],
    total: 0,
    load: false,
    load_products: false,
    helper_create:[],
  },
  getters: {
    // helper_create(state){
    //   return state.helper_create;
    // },
    bill(state) {
      return state.bill;
    },
    bills(state) {
      return state.bills;
    },
    total(state) {
      return state.total;
    },
    load(state) {
      return state.load;
    },
    load_products(state){
      return state.load_products;
    }
  },
  mutations: {
    SET_BILL: (state, bill) => {
      state.bill = bill;
    },
    SET_BILLS: (state, bills) => {
      state.bills = bills;
    },
    SET_TOTAL_BILLS: (state, total) => {
      state.total = total;
    },
    SET_BILLS_LOAD: (state, load) => {
      state.load = load;
    },
    SET_LOAD_PRODUCTS(state,load_products) {
      state.load_products = load_products;
    }
  },
  actions: {
    getProducts({ commit },payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD_PRODUCTS", true);
        bills.getProducts(payload)
          .then((response) => {
            commit("SET_LOAD_PRODUCTS", true);
            console.log(payload)
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    
    getVendor({ commit },payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD_PRODUCTS", true);
        bills.getVendor(payload)
          .then((response) => {
            commit("SET_LOAD_PRODUCTS", true);
            console.log(payload)
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    createBill({ commit },payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD_PRODUCTS", true);
        bills.createBill()
          .then((response) => {
            
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    saveBill({ commit }, payload) {
      return new Promise((resolve, reject) => {
        bills
          .saveBill(payload.query)
          .then((response) => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    items({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_BILLS_LOAD", true);
        bills.list(payload.query).then((response) => {
          commit("SET_BILLS", response.data);
          commit("SET_TOTAL_BILLS", response.meta.total);
          commit("SET_BILLS_LOAD", false);
          resolve();
        });
      });
    },
    put({ commit }, payload) {
      commit("app/UPDATE_LOAD", true, { root: true });
      return new Promise((resolve, reject) => {
        bills
          .put(payload.id, payload.query)
          .then((response) => {
            commit("app/UPDATE_LOAD", false, { root: true });
            resolve();
          })
          .catch((error) => {
            commit("app/UPDATE_LOAD", false, { root: true });
            reject(error);
          });
      });
    },
    get({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("SET_BILLS_LOAD", true);
        bills
          .get(id)
          .then((response) => {
            commit("SET_BILL", response.data);
            commit("SET_BILLS_LOAD", false);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    remove({ commit }, id) {
      return new Promise((resolve, reject) => {
        bills
          .remove(id)
          .then((response) => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default billsModule;
