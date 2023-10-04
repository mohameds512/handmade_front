<template>
    <div class="auth-wrapper auth-v2">
      <b-row class="auth-inner m-0">
  
        
        <!-- Register-->
        <b-col
          cols="12"
          class="d-flex align-items-center auth-bg px-2 p-lg-5"
        >
          <b-col
            sm="8"
            md="6"
            lg="8"
            class="px-xl-2 mx-auto"
          >
          <h1 class="text-center">{{ $t('msg.send-invitation') }}</h1>
            <!-- form -->
            <validation-observer
              ref="registerForm"
              #default="{invalid}"
            >
              <b-form
                class="auth-register-form mt-2"
                @submit.prevent="register"
              >
                
                <!-- email -->
                <b-form-group
                  label="Email"
                  label-for="register-email"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Email"
                    vid="email"
                    rules="required|email"
                  >
                    <b-form-input
                      id="register-email"
                      v-model="userData.email"
                      name="register-email"
                      :state="errors.length > 0 ? false:null"
                      placeholder="john@example.com"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>


  
                <b-button
                  variant="primary"
                  block
                  
                  :disabled="invalid"
                  @click="sendInvitation"
                >
                  send
                </b-button>
              </b-form>
            </validation-observer>
  
            
  
            
          </b-col>
        </b-col>
      <!-- /Register-->
      </b-row>
    </div>
  </template>
  
  <script>
  /* eslint-disable global-require */
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import VuexyLogo from '@core/layouts/components/Logo.vue'
  import {
    BRow, BCol, BLink, BButton, BForm, BFormCheckbox, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BImg, BCardTitle, BCardText,
  } from 'bootstrap-vue'
  import { required, email } from '@validations'
  import { togglePasswordVisibility } from '@core/mixins/ui/forms'
  import store from '@/store/index'
  import useJwt from '@/auth/jwt/useJwt'
  
  export default {
    components: {
      VuexyLogo,
      BRow,
      BImg,
      BCol,
      BLink,
      BButton,
      BForm,
      BCardText,
      BCardTitle,
      BFormCheckbox,
      BFormGroup,
      BFormInput,
      BInputGroup,
      BInputGroupAppend,
      // validations
      ValidationProvider,
      ValidationObserver,
    },
    mixins: [togglePasswordVisibility],
    data() {
      return {
        userData:{
          email: '',
        },
        
        
        required,
        email,
      }
    },
    computed: {
      passwordToggleIcon() {
        return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
      },
    },
    methods: {
      sendInvitation() {
        console.log(this.userData)
        console.log('test')
        if (this.userData.email != null) {
          this.$store.dispatch('bbx_forms/sendInvitation', {
                query:this.userData,
            })
              .then((res) => {
                this.userData.email = null;
                  this.$swal({
                      icon: 'success',
                      title: 'تم أرسال الدعوة',
                      showConfirmButton: false,
                      timer: 1500,
                  })
              })
              .catch((error)=>{
                console.log(error);
                this.$swal({
                      icon: 'error',
                      title: 'حاول في وقت لاحق',
                      showConfirmButton: false,
                      timer: 1500,
                  })
              }
              )
        }
      },
    },
  }
  /* eslint-disable global-require */
  </script>
  
  <style lang="scss">
  @import '@core/scss/vue/pages/page-auth.scss';
  
  </style>
  