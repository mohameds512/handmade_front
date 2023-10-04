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
                style="
                  background-color: rgb(115, 103, 240);
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
                    :label="$t('Global.name')"
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
                    :label="$t('Global.phone')"
                    label-for="phone-input"
                    invalid-feedback="phone is required"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="phone"
                      rules="required"
                    >
                      <b-form-input
                        id="phone-input"
                        type="number"
                        v-model="form.phone"
                        :state="errors.length > 0 ? false : null"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(errorsdata, 'phone')
                        "
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="12">
                  <b-form-group
                    :label="$t('Global.address')"
                    label-for="address-input"
                    invalid-feedback=""
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="address"
                      rules=""
                    >
                      <b-form-input
                        @keypress="
                          sanitizeEnglish($event);
                          sanitizeNumber($event);
                        "
                        id="address-input"
                        v-model="form.address"
                        :state="errors.length > 0 ? false : null"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(errorsdata, 'address')
                        "
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </tab-content>

            <!-- social link -->
            <tab-content
              :title="$t('hr.jop-details')"
              icon="feather briefcase-icon"
            >
              <b-row v-if="jopDetails">
                <b-col md="4">
                  <b-form-group
                    :label="$t('hr.joptitle')"
                    label-for="joptitle-input"
                    invalid-feedback="joptitle is required"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="joptitle"
                      rules="required"
                    >
                      <b-form-select
                        v-model="form.joptitle_id"
                        @change="changeJoptitle"
                      >
                        <b-form-select-option
                          v-for="joptitle in joptitles"
                          :value="joptitle.id"
                          >{{ joptitle.name }}</b-form-select-option
                        >
                      </b-form-select>
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(errorsdata, 'joptitle')
                        "
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group
                    :label="$t('hr.department')"
                    label-for="role-input"
                    invalid-feedback="department is required"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="department"
                      rules="required"
                    >
                      <b-form-select v-model="form.department_id">
                        <b-form-select-option
                          v-for="(id, department) in departments"
                          :value="id"
                          >{{ department }}</b-form-select-option
                        >
                      </b-form-select>
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(errorsdata, 'department')
                        "
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group
                    :label="$t('hr.status')"
                    label-for="role-input"
                    invalid-feedback="status is required"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="status"
                      rules="required"
                    >
                      <b-form-select v-model="form.status_id">
                        <b-form-select-option
                          v-for="(id, status) in statuses"
                          :value="id"
                          >{{ status }}</b-form-select-option
                        >
                      </b-form-select>
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(errorsdata, 'status')
                        "
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="4">
                  <b-form-group
                    :label="$t('hr.salary')"
                    label-for="salary-input"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="salary"
                      rules="number|required"
                    >
                      <b-form-input
                        @keypress="writeNumber($event)"
                        id="salary-input"
                        v-model="form.salary"
                        type="number"
                        :state="errors.length > 0 ? false : null"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(errorsdata, 'salary')
                        "
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group
                    :label="$t('hr.overtime')"
                    label-for="overtime-input"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="overtime"
                      rules="required"
                    >
                      <b-form-input
                        @keypress="writeNumber($event)"
                        id="overtime-input"
                        type="number"
                        v-model="form.overtime"
                        :state="errors.length > 0 ? false : null"
                      />
                      <ValidationErrors
                        default-message
                        :frontend-errors="errors"
                        :backend-errors="
                          getBackendFieldError(errorsdata, 'overtime')
                        "
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group
                    :label="$t('Global.joined_at')"
                    label-for="vi-joined_at"
                    invalid-feedback="Date is required"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="joined_at"
                      rules="required"
                    >
                      <b-form-datepicker
                        :state="errors.length > 0 ? false : null"
                        id="vi-joined_at"
                        v-model="form.joined_at"
                        :placeholder="$t('Global.joined_at')"
                      >
                        <ValidationErrors
                          default-message
                          :frontend-errors="errors"
                        />
                      </b-form-datepicker>
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
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
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
  BFormSelectOption,
} from "bootstrap-vue";
import { localize, ValidationObserver, ValidationProvider } from "vee-validate";
import ValidationErrors from "@/views/components/common/ValidationErrors";
import { mapActions, mapGetters } from "vuex";
import vSelect from "vue-select";

export default {
  components: {
    BFormSelect,
    BFormSelectOption,
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
    ...mapGetters({
      lookups: "app/lookups",
      employee: "employees/item",
      load: "employees/load",
    }),
    id() {
      return this.$route.params && this.$route.params.id
        ? this.$route.params.id
        : null;
    },
    types() {
      return [{ type: 4, label: this.$t("Global.employee") }];
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
      joptitles: [],
      departments: [],
      statuses: [],
      errors_data: {},
      errorsdata: {},
      jopDetails: 0,
      form: {
        name: null,
        phone: null,
        address: null,
        joptitle_id: null,
        department_id: null,
        status_id: null,
        salary: null,
        overtime: null,
        joined_at: null,
      },
      query: {
        user_id: true,
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
      saveEmployee: "employees/put",
    }),
    allRoles() {
      this.$store
        .dispatch("employees/createEmployee")
        .then((res) => {
          console.log(res);
          this.roles = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeTab(pre, next) {
      if (next == 1) {
        this.academic_info = true;
      } else {
        this.academic_info = false;
      }
      if ((this.type == 1 && next == 2) || (this.type != 1 && next == 1)) {
        this.jopDetails = true;
      } else {
        this.jopDetails = false;
      }
      // if ((this.type == 1 && next == 3) || (this.type != 1 && next == 2)) {
      //   this.contact = true;
      // } else {
      //   this.contact = false;
      // }
    },
    changeJoptitle() {
      let data = this.joptitles;
      let joptitle = data.filter((el) => el.id == this.form.joptitle_id)[0];
      // console.log(joptitle.salary);
      // this.$emit('update:checked', !this.checked)
      if (joptitle) {
        this.form.salary = joptitle.salary;
        this.form.overtime = joptitle.overtime;
        this.$forceUpdate();

      // this.$forceUpdate();
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
      // this.getLookups(this.query).then(_ => {

      this.$store.dispatch("employees/createEmployee").then((res) => {
        this.joptitles = res.data.joptitles;
        this.departments = res.data.departments;
        this.statuses = res.data.statuses;
      });

      this.form = { type: this.type };
      if (this.id) {
        this.$store.dispatch("employees/get", this.id).then((_) => {
          if (this.employee) {
            if (this.employee.instructor_data) {
              this.form = {
                ...this.employee,
                ...this.employee.instructor_data,
              };
            } else if (this.employee.employee_data) {
              this.form = { ...this.employee, ...this.employee.employee_data };
            } else {
              this.form = this.employee;
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
            .dispatch("employees/saveEmployee", {
              id: this.id,
              query: this.form,
            })
            .then((_) => {
              this.$swal({
                icon: "success",
                title: this.$t("Global.Saved"),
                showConfirmButton: false,
                timer: 1500,
              });
              if (this.$route.params.id) {
                this.$router.push({
                  name: "employee-show",
                  params: { id: this.$route.params.id },
                });
              } else {
                this.$router.push({ name: "employees" });
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
