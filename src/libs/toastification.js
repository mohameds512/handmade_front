import Vue from 'vue'
import Toast from 'vue-toastification'

// Toast Notification Component Styles
import '@core/scss/vue/libs/toastification.scss'

/**
 * NOTE: If you are using other transition them make sure to import it in `src/@core/scss/vue/libs/notification.scss` from it's source
 */
Vue.use(Toast, {
  // transition: 'Vue-Toastification__fade',


  timeout: 3000,
  position: 'top-right',
  draggable: true,
  hideProgressBar: false,
  closeOnClick: true,
  closeButton: true,
  pauseOnHover: true,
  transition: 'Vue-Toastification__bounce',
  icon: false,
  newestOnTop: true

})
