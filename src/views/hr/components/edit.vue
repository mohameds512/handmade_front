<template>
  <b-row>
    <b-col cols="12">
      <b-overlay
        variant="white"
        :show="load"
        spinner-variant="primary"
        blur="0"
        opacity=".75"
        rounded="sm"
      >
        <validation-observer ref="simpleForm">
          <form-wizard
            :title="null"
            :subtitle="null"
            shape="square"
            color="#054978"
            layout="vertical"
            :finish-button-text="$t('Global.submit')"
            stepSize="xs"
            @on-change="changeTab"
            :next-button-text="$t('Global.next')"
            :back-button-text="$t('Global.previous')"
            class="wizard-vertical mb-3"
            @on-complete="save"
          >
            <template #finish>
              <b-button
                variant="primary"
                size="lg"
                tabindex="-1"
                type="button"
                class="font-weight-lighter"
                style="background-color: rgb(115, 103, 240);
                  border-color: rgb(115, 103, 240);
                  color: white;
                "
              >
                {{ $t("Global.save") }}
              </b-button>
            </template>
            <tab-content
              :before-change="validateAsync"
              :title="$t('personal_info')"
              icon="feather icon-user"
            >
              <b-row>
                <b-col md="6">
                  <b-form-group
                    :label="$t('Global.english_name')"
                    label-for="name-input"
                    invalid-feedback="Name is required"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="name"
                      rules="english|required"
                    >
                      <b-form-input
                        @keypress="
                          sanitizeEnglish($event);
                          sanitizeNumber($event);
                        "
                        id="name-input"
                        v-model="form.name"
                        :state="errors.length > 0 ? false : null"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(errorsdata, 'name')
                        "
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group
                    :label="$t('Global.personal_email')"
                    label-for="vi-personal-email"
                  >
                    <validation-provider
                      #default="{ errors }"
                      rules="required|email"
                      name="email"
                    >
                      <b-form-input
                        :state="errors.length > 0 ? false : null"
                        id="vi-personal-email"
                        type="email"
                        v-model="form.email"
                        :placeholder="$t('Global.personal_email')"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="6" v-if="type == 2">
                  <b-form-group
                    :label="$t('Global.insurance_no')"
                    label-for="vi-insurance_no"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="insurance_no"
                    >
                      <b-form-input
                        @keypress="writeNumber($event)"
                        :state="errors.length > 0 ? false : null"
                        type="tel"
                        id="vi-insurance_no"
                        v-model="form.insurance_no"
                        :placeholder="$t('Global.insurance_no')"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </tab-content>

            
            <!-- social link -->
            <tab-content :title="$t('Global.contact')" icon="feather icon-link">
              <b-row v-if="contact">
                <b-col md="6" >
                  <b-form-group
                    :label="$t('Global.internal_phone')"
                    label-for="vi-internal_phone"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="internal_phone"
                    >
                      <b-form-input
                        @keypress="writeNumber($event)"
                        :state="errors.length > 0 ? false : null"
                        type="tel"
                        id="vi-internal_phone"
                        v-model="form.phone"
                        :placeholder="$t('Global.internal_phone')"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <!-- <b-col md="6">
                  <b-form-group
                    :label="$t('Global.role')"
                    label-for="role-input"
                    invalid-feedback="role is required"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="role"
                      rules="required"
                    >
                        <b-form-select v-model="form.role" :options="roles"></b-form-select>
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(errorsdata, 'role')
                        "
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col> -->
                
                <b-col md="6">
                  <b-form-group
                    :label="$t('Global.password')"
                    label-for="vi-password"
                    class="input-group-merge"
                  >
                    <validation-provider
                      #default="{ errors }"
                      rules="required|password"
                      name="department_id"
                    >
                      <b-form-input
                        :state="errors.length > 0 ? false : null"
                        id="vi-password"
                        :type="passwordFieldType"
                        v-model="form.password"
                        :placeholder="$t('Global.password')"
                      />
                      <!-- <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append> -->
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
                
                
              </b-row>
            </tab-content>

            
          </form-wizard>
        </validation-observer>
      </b-overlay>
      <!--            </b-card>-->
    </b-col>
  </b-row>
</template>

<script>

import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { FormWizard, TabContent } from "vue-form-wizard";
import VSelect from "vue-select";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { required, email, digits, length } from "@validations";
import {
  BRow,
  BCol,
  BOverlay,
  BCard,
  BFormGroup,
  BFormInput,
  BFormDatepicker,
  BFormTextarea,
  BInputGroupAppend,
  BFormSelect,
} from "bootstrap-vue";
import { localize, ValidationObserver, ValidationProvider } from "vee-validate";
import ValidationErrors from "@/views/components/common/ValidationErrors";
import { mapActions, mapGetters } from "vuex";
import vSelect from 'vue-select'

