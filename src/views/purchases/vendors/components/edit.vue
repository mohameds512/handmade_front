<template>
    <b-row>
        <b-col cols="12">
            <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75" rounded="sm">
                <validation-observer ref="simpleForm">
                    <form-wizard :title="null" :subtitle="null" shape="square" color="#054978" layout="vertical"
                        :finish-button-text="$t('Global.submit')" stepSize="xs" @on-change="changeTab"
                        :next-button-text="$t('Global.next')" :back-button-text="$t('Global.previous')"
                        class="wizard-vertical mb-3" @on-complete="save">
                        <template #finish>
                            <b-button variant="primary" size="lg" tabindex="-1" type="button" class="font-weight-lighter"
                                style="
                    background-color: rgb(115, 103, 240);
                    border-color: rgb(115, 103, 240);
                    color: white;
                  ">
                                {{ $t("Global.save") }}
                            </b-button>
                        </template>
                        <tab-content :before-change="validateAsync" :title="$t('pur.vendor-details')"
                            icon="feather icon-user">
                            <b-row>
                                <b-col md="4">
                                    <b-form-group :label="$t('pur.business_name')" label-for="business_name-input"
                                        invalid-feedback="Business Name is required">
                                        <validation-provider #default="{ errors }" name="business_name" rules="required">
                                            <b-form-input @keypress="sanitizeNumber($event);
                                                                      " id="name-input" v-model="form.business_name" :state="errors.length > 0 ? false : null" />
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'business_name')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4">
                                    <b-form-group :label=" $t('pur.first_name') " label-for="first_name-input"
                                        invalid-feedback="First Name is required">
                                        <validation-provider #default=" { errors } " name="first_name" rules="required">
                                            <b-form-input @keypress="
                                                sanitizeNumber($event);
                                            " id="name-input" v-model=" form.first_name " :state=" errors.length > 0 ? false : null " />
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'first_name')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4">
                                    <b-form-group :label=" $t('pur.last_name') " label-for="name-input"
                                        invalid-feedback="Last Name is required">
                                        <validation-provider #default=" { errors } " name="last_name">
                                            <b-form-input @keypress="
                                                sanitizeNumber($event);
                                            " id="name-input" v-model=" form.last_name " :state=" errors.length > 0 ? false : null " />
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'last_name')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>

                                <b-col md="4">
                                    <b-form-group :label=" $t('Global.phone') " label-for="phone-input"
                                        invalid-feedback="phone is required">
                                        <validation-provider #default=" { errors } " name="phone" rules="required">
                                            <b-form-input id="phone-input" type="number" v-model=" form.phone "
                                                :state=" errors.length > 0 ? false : null " />
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'phone')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4">
                                    <b-form-group :label=" $t('Global.telephone') " label-for="telephone-input"
                                        invalid-feedback="telephone is required">
                                        <validation-provider #default=" { errors } " name="telephone" rules="required">
                                            <b-form-input id="telephone-input" type="number" v-model=" form.telephone "
                                                :state=" errors.length > 0 ? false : null " />
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'telephone')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4">
                                    <b-form-group :label=" $t('Global.code') " label-for="code-input"
                                        invalid-feedback="code is required">
                                        <validation-provider #default=" { errors } " name="code" rules="required">
                                            <b-form-input id="code-input" type="number" v-model=" form.code "
                                                :state=" errors.length > 0 ? false : null " />
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'telephone')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>

                                <b-col md="4">
                                    <b-form-group :label=" $t('Global.country') " label-for="country-input"
                                        invalid-feedback="country is required">
                                        <validation-provider #default=" { errors } " name="country" rules="required">
                                            <b-form-select v-model=" form.country_id " @change="changeCountry">
                                                <b-form-select-option v-for=" country  in  countries " :value=" country.id ">{{
                                                    country.name }}</b-form-select-option>
                                            </b-form-select>
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'country')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>

                                <b-col md="4">
                                    <b-form-group :label=" $t('Global.state') " label-for="state-input"
                                        invalid-feedback="state is required">
                                        <validation-provider #default=" { errors } " name="state" rules="">
                                            <b-form-select v-model=" form.state_id " >
                                               
                                                <b-form-select-option v-if="states.length == 0" :value="null" >{ $t('Global.select-country-first') }</b-form-select-option>
                                                <b-form-select-option v-else   :value="null">{ $t('Global.select-state') }</b-form-select-option>
                                                <b-form-select-option v-for=" state  in  states " :value=" state.id ">{{
                                                    state.name }}</b-form-select-option>
                                            </b-form-select>
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'joptitle')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4">
                                    <b-form-group :label=" $t('Global.city') " label-for="city-input"
                                        invalid-feedback="city is required">
                                        <validation-provider #default=" { errors } " name="city" rules="">
                                            <b-form-input id="city-input" type="text" v-model=" form.city "
                                                :state=" errors.length > 0 ? false : null " />
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'city')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col md="12">
                                    <b-form-group :label=" $t('Global.address') " label-for="address-input"
                                        invalid-feedback="">
                                        <validation-provider #default=" { errors } " name="address" rules="">
                                            <b-form-input @keypress="
                                                sanitizeEnglish($event);
                                                sanitizeNumber($event);
                                            " id="address-input" v-model=" form.address " :state=" errors.length > 0 ? false : null " />
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'address')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4">
                                    <b-form-group :label=" $t('Global.email') " label-for="email-input"
                                        invalid-feedback="email is required">
                                        <validation-provider #default=" { errors } " name="email" rules="email">
                                            <b-form-input id="email-input" type="text" v-model=" form.email "
                                                :state=" errors.length > 0 ? false : null " />
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'email')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4">
                                    <b-form-group :label=" $t('Global.cr') " label-for="cr-input"
                                        invalid-feedback="cr is required">
                                        <validation-provider #default=" { errors } " name="cr" rules="">
                                            <b-form-input id="cr-input" type="text" v-model=" form.cr "
                                                :state=" errors.length > 0 ? false : null " />
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'cr')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col md="4">
                                    <b-form-group :label=" $t('Global.tax_number') " label-for="tax-input"
                                        invalid-feedback="tax is required">
                                        <validation-provider #default=" { errors } " name="tax" rules="">
                                            <b-form-input id="tax-input" type="text" v-model=" form.tax_number "
                                                :state=" errors.length > 0 ? false : null " />
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'tax_number')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </tab-content>

                        <!-- social link -->
                        <tab-content :title=" $t('acc.account-details') " icon="feather briefcase-icon">
                            <b-row v-if=" accountDetails ">
                                <b-col md="4">
                                    <b-form-group :label=" $t('acc.currency') " label-for="currency-input"
                                        invalid-feedback="currency is required">
                                        <validation-provider #default=" { errors } " name="currency" rules="required">
                                            <b-form-select v-model=" form.currency_id " >
                                                <b-form-select-option v-for=" currency  in  currencies " :value=" currency.id ">{{
                                                   ` ${currency.name} (${currency.code}) `}}</b-form-select-option>
                                            </b-form-select>
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'currency')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>

                                <b-col md="4">
                                    <b-form-group :label=" $t('acc.opening_balance') " label-for="opening_balance-input">
                                        <validation-provider #default=" { errors } " name="opening_balance" rules="number|required">
                                            <b-form-input @keypress=" writeNumber($event) " id="opening_balance-input"
                                                v-model=" form.opening_balance " type="number"
                                                :state=" errors.length > 0 ? false : null " />
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'opening_balance')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>

                                <b-col md="4">
                                    <b-form-group :label=" $t('acc.opening_balance_date') " label-for="opening_balance_date-input">
                                        <validation-provider #default=" { errors } " name="opening_balance_date" rules="required">
                                            <b-form-datepicker :state=" errors.length > 0 ? false : null " id="opening_balance_date-input"
                                                v-model=" form.opening_balance_date " :placeholder=" $t('acc.opening_balance_date') ">
                                                <ValidationErrors default-message :frontend-errors=" errors " />
                                            </b-form-datepicker>
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'opening_balance_date')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>

                                <!-- <b-col md="4">
                                    <b-form-group :label=" $t('hr.status') " label-for="role-input"
                                        invalid-feedback="status is required">
                                        <validation-provider #default=" { errors } " name="status" rules="required">
                                            <b-form-select v-model=" form.status_id ">
                                                <b-form-select-option v-for="( id, status ) in  statuses " :value=" id ">{{ status
                                                    }}</b-form-select-option>
                                            </b-form-select>
                                            <ValidationErrors default-message :frontend-errors=" errors " :backend-errors="
                                                getBackendFieldError(errorsdata, 'status')
                                            " />
                                        </validation-provider>
                                    </b-form-group>
                                </b-col> -->
                            </b-row>
                        </tab-content>
                    </form-wizard>
                </validation-observer>
            </b-overlay>
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
            vendor: "vendors/vendor",
            load: "vendors/load",
        }),
        id() {
            return this.$route.params && this.$route.params.id
                ? this.$route.params.id
                : null;
        },
    },
    data() {
        return {
            countries: [],
            states: [],
            statuses: [],
            errors_data: {},
            errorsdata: {},
            accountDetails: 0,
            form: {
                business_name: null,
                first_name: null,
                last_name: null,
                phone: null,
                telephone: null,
                code: null,
                country_id: null,
                state_id: null,
                city: null,
                address: null,
                email: null,
                active: null,
                cr: null,
                tax_number: null,
                opening_balance : null,
                opening_balance_date : null
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
        // 'form.phone'(val) {
        //     this.form.phone = val.toString().replace(/[^0-9]/g, '');
        // },
    },
    methods: {
        ...mapActions({
            getLookups: "app/GET_LOOKUPS",
            saveVendor: "vendors/put",
        }),
        changeTab(pre, next) {
            if (next == 1) {
                this.academic_info = true;
            } else {
                this.academic_info = false;
            }
            if ((this.type == 1 && next == 2) || (this.type != 1 && next == 1)) {
                this.accountDetails = true;
            } else {
                this.accountDetails = false;
            }
            // if ((this.type == 1 && next == 3) || (this.type != 1 && next == 2)) {
            //   this.contact = true;
            // } else {
            //   this.contact = false;
            // }
        },
        changeCountry(){
            this.$store.dispatch("vendors/getStates",{query: {country_id : this.form.country_id}}).then((res) => {
                this.states = res.data.states ;
            });
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
            this.$store.dispatch("vendors/createVendor").then((res) => {
                this.countries = res.data.countries ;
                this.currencies = res.data.currencies ;
            });
            if (this.id) {
                this.$store.dispatch("vendors/vendor", this.id).then((_) => {
                    if (this.vendor) {
                        this.form = this.vendor;
                    }
                });
            }
        },

        save() {
            this.$refs.simpleForm.validate().then((success) => {
                if (success) {
                    this.$store
                        .dispatch("vendors/put", {
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
                                    name: "vendor-show",
                                    params: { id: this.$route.params.id },
                                });
                            } else {
                                this.$router.push({ name: "vendors" });
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
  