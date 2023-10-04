import bbxProjects from '../../../api/bbx/bbx';

const bbx_forms = new bbxProjects() ; 

const locationModule = {
  namespaced: true,
  state: {
    Notifications :[]

  },
  getters: {
    get_notifications: state => {
      return state.Notifications
    },
  },
  mutations: {
    SET_NOTIFICATIONS(state, val) {
      state.Notifications = val
    },
  },
  actions: {

    sendInvitation({commit}, payload) {
        console.log(payload)
        console.log('payload')
        return new Promise((resolve, reject) => {
            bbx_forms
            .sendInvitation(payload.query)
            .then(response => {
              
              console.log(response)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      check_invitation_token({commit}, payload) {
        console.log(payload)
        console.log('payload')
        return new Promise((resolve, reject) => {
            bbx_forms
            .check_invitation_token(payload.query)
            .then(response => {
              
              console.log(response)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      invRegister({commit}, payload) {
        console.log(payload)
        console.log('payload')
        return new Promise((resolve, reject) => {
            bbx_forms
            .invRegister(payload.query)
            .then(response => {
              
              console.log(response)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }, 
      notifications({commit}) {
        
        return new Promise((resolve, reject) => {
            bbx_forms
            .notifications()
            .then(response => {
              commit('SET_NOTIFICATIONS',response.data)
              // console.log(response)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      markNotAsReaded({commit}) {
        
        return new Promise((resolve, reject) => {
            bbx_forms
            .markNotAsReaded()
            .then(response => {
              commit('SET_NOTIFICATIONS',response.data)
              // console.log(response)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
},


    
}
export default locationModule;
