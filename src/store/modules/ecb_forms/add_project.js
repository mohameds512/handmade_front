import ecpProjects from '../../../api/ecb/ecb';

const ecb_forms = new ecpProjects() ; 

const locationModule = {
  namespaced: true,
  state: {
    projectList: null,
    listcontractors:null,
    listconsultants:null,
    listdivisions:null,
    id:0,
    gallery:null

  },
  getters: {
   
    listcontractors(state) {
      return state.listcontractors
    },
    listdivisions(state) {
      return state.listdivisions
    },
    listconsultants(state) {
      return state.listconsultants
    },
    prList(state) {
      return state.projectList
    },
    gallery(state)
    {
      return state.gallery
    },
    id(state) {
      return state.id;
    },
  },
  mutations: {
    SET_CONTRACTORS(state, contractors)
    {
      state.listcontractors = contractors

    },
    SET_GALLERY(state, gallery)
    {
      state.gallery = gallery
    },
    SET_DIVISIONS(state, divisions)
    {
      state.listdivisions = divisions

    },
    SET_CONSULTANTS(state, consultants)
    {
      state.listconsultants = consultants

    },
    SET_PROJECTS(state, projects) {
      state.projectList = projects
    },
    SET_ID: (state, id) => {
      state.id = id;
    },
  },
  actions: {

    listProjects({ commit },id) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .list(id)
          .then(response => {
            commit('SET_PROJECTS', response)
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  

    img({ commit },id) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .img(id)
          .then(response => {
            commit('SET_IMG', response)
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  




    viewImg({ commit },payload) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .viewImg(payload.id, payload.query)
          .then(response => {
            commit('SET_GALLERY', response)
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

  listcontractors({ commit },id) {
    return new Promise((resolve, reject) => {
      ecb_forms
        .listcontractors(id)
        .then(response => {
          commit('SET_CONTRACTORS', response)
          console.log(response)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  editProject({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .edit_project(payload.id, payload.query)
          .then(response => {
            commit('SET_PROJECTS', response)
            commit('SET_ID', response.project.id);
            console.log(response)
            console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    save_contractor({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_contractor(payload.id, payload.query)
          .then(response => {
            commit('SET_CONTRACTORS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    save_contract({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_contract(payload.id, payload.query)
          .then(response => {
            commit('SET_CONTRACTORS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    save_raw_material({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_raw_material(payload.id, payload.query)
          .then(response => {
            commit('SET_CONTRACTORS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },

 
    save_equipment({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_equipment(payload.id, payload.query)
          .then(response => {
            commit('SET_CONTRACTORS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },

  
    
    save_activity({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_activity(payload.id, payload.query)
          .then(response => {
            commit('SET_CONTRACTORS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    save_man_power_category({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_man_power_category(payload.id, payload.query)
          .then(response => {
            commit('SET_DIVISIONS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    save_man_power({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_man_power(payload.id, payload.query)
          .then(response => {
            commit('SET_DIVISIONS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    save_work_progress({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_work_progress(payload.id, payload.query)
          .then(response => {
            commit('SET_DIVISIONS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    save_earned_value({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_earned_value(payload.id, payload.query)
          .then(response => {
            commit('SET_DIVISIONS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    save_check_request({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_check_request(payload.id, payload.query)
          .then(response => {
            commit('SET_DIVISIONS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    save_operational_graphics({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_operational_graphics(payload.id, payload.query)
          .then(response => {
            commit('SET_DIVISIONS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    save_division({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_division(payload.id, payload.query)
          .then(response => {
            commit('SET_DIVISIONS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    save_equipment_productivity({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_equipment_productivity(payload.id, payload.query)
          .then(response => {
            commit('SET_DIVISIONS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },




    save_consultant({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_consultant(payload.id, payload.query)
          .then(response => {
            commit('SET_CONSULTANTS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    save_work_statement({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_work_statement(payload.id, payload.query)
          .then(response => {
            commit('SET_CONSULTANTS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    save_specialization({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_specialization(payload.id, payload.query)
          .then(response => {
            commit('SET_CONSULTANTS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    save_exports({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_exports(payload.id, payload.query)
          .then(response => {
            commit('SET_CONSULTANTS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    save_problems({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_problems(payload.id, payload.query)
          .then(response => {
            commit('SET_CONSULTANTS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    save_cash_flow({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_cash_flow(payload.id, payload.query)
          .then(response => {
            commit('SET_CONSULTANTS', response)
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    
    save_project_image({ commit },payload ) {
      return new Promise((resolve, reject) => {
        ecb_forms
          .save_project_image(payload.id, payload.query)
          .then(response => {
            commit('SET_CONSULTANTS', response)
      
         
            // commit('SET_ID', response.project.id);
            console.log(response)
            // console.log(response.project.id)
            resolve();
        
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // save_consultant({ commit },payload ) {
    //   return new Promise((resolve, reject) => {
    //     ecb_forms
    //       .save_consultant(payload.id, payload.query)
    //       .then(response => {
    //         commit('SET_CONTRACTORS', response)
    //         // commit('SET_ID', response.project.id);
    //         console.log(response)
    //         // console.log(response.project.id)
    //         resolve();
        
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },}


   
  
      // Edit Project
      // editProject({ commit }, payload) {
      //   return new Promise((resolve, reject) => {
      //     ecb_forms.edit_project(payload)
      //       .then(response => {
      //         commit('SET_PROJECTS', response)
      //         resolve(response);
              
      //       })
      //       .catch(error => {
      //         reject(error);
              
      //       });
      //   });
      // },}
}
}
export default locationModule;
