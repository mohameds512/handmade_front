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
             
              title="Aircraft Status"
              icon="feather icon-user"
            >
              <b-row>
                   <b-col md="6">
                  <b-form-group
                    label="Aircraft status"
                    label-for="aircraft_status"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="aircraft_status"
                      rules="required"
                    >
                      <b-form-input
                        :state="errors.length > 0 ? false : null"
                        id="aircraft_status"
                        v-model="form.name"
                        placeholder="status"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(errorsdata,'STATUS')
                        "
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>

                      <!-- <b-col md="6">
                     
                    <b-form-group
                
                    label="Aircraft status">
                      <validation-provider
                      #default="{ errors }"
                      name="STATUS"
                      rules="required"
                    >
                                <v-select
                        :disabled="type ? true : false"
                        :dir="
                          $store.state.appConfig.layout.isRTL ? 'rtl' : 'ltr'
                        "
                        :options="aircraft_status"
                        v-model="form.name"
                        :reduce="(val) => val.status"
                      >
                        <template v-slot:option="option">
                          {{ option.status }}
                        </template>
                        <template
                          #selected-option="{ status, name_local, label }"
                        >
                          <div style="display: flex; align-items: baseline">
                            <strong v-if="$i18n.locale == 'ar'">{{
                              name_local || label
                            }}</strong>
                            <strong v-else>{{ status || label }}</strong>
                          </div>
                        </template>
                        <template #no-options>
                          {{ $t("noMatching") }}
                        </template>
                      </v-select>
                                                          <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(errorsdata, 'STATUS')
                        "
                      /> 
                   </validation-provider>
                    </b-form-group>
                </b-col> -->

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
        aircraft_status:"aircraft_status/item",
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
             this.$store.dispatch('aircraft_status/get', this.id).then(_ => {
          console.log('juiuniuniun')
            this.form = this.aircraft_status;
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
              .dispatch("aircraft_status/put", { id: this.id, query: this.form })
              .then((_) => {
                this.$swal({
                  icon: "success",
                  title: this.$t("Global.Saved"),
                  showConfirmButton: false,
                  timer: 1500,
                });
  
  
                  this.$router.push({
                name: "aircraft_status",
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
  