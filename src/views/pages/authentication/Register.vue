<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Register-->
      <b-col
        lg="12"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="6"
          class="px-xl-2 mx-auto"
        >
        
          <!-- form -->
          <validation-observer
            ref="registerForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-register-form mt-2"
              @submit.prevent="register"
            >
              <!-- username -->
              <b-form-group
                label="Username"
                label-for="register-username"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Username"
                  vid="username"
                  rules="required"
                >
                  <b-form-input
                    id="register-username"
                    v-model="username"
                    name="register-username"
                    :state="errors.length > 0 ? false:null"
                    placeholder="johndoe"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

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
                  <b-form-input disabled
                    id="register-email"
                    v-model="userEmail"
                    name="register-email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group
                label-for="register-password"
                label="Password"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false:null"
                      name="register-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group
                label-for="confirm-password"
                label="Password"
              >
                <validation-provider
                  #default="{ errors }"
                  name="confirm-Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="confirm-password"
                      v-model="confirmPassword"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="confirmPasswordState"
                      name="confirm-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              
              <b-button
                variant="primary"
                block
                type="submit"
                :disabled="invalid"
              >
                Sign up
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>Already have an account?</span>
            <b-link :to="{name:'auth-login'}">
              <span>&nbsp;Sign in instead</span>
            </b-link>
          </p>


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
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
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
      confirmPassword:'',
      status: '',
      username: '',
      userEmail: '',
      password: '',
      sideImg: require('@/assets/images/pages/register-v2.svg'),
      // validation
      required,
      email,
    }
  },
  computed: {
    isLoggedIn() {
      return this.authUser().id;
    },
    confirmPasswordState(){
        if (this.confirmPassword.length === 0) {
          return null;
        } else if (this.confirmPassword === this.password) {
          return true;
        } else {
          return false;
        }
      },
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/register-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    checkToken(){
      if (this.isLoggedIn == null) {
        let invData = {
        invitation_token:this.$route.params.invitation_token
      }
      
      this.$store.dispatch('bbx_forms/check_invitation_token', {
                query:invData,
            })
              .then((res) => {
                // console.log(res.data.email);
                this.userEmail=res.data.email
                
              })
              .catch((error)=>{
                console.log(error)
                this.$router.push({ name: 'error-404' });
              })
      
      }else{
        this.$router.push('/')
      }
      
    },
    register() {
      let userData = {
        name:this.username,
        email:this.userEmail,
        password:this.password,
      }
      // let loginForm = {
      //   email: "",
      //   password: "",
      // };
      this.$store.dispatch('bbx_forms/invRegister', {
                query:userData,
            })
              .then((response) => {
                this.$swal({
                      icon: 'success',
                      title: 'تم التسجيل بنجاح',
                      showConfirmButton: false,
                      timer: 1500,
                  })
                  
                // localStorage.setItem('token', response.data.token);
                // this.$router.push('/')
                useJwt.setToken(response.data.token)
                // useJwt.setRefreshToken(response.data.refreshToken)
                localStorage.setItem('userData', JSON.stringify(response.data.user))
                // this.$ability.update(response.data.userData.ability)
                this.$router.replace(getHomeRouteForLoggedInUser("admin"));
            
              })
              .catch((error)=>{
                console.log(error);
                // this.$swal({
                //       icon: 'error',
                //       title: 'حاول في وقت لاحق',
                //       showConfirmButton: false,
                //       timer: 1500,
                //   })
              })
        },
    
    // register() {
    //     this.$refs.registerForm.validate().then(success => {
    //       if (success) {
    //         useJwt.register({
    //           username: this.username,
    //           email: this.userEmail,
    //           password: this.password,
    //         })
    //           .then(response => {
    //             useJwt.setToken(response.data.accessToken)
    //             useJwt.setRefreshToken(response.data.refreshToken)
    //             localStorage.setItem('userData', JSON.stringify(response.data.userData))
    //             this.$ability.update(response.data.userData.ability)
    //             this.$router.push('/')
    //           })
    //           .catch(error => {
    //             this.$refs.registerForm.setErrors(error.response.data.error)
    //           })
    //       }
    //     })
    //   },
    },
    beforeMount() {
      this.checkToken()
    },
}

/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
