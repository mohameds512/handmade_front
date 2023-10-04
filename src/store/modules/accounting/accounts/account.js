import Account from '@/api/accounting/accounts/account';

const accounts = new Account() ; 

const accountsModule = {
  namespaced: true,
  state: {
    

  },
  getters: {
   
  },
  mutations: {
    
  },
  actions: {

    getTree({ commit },id) {
      return new Promise((resolve, reject) => {
        accounts
          .getTree(id)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  

}
}
export default accountsModule;
