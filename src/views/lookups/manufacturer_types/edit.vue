<template>

    <b-row>
      <b-col>
   
      </b-col>
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
  
            <b-form
            >
              <template #finish>
                <b-button
                  variant="primary"
                  size="lg"
                  tabindex="-1"
                  type="button"
                  class="font-weight-lighter"
                  style="
                    background-color: rgb(115, 103, 240);
                    border-color: rgb(115, 103, 240);
                    color: white;
                  "
                >
                  {{ $t("Global.save") }}
                </b-button>
                 <!----------------------------change title , labels & inputs----------------------- -->
                </template>
            <b-card
              :before-change="validateAsync"
             
              title="Manufacturer Types"
              icon="feather icon-user"
            >
            <b-row>
                  
                  <b-col md="6">
                    <b-form-group
                      label="Type"
                      label-for="Type-input"
                      invalid-feedback="required"
                    >
                    
                         <validation-provider
                      #default="{ errors }"
                      name="name"
                      rules="required"
                    >
                        <b-form-input
                          @keypress="
                            sanitizeEnglish($event);
                            
                          "
                          id="Type-input"
                          v-model="form.name"
                     
                        />
                     
                             <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                      />
                    </validation-provider>
           
                    </b-form-group>
                  </b-col>

         <!-- ////////////////////////////////////////////// -->
              </b-row>
                <b-row>
                               <b-col>
                <b-button
                  variant="primary"
                  size="lg"
               @click="save"
                  type="button"
                  class="font-weight-lighter mt-3"
                  style="
                    background-color: rgb(115, 103, 240);
                    border-color: rgb(115, 103, 240);
                    color: white;
                  "
                >
                  {{ $t("Global.save") }}
                </b-button>
                 <!----------------------------change title , labels & inputs----------------------- -->
                     </b-col>
                </b-row>
            </b-card>

            <!-- address -->
            <!-- <tab-content
              :before-change="validateAsync"
              :title="$t('Global.address')"
              icon="feather icon-map-pin"
            >
              <b-row v-if="address">
                <b-col md="6">
                  <b-form-group
                    :label="$t('Global.address')"
                    label-for="vi-address"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="address"
                      rules="required|address"
                    >
                      <b-form-input
                        :state="errors.length > 0 ? false : null"
                        id="vi-address"
                        v-model="form.address"
                        :placeholder="$t('Global.address')"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(errorsdata, $t('Global.address'))
                        "
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group
                    :label="$t('Global.postal_code')"
                    label-for="vi-postal-code"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="postal_code"
                      rules="postal|required"
                    >
                      <b-form-input
                        :state="errors.length > 0 ? false : null"
                        id="vi-postal-code"
                        :placeholder="$t('Global.postal_code')"
                        v-model="form.postal_code"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(
                            errorsdata,
                            $t('Global.postal_code')
                          )
                        "
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </tab-content> -->

            <!-- academic -->

            <!-- social link -->
            <!-- <tab-content :title="$t('Global.contact')" icon="feather icon-link">
              <b-row v-if="contact">
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
                        v-model="form.personal_email"
                        :placeholder="$t('Global.personal_email')"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group :label="$t('email')" label-for="vi-email">
                    <validation-provider
                      #default="{ errors }"
                      rules="required|email"
                      name="email"
                    >
                      <b-form-input
                        :state="errors.length > 0 ? false : null"
                        id="vi-email"
                        type="email"
                        v-model="form.email"
                        placeholder="john.doe@email.com"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group
                    :label="$t('Global.mobile')"
                    label-for="vi-mobile"
                  >
                    <validation-provider
                      #default="{ errors }"
                      rules="required|mobile"
                      name="department_id"
                    >
                      <b-form-input
                        :state="errors.length > 0 ? false : null"
                        id="vi-mobile"
                        v-model="form.mobile"
                        :placeholder="$t('Global.mobile')"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group
                    :label="$t('Global.phone')"
                    label-for="vi-phone"
                  >
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                      name="phone"
                    >
                      <b-form-input
                        @keypress="writeNumber($event)"
                        :state="errors.length > 0 ? false : null"
                        type="tel"
                        id="vi-phone"
                        v-model="form.phone"
                        :placeholder="$t('Global.phone')"
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
                        v-model="form.internal_phone"
                        :placeholder="$t('Global.internal_phone')"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </tab-content> -->
            </b-form>
        </validation-observer>
      </b-overlay>
      <!--            </b-card>-->
    </b-col>
  </b-row>
