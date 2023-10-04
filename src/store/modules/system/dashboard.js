import Dashboard from '../../../api/system/dashboard';

const dashboard = new Dashboard();

const locationModule = {
  namespaced: true,
  state: {
    activities: null,
    counts: null,
    payment: null,
    faculty: null,
    projectDetails: [],
  },
  getters: {
    counts(state) {
      return state.counts
    },
    faculty(state) {
      return state.faculty
    },
    payment(state) {
      return state.payment
    },
    activities(state) {
      return state.activities
    },
    getProjectDetails(state) {
      return state.projectDetails
    },

  },
  mutations: {
    SET_COUNTS(state, counts) {
      state.counts = counts
    },
    SET_FACULTY(state, faculty) {
      state.faculty = faculty
    },
    SET_ACTIVITIES(state, activities) {
      state.activities = activities
    },
    SET_PAYMENT(state, payment) {
      state.payment = payment
    },
    SET_PROJECT_DETAILS(state, details) {
      state.projectDetails = details
    },
  },
  actions: {

    counts({ commit }) {
      return new Promise((resolve, reject) => {
        dashboard.counts()
          .then(response => {
            commit('SET_COUNTS', response.data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    faculty({ commit }) {
      return new Promise((resolve, reject) => {
        dashboard.faculty()
            .then(response => {
              commit('SET_FACULTY', response.data);
              resolve();
            })
            .catch(error => {
              reject(error);
            });
      });
    },

    // Activities({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     dashboard.Activities()
    //       .then(response => {
    //         commit('SET_ACTIVITIES', response.data.activities_per_month);
    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },

    paymentPerMonth({ commit }) {
      return new Promise((resolve, reject) => {
        dashboard
          .paymentPerMonth()
          .then(response => {
            commit('SET_PAYMENT', response.data.payments_per_month);

            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  
    // Project Details
    generallyProjectDetails({ commit }, payload) {
      return new Promise((resolve, reject) => {
        dashboard.projectDetails(payload.id, payload.query)
          .then(response => {
            console.log(payload);
            commit('SET_PROJECT_DETAILS', response.data)
            console.log(response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
};

export default locationModule;
