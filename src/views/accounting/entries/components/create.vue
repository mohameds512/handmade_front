
<template>
  <div class="bg-white w-100 p-5">
    <h1>Create Transaction</h1>
    <validation-observer ref="mainForm">

      <b-form @submit="save" @reset="reset">
        <b-row>

          <b-col md="4">
            <validation-provider #default="{ errors }" name="date" rules="required">
              <b-form-group :label="$t('acc.date')" label-for="date-input" description="you can't select date in the future">
                <b-form-datepicker v-model="form.date" placeholder="Enter date" required></b-form-datepicker>
              </b-form-group>
              <ValidationErrors default-message :frontend-errors="errors"
              :backend-errors="getBackendFieldError(errorsdata, 'form.date')" />
            </validation-provider>
          </b-col>

          <b-col md="8">
            <validation-provider #default="{ errors }" name="description" rules="required">
              <b-form-group :label="$t('acc.description')" label-for="input-2">
                <b-form-textarea v-model="form.description" placeholder="Enter description..." rows="3" max-rows="6"></b-form-textarea>
              </b-form-group>
              <ValidationErrors default-message :frontend-errors="errors"
              :backend-errors="getBackendFieldError(errorsdata, 'description')" />
            </validation-provider>
          </b-col>

        </b-row>


        <b-row v-for="( entry, index ) in  form.entries" :key="index">

          <b-col md="4">
            <b-form-group :label="$t('acc.account')" label-for="account_id-input" invalid-feedback="account is required">
              <validation-provider #default="{ errors }" name="{ index +  'account_id'}" rules="required">
                <b-form-select v-model="entry.account_id">
                  <b-form-select-option v-for="account in accounts" :value="account.id">
                    {{ account.name }}
                  </b-form-select-option>
                </b-form-select>
                <ValidationErrors default-message :frontend-errors="errors" :backend-errors="getBackendFieldError(errorsdata, index + 'account_id')
                  " />
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="3">

            <b-form-group :label="$t('acc.credit')" label-for="account_id-input" invalid-feedback="credit is required">
              <validation-provider #default="{ errors }" name="account_id" rules="required">
                <b-form-input v-model="entry.credit" type="number" placeholder="Enter credit"></b-form-input>
                <ValidationErrors default-message :frontend-errors="errors" :backend-errors="getBackendFieldError(errorsdata, 'account_id')
                  " />
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group :label="$t('acc.debit')" label-for="account_id-input" invalid-feedback="debit is required">
              <validation-provider #default="{ errors }" name="account_id" rules="required">
                <b-form-input v-model="entry.debit" type="number" placeholder="Enter debit"></b-form-input>
                <ValidationErrors default-message :frontend-errors="errors"
                  :backend-errors="getBackendFieldError(errorsdata, 'account_id')" />
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-button variant="danger" class="mt-2" @click="removeEntry(index)">Remove</b-button>
          </b-col>
        </b-row>

        <b-button @click="addEntry()">Add</b-button>
        <h2>{{ sumTotal }}</h2>
        <hr>
        <b-button @click.pervent="save()" variant="primary">Submit</b-button>
        <b-button @click.pervent="reset()" class="ml-2" variant="danger">Reset</b-button>
      </b-form>
    </validation-observer>

  </div>
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
  BForm,
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
import { credit } from "@/@core/utils/validations/validations";
import { useToast } from "vue-toastification";


export default {
  components: {
    BForm,
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
  computed: {
    ...mapGetters({
      load: "entry/load",
    }),
    sumTotal() {
      return this.form.entries.reduce((acc, item) => {
        return acc + Number(item.credit - item.debit);
      }, 0);
    },
  },
  props: {
  },
  data() {
    return {
      accounts: [],
      errors_data: {},
      errorsdata: {},
      total: 0,
      form: {
        date: null,
        description: null,
        entries: [
          {
            account_id: null,
            credit: 0,
            debit: 0,
          },
          {
            account_id: null,
            credit: 0,
            debit: 0,
          }
        ],
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

  methods: {
    ...mapActions({
      saveEntry: "entries/put",
    }),
    // sumCredit() {
    //   return this.form.entries.reduce((total, entry) => {
    //     return total + Number(entry.credit);
    //   }, 0);
    // },
    // sumDedit() {
    //   return this.form.entries.reduce((total, entry) => {
    //     return total + Number(entry.debit);
    //   }, 0);
    // },
    // calTotal() {
    //   // console.log(this.entries);
    //   let credit = this.sumCredit();
    //   let debit = this.sumDedit();
    //   this.total = credit - debit;
    // },
    addEntry() {
      this.form.entries.push({
        account_id: null,
        credit: 0,
        debit: 0,
      });
    },
    removeEntry(index) {
      this.form.entries.splice(index, 1);
    },
    validateAsync: function (index) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.$refs.mainForm.validate().then((success) => {
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
      this.$store.dispatch("entries/createEntry").then((res) => {
        // console.log(res.data);
        this.accounts = res.data;
      });

    },

    save() {

      this.$refs.mainForm.validate().then((success) => {
        if (success) {
          if (this.sumTotal !== 0) {
            return      this.errorToast('transacation is not balanced');
            // this.$toast.success('Hello World!')
            // return this.$bvToast.toast('get off',{
            //   title: `Warning`,
            //   variant: 'warning',
            //   solid: true
            // }); 
           // return alert('دا عندها');
          }
          console.log(this.form);
          this.$store
            .dispatch("entries/saveEntry", {
              query: this.form,
            })
            .then((_) => {
              this.$swal({
                icon: "success",
                title: this.$t("Global.Saved"),
                showConfirmButton: false,
                timer: 1500,
              });
               this.$router.push({ name: "entries" });
            })
            .catch((error) => {
              this.errorsdata = this.handleBackendError(
                error.response.data.errors
              );
            });
        }
      });
    },
    reset() {
      this.form.date = null;
      this.form.description = null;


      this.form.entries = [
        {
          account_id: null,
          credit: 0,
          debit: 0,
        },
        {
          account_id: null,
          credit: 0,
          debit: 0,
        }
      ];


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
