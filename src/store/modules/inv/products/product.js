import Product from "@/api/inv/products/product"; //////


 const products = new Product();

const productsModule = {
  namespaced: true,
  state: {
    product: null,
    products: [],
    total: 0,
    load: false,
  },
  getters: {
    product(state) {
      return state.product;
    },
    products(state) {
      return state.products;
    },
    total(state) {
      return state.total;
    },
    load(state) {
      return state.load;
    },
  },
  mutations: {
 
    SET_PRODUCT: (state, product) => {
      state.product = product;
    },
    SET_PRODUCTS: (state, products) => {
        state.products = products;
      },
    SET_TOTAL_PRODUCTS: (state, total) => {
        state.total = total;
      },
  
      SET_PRODUCTS_LOAD: (state, load) => {
        state.load = load;
      },
  },
  actions: {
    
    getCategories({commit}, id) {
      return new Promise((resolve, reject) => {
          // commit('SET_PRODUCTS_LOAD', true);
          products.getCategories(id)
              .then(response => {
                  
                  // commit('SET_PRODUCTS', response.data);
                  // commit('SET_PRODUCTS_LOAD', false);
                  resolve(response);
              })
              .catch(error => {
                  reject(error);
              });
      });
  },
  
  getProducts({commit}, id) {
    return new Promise((resolve, reject) => {
      
        products.getProducts(id)
            .then(response => {
                
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
},
getArchivedProducts({commit}, id) {
  return new Promise((resolve, reject) => {
    
      products.getArchivedProducts(id)
          .then(response => {
              
              resolve(response);
          })
          .catch(error => {
              reject(error);
          });
  });
},
getOrderedItems({commit}, id) {
  return new Promise((resolve, reject) => {
    
      products.getOrderedItems(id)
          .then(response => {
              
              resolve(response);
          })
          .catch(error => {
              reject(error);
          });
  });
},
  addCategory({ commit },payload) {
    return new Promise((resolve, reject) => {
      products.addCategory(payload.id, payload.query)
        .then((response) => {
          
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addProduct({ commit },payload) {
    return new Promise((resolve, reject) => {
      products.addProduct(payload.id, payload.query)
        .then((response) => {
          
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  deleteProduct({ commit },payload) {
    return new Promise((resolve, reject) => {
      products.deleteProduct(payload.id)
        .then((response) => {
          
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  restoreProduct({ commit },payload) {
    return new Promise((resolve, reject) => {
      products.restoreProduct(payload.id)
        .then((response) => {
          
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  approveOrderedItems({ commit },payload) {
    return new Promise((resolve, reject) => {
      products.approveOrderedItems(payload.query)
        .then((response) => {
          
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

    items({commit}, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_PRODUCTS_LOAD', true);
            products.list(payload.query).then(response => {
                commit('SET_PRODUCTS', response.data);
                commit('SET_TOTAL_PRODUCTS', response.meta.total);
                commit('SET_PRODUCTS_LOAD', false);
                resolve();
            });
        });
    },
    put({commit}, payload) {
        commit('app/UPDATE_LOAD', true, {root: true});
        return new Promise((resolve, reject) => {
            products
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
            commit('SET_PRODUCTS_LOAD', true);
            products.get(id)
                .then(response => {
                    commit('SET_PRODUCTS', response.data);
                    commit('SET_PRODUCTS_LOAD', false);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    remove({ commit }, id) {
      return new Promise((resolve, reject) => {
        products
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

export default productsModule;