export default {
  components: {
    BFormSelect,
    BInputGroupAppend,
    FormWizard,
    BOverlay,
    TabContent,
    BRow,
    BFormDatepicker,
    BCol,
    BFormGroup,
    BCard,
    BFormInput,
    vSelect,
    BFormTextarea,
    ValidationProvider,
    ValidationObserver,
    localize,
    ValidationErrors,
  },
  mixins: [togglePasswordVisibility],
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    ...mapGetters({
      lookups: "app/lookups",
      user: "users/item",
      load: "users/load",
    }),
    id() {
      return this.$route.params && this.$route.params.id
        ? this.$route.params.id
        : null;
    },
    types() {
      return [
        { type: 1, label: this.$t("Global.instructor") },
        { type: 2, label: this.$t("Global.employee") },
        { type: 3, label: this.$t("Global.student") },
      ];
    },
    genders() {
      return [
        { id: 1, label: this.$t("Global.male") },
        { id: 2, label: this.$t("Global.female") },
      ];
    },
  },
  props: {
    type: null,
  },
  data() {
    return {
      roles:null,
      errors_data: {},
      errorsdata: {},
      academic_info: false,
      address: false,
      contact: false,
      form: {},
      query: {
        ranks: true,
        faculties: true,
        employee_types: true,
        faculty_departments: true,
      },
    };
  },

  mounted() {
    this.init();
    // this.allRoles();
  },
  watch: {
    "form.faculty_id"(val) {
      this.query.faculty_id = val;
      this.getLookups(this.query);
    },
    // 'form.phone'(val) {
    //     this.form.phone = val.toString().replace(/[^0-9]/g, '');
    // },
  },
  methods: {
    ...mapActions({
      getLookups: "app/GET_LOOKUPS",
      saveUser: "users/put",
    }),
    allRoles(){
      this.$store.dispatch('users/createUser')
              .then((res) => {
                console.log(res);
                console.log('res');
                this.roles=res.data                
              })
              .catch((error)=>{
                console.log(error)
              })
    },
    changeTab(pre, next) {
      if (next == 1) {
        this.academic_info = true;
      } else {
        this.academic_info = false;
      }
      if ((this.type == 1 && next == 2) || (this.type != 1 && next == 1)) {
        this.contact = true;
      } else {
        this.contact = false;
      }
      // if ((this.type == 1 && next == 3) || (this.type != 1 && next == 2)) {
      //   this.contact = true;
      // } else {
      //   this.contact = false;
      // }
    },

    validateAsync: function (index) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.$refs.simpleForm.validate().then((success) => {
            if (success) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        }, 1000);
      });
    },

    init() {
      // this.getLookups(this.query).then(_ => {
      this.form = { type: this.type };
      if (this.id) {
        this.$store.dispatch("users/get", this.id).then((_) => {
          if (this.user) {
            if (this.user.instructor_data) {
              this.form = { ...this.user, ...this.user.instructor_data };
            } else if (this.user.employee_data) {
              this.form = { ...this.user, ...this.user.employee_data };
            } else {
              this.form = this.user;
            }
            // this.form.name_local = this.user.name_local;
            // this.form.name = this.user.name;
            this.form.type = this.type;
          }
        });
      }
      // });
    },

    save() {
      // delete this.form.states;
      // delete this.form.status_type;
      this.$refs.simpleForm.validate().then((success) => {
        if (success) {
          this.$store
            .dispatch("users/put", { id: this.id, query: this.form })
            .then((_) => {
              this.$swal({
                icon: "success",
                title: this.$t("Global.Saved"),
                showConfirmButton: false,
                timer: 1500,
              });
              if (this.$route.params.id) {
                if (this.type == 1) {
                  this.$router.push({
                    name: "staff-show",
                    params: { id: this.$route.params.id },
                  });
                } else if (this.type == 2) {
                  this.$router.push({
                    name: "employee-show",
                    params: { id: this.$route.params.id },
                  });
                } else {
                  this.$router.push({
                    name: "user-show",
                    params: { id: this.$route.params.id },
                  });
                }
              } else {
                if (this.type == 1) {
                  this.$router.push({ name: "staff" });
                } else if (this.type == 2) {
                  this.$router.push({ name: "employees" });
                } else {
                  this.$router.push({ name: "users" });
                }
              }
            })
            .catch((error) => {
              this.errorsdata = this.handleBackendError(
                error.response.data.errors
              );
            });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-wizard.scss";
@import "@core/scss/vue/libs/vue-select.scss";

.wizard-btn,
.wizard-icon-container {
  background-color: #054978 !important;
  border-color: #054978 !important;
}

.stepTitle.active {
  color: #054978 !important;
}
</style>
