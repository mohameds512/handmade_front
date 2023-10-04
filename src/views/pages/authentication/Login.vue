<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <img src="../../../assets/images/logo/logo_one.png" class="vero-logo" />
        <!-- <vuexy-logo /> -->
        <div
          class="brand-text text-primary ml-1 nav navbar-nav flex-row d-flex align-items-center"
        >
          <div class="mx-1"></div>

          <h2 class="m-0 brand-text"></h2>
        </div>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        v-bind:style="{ backgroundImage: 'url(' + mainImage + ')' }"
        lg="8"
        class="d-none d-lg-flex align-items-center p-5 cover"
      >
     
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <!-- <b-img fluid :src="imgUrl" alt="Login V2" /> -->
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1 font-weight-bold" title-tag="h2">
            <div
              class="m-0 brand-text text-primary nav navbar-nav flex-row d-flex align-items-center"
            >
              <!-- <img src="flight.png" class="vero-logo"> -->
              <!--             <h4 class="m-0 brand-text"> Welcome to </h4>-->
              <!--              <div class="mx-1">-->
              <!--                <b-img width="30" height="30" fluid :src="appLogoImage" alt="logo" />-->
              <!--              </div>-->
              <br />
              <h2 class="m-0 brand-text">
                               {{ appName }}

                
              </h2>
             
          
            </div></b-card-title
          >
          <!--          <b-card-text class="mb-2"> Please sign-in to your account and start the adventure</b-card-text>-->

          <!-- form -->
          <validation-observer ref="loginForm" #default="{ invalid }">
            <b-form class="auth-login-form mt-2" @submit.prevent="login">
              <!-- email -->
              <b-form-group label="Email" label-for="login-email">
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="loginForm.email"
                    :state="errors.length > 0 ? false : null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <!-- <b-link :to="{ name: 'auth-forgot-password' }">
                                      <small>Forgot Password?</small>
                                    </b-link> -->
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="loginForm.password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <!-- <b-form-group>
                <b-form-checkbox id="remember-me" v-model="status" name="checkbox-1"> Remember Me </b-form-checkbox>
              </b-form-group> -->

              <!-- submit buttons -->
              <b-button
                :class="$store.state.app.load ? 'disabled_all' : ''"
                type="submit"
                variant="primary"
                block
                :disabled="invalid"
                ><span v-if="!$store.state.app.load">Sign in</span>
                <b-spinner
                  v-if="$store.state.app.load"
                  small
                  :label="$t('Global.loading')"
                ></b-spinner>
              </b-button>
            </b-form>
          </validation-observer>

          <!-- <div class="divider my-2">
            <div class="divider-text">or</div>
          </div>

          <div class="auth-footer-btn d-flex justify-content-center">
            <b-button variant="facebook" href="javascript:void(0)">
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button variant="twitter" href="javascript:void(0)">
              <feather-icon icon="TwitterIcon" />
            </b-button>
            <b-button variant="google" href="javascript:void(0)">
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button variant="github" href="javascript:void(0)">
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div> -->
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BSpinner,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
  VBTooltip,
} from "bootstrap-vue";
import useJwt from "@/auth/jwt/useJwt";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import { $themeConfig } from "@themeConfig";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  directives: {
    "b-tooltip": VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
    BSpinner,
  },
  mixins: [togglePasswordVisibility],
  setup() {
    const { appName, appLogoImage } = $themeConfig.app;
    return {
      appName,
      appLogoImage,
    };
  },
  data() {
    return {
      status: "",
      loginForm: {
        email: "vendor@antika.com",
        password: "AAA@aaa123",
      },
      sideImg: require("@/assets/images/pages/bg2.jpg"),
      mainImage: require("@/assets/images/logo/gft1.jpeg"),
      // validation rules
      required,
      email,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        this.sideImg = require("@/assets/images/pages/bg2.jpg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    login: function () {
      this.$refs.loginForm
        .validate()
        .then((success) => {
          if (success) {
            this.$store.dispatch("users/login", this.loginForm).then(() => {
              if (this.authUser().id) {
                this.$store
                  .dispatch(
                    "roles/getAuthUserRolesPermissions",
                    this.authUser().id
                  )
                  .then(() => {
                    // switch (this.authUser().type.type){
                    //   case 1:
                    //     this.$router.replace({ name: 'user-profile' });
                    //     break;
                    //   case 3:
                    //     this.$router.replace({ name: 'student_profile'});
                    //     break;
                    //   default:
                    //     this.$router.replace({ name: 'user-profile' });
                    //     break;
                    // }
                  });
              }
              this.$router.replace(getHomeRouteForLoggedInUser("admin"));
            });
          }
        })
        .catch((error) => {
          this.$refs.loginForm.setErrors(error.response.data.error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";

.vero-logo {
  height: 40px;
}
</style>