</template>

  
  <script>
  import { FormWizard, TabContent } from "vue-form-wizard";
  import vSelect from "vue-select";
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
    BFormTimepicker
  } from "bootstrap-vue";
  import { localize, ValidationObserver, ValidationProvider } from "vee-validate";
  import ValidationErrors from "@/views/components/common/ValidationErrors";
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    components: {
      FormWizard,
      BOverlay,
      TabContent,
      BRow,
      BFormDatepicker,
      BFormTimepicker,
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
    computed: {
      ...mapGetters({
        lookups: "app/lookups",
        user: "users/item",
        manufacturer_types:"manufacturer_types/item",
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
      operatorTypes()
      {
          let operators = this.$store.getters['aircraft/items']
          console.log('hhhh');
          console.log(operators);
          return operators
      },
         airport()
      {
          let airport = this.$store.getters['airport/items']
         
          return airport
      },
      flights()
      {
          let flights = this.$store.getters['flights/items']
         
          return flights
      },
      aircraft_status()
      {
       return [
          { id: 1, status: "active" },
          { id: 0, status: "inactive"},
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
      this.refresh();
      this.init();
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
        saveAirCraft : "aircrafts/put",
      }),
      changeTab(pre, next) {
        if (next == 1) {
          this.academic_info = true;
        } else {
          this.academic_info = false;
        }
        if ((this.type == 1 && next == 2) || (this.type != 1 && next == 1)) {
          this.address = true;
        } else {
          this.address = false;
        }
        if ((this.type == 1 && next == 3) || (this.type != 1 && next == 2)) {
          this.contact = true;
        } else {
          this.contact = false;
        }
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
       
       console.log(this.id);

        if (this.id) {
             this.$store.dispatch('manufacturer_types/get', this.id).then(_ => {
          console.log('juiuniuniun')
            this.form = this.manufacturer_types;
            console.log(this.form)
          
                      });
         }
            
      
      },
         refresh(query) {
        //   query = { ...query, type: this.type };
        this.$store.dispatch("airport/items", { query: query });
     
      },
  
      save() {
          console.log(this.form);
        // delete this.form.states;
        // delete this.form.status_type;
        this.$refs.simpleForm.validate().then((success) => {
           if (success) {
            this.$store
              .dispatch("manufacturer_types/put", { id: this.id, query: this.form })
              .then((_) => {
                this.$swal({
                  icon: "success",
                  title: this.$t("Global.Saved"),
                  showConfirmButton: false,
                  timer: 1500,
                });
  
  
                  this.$router.push({
                name: "manufacturer_types",
              //   params: { id: this.$route.params.id },
              });
          // if (this.$route.params.id) {
          //   if (this.type == 1) {
          //     this.$router.push({
          //       name: "staff-show",
          //       params: { id: this.$route.params.id },
          //     });
          //   } else if (this.type == 2) {
          //     this.$router.push({
          //       name: "employee-show",
          //       params: { id: this.$route.params.id },
          //     });
          //   } else {
          //     this.$router.push({
          //       name: "user-show",
          //       params: { id: this.$route.params.id },
          //     });
          //   }
          // } else {
          //   if (this.type == 1) {
          //     this.$router.push({ name: "staff" });
          //   } else if (this.type == 2) {
          //     this.$router.push({ name: "employees" });
          //   } else {
          //     this.$router.push({ name: "users" });
          //   }
          // }
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
  