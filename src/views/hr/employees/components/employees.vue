<template>
  <DataTable
    :total="total"
    :allow-search="true"
    :filter="filter"
    :loading="load"
    @reset="filter = { export: 0, removed: 0 }"
    @Refresh="refresh"
  >
    <template v-if="lookups" #filter>
      <b-col cols="12" md="4">
        <v-select
          v-model="filter.country_id"
          :filter="fuseSearch"
          :dir="$store.state.appConfig.layout.isRTL ? 'rtl' : 'ltr'"
          :options="lookups.countries"
          label="name"
          class="w-100"
          :reduce="(val) => val.id"
          :placeholder="$t('Global.country')"
        />
      </b-col>
      <b-col cols="12" md="4">
        <v-select
          :dir="$store.state.appConfig.layout.isRTL ? 'rtl' : 'ltr'"
          v-model="filter.removed"
          :options="getStatusList(true)"
          class="w-100"
          :reduce="(val) => val.value"
          placeholder="Employee Status"
        >
          <template slot="selected-option" slot-scope="option">
            <span>
              {{ $t(`Global.${option.label}`) }}
            </span>
          </template>
          <template v-slot:option="option">
            {{ $t(`Global.${option.label}`) }}
          </template>
        </v-select>
      </b-col>
    </template>
    <template #customTable>
      <b-table
        :sort-desc.sync="filter.sort_direction"
        :items="items"
        responsive
        striped
        :fields="fields"
        primary-key="id"
        show-empty
        :empty-text="$t('Global.empty_text')"
      >
        <template #cell(name)="data">
          <b-media vertical-align="center" class="d-flex align-items-center">
            <template #aside>
              <b-avatar size="32" :text="avatarText(data.item.name)" />
            </template>
            <b-link
              v-if="$i18n.locale == 'en'"
              v-b-tooltip.hover="data.item.name"
              :to="{ name: 'employee-show', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap text-truncate"
            >
              {{ data.item ? data.item.name : "_" }}
            </b-link>
            <b-link
              v-if="$i18n.locale == 'ar'"
              v-b-tooltip.hover="data.item.name_local"
              :to="{ name: 'employee-show', params: { id: data.item.id } }"
            >
              {{ data.item ? shortMyText(data.item.name_local) : "_" }}
            </b-link>
          </b-media>
        </template>
        <template #cell(status)="data">
          <b-badge
            pill
            :variant="`light-${getStatus(data.item.removed).color}`"
            class="text-capitalize"
          >
            {{ getStatus(data.item.removed).name }}
          </b-badge>
        </template>
        <template #cell(type)="data">
          <span class="text-capitalize">
            {{ data.item.type ? data.item.type.name : "-" }}
          </span>
        </template>
        <template #cell(actions)="data">
          <div class="align-items-center">
            <div>
              <feather-icon
                v-b-tooltip.hover="$t('Global.edit')"
                icon="EditIcon"
                style="cursor: pointer"
                @click="open(data.item.id)"
              />
              <feather-icon
                v-b-tooltip.hover="$t('Global.delete')"
                icon="Trash2Icon"
                style="cursor: pointer"
                class="text-danger"
                v-if="data.item.removed == 0"
                @click="remove(data.item.id)"
              />
              <feather-icon
                v-b-tooltip.hover="$t('Global.restore')"
                icon="RepeatIcon"
                style="cursor: pointer"
                v-else
                @click="restore(data.item.id)"
              />
            </div>
          </div>
        </template>
      </b-table>
      <b-modal
        id="modalPopover"
        v-model="dialog"
        no-close-on-backdrop
        size="lg"
        :title="title"
      >
        <validation-observer ref="simpleRules">
          <b-form :class="load ? 'disabled_all' : ''">
            <div class="row">
              <b-col md="12">
                <b-form-group :label="$t('faculties')" label-for="faculty">
                  <validation-provider
                    #default="{ errors }"
                    name="faculties_ids"
                    rules="required"
                  >
                    <v-select
                      v-model="ruleForm.faculties_ids"
                      :filter="fuseSearch"
                      :label="getSelectLabel()"
                      :reduce="(re) => re.id"
                      :class="errors.length > 0 ? 'custom_invalid' : ''"
                      :options="allLookups ? allLookups.faculties : []"
                      multiple
                    />
                    <small v-if="errors.length" class="text-danger">{{
                      validation(null, 0).message
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </div>
          </b-form>
        </validation-observer>
        <template #modal-footer>
          <b-row :class="load ? 'disabled_all' : ''">
            <b-col md="12">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1"
                @click="submit"
              >
                {{ $t("Global.save") }}
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="outline-secondary"
                @click="dialog = false"
              >
                {{ $t("Global.cancel") }}
              </b-button>
            </b-col>
          </b-row>
        </template>
      </b-modal>
    </template>
    <template #action>
      <b-button
        :to="{ name: 'employee-add' }"
        v-b-tooltip.hover="$t('Global.add')"
        variant="primary"
        class="btn-icon mr-1"
      >
        <feather-icon icon="PlusIcon" />
      </b-button>
      <b-button
        v-b-tooltip.hover="$t('Global.export_excel')"
        class="btn-icon"
        variant="primary"
        @click="filter.export = 1"
      >
        <feather-icon icon="FileTextIcon" />
      </b-button>
    </template>
  </DataTable>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BOverlay,
  BCardHeader,
  BCardBody,
  BModal,
  VBModal,
  BPopover,
  BFormGroup,
  BForm,
} from "bootstrap-vue";
import { mapGetters, mapActions } from "vuex";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
import { avatarText } from "@core/utils/filter";
import ToastificationContent from "@core/components/toastification/ToastificationContent";
import { ValidationProvider, ValidationObserver, localize } from "vee-validate";
import { required, email } from "@validations";
import DataTable from "@/views/components/table/DataTable";

export default {
  components: {
    DataTable,
    BFormGroup,
    BCard,
    vSelect,
    BRow,
    BCol,
    BOverlay,
    BCardHeader,
    BCardBody,
    BForm,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BModal,
    VBModal,
    BPopover,
    ValidationProvider,
    ValidationObserver,
    localize,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  data() {
    return {
      lookupModules: {
        faculties: true,
        bylaws: true,
        programs: true,
      },
      allLookups: null,
      dialog: false,
      filter: { removed: 0 },
      ruleForm: {
        faculties_ids: [],
      },
      employee_id: null,
      employee_name: null,
    };
  },
  computed: {
    ...mapGetters({
      items: "employees/items",
      total: "employees/total",
      load: "employees/load",
      lookups: "employees/lookups",
    }),
    title() {
      if (this.employee_name) {
        return (
          this.$t("Global.employeeAccessControl") +
          " ( " +
          this.employee_name +
          " )"
        );
      } else {
        return this.$t("Global.employeeAccessControl");
      }
    },
    fields() {
      let fields = [
        {
          key: "name",
          label: this.$t("Global.name"),
          sortable: true,
        },
        {
          key: "phone",
          label: this.$t("Global.phone"),
          sortable: true,
        },
        {
          key: "joptitle",
          label: this.$t("hr.joptitle"),
          sortable: true,
        },
        {
          key: "department",
          label: this.$t("hr.department"),
          sortable: true,
        },
        {
          key: "salary",
          label: this.$t("hr.salary"),
          sortable: true,
        },
        {
          key: "status",
          label: this.$t("Global.status"),
        },
                {
          key: "joined",
          label: this.$t("hr.joined_at"),
        },
        {
          key: "actions",
          label: this.$t("Global.actions"),
          thClass: "customAction",
          tdClass: "customWidth",
        },
      ];

      return fields;
    },
  },
  methods: {
    ...mapActions({
      getLookups: "app/GET_LOOKUPS",
      setAccessControl: "employees/setAccessControl",
    }),
    fetchLookups() {
      this.getLookups(this.lookupModules).then((data) => {
        this.allLookups = data.success;
      });
    },
    openDialog(item) {
      this.employee_id = item.id;
      this.employee_name = item.name;
      this.ruleForm.faculties_ids = item?.access?.faculties_ids;
      this.dialog = true;
    },
    open(id) {
      window.open(
        this.$router.resolve({ name: "employee-edit", params: { id } }).href,
        "_blank"
      );
    },
    refresh(query) {
      query = { ...query, type: this.type };
      this.$store.dispatch("employees/employees", { query });
    },
    submit() {
      this.$refs.simpleRules
        .validate()
        .then((success) => {
          if (success) {
            const payload = {
              query: { faculties_ids: this.ruleForm.faculties_ids },
              id: this.employee_id,
            };
            this.setAccessControl(payload)
              .then((response) => {
                this.$swal({
                  icon: "success",
                  text: `${this.$t("Global.successMessage")}`,
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.refresh();
                this.dialog = false;
                this.employee_id = null;
                this.employee_name = null;
              })
              .catch((error) => {
                // this.$toast({
                //   component: ToastificationContent,
                //   position: 'top-right',
                //   props: {
                //     title: 'Error',
                //     variant: 'danger',
                //     text: `${error || $t('Global.errorMessage')}`,
                //   },
                // })
                this.dialog = false;
                this.employee_id = null;
                this.employee_name = null;
              });
          }
        })
        .catch((_) => {
          const query = {
            payload: { faculties_ids: this.ruleForm.faculties_ids },
            id: this.employee_id,
          };
          this.setAccessControl({ query })
            .then((response) => {
              this.$swal({
                icon: "success",
                text: `${this.$t("Global.successMessage")}`,
                showConfirmButton: false,
                timer: 2000,
              });
              this.refresh();
              this.dialog = false;
              this.employee_id = null;
            })
            .catch((error) => {
              // this.$toast({
              //   component: ToastificationContent,
              //   position: 'top-right',
              //   props: {
              //     title: 'Error',
              //     variant: 'danger',
              //     text: `${error || $t('Global.errorMessage')}`,
              //   },
              // })
              this.dialog = false;
              this.employee_id = null;
            });
        });
    },
    remove(employeeId) {
      this.$swal({
        title: `${this.$t("Global.deleteTitle")}`,
        text: `${this.$t("Global.deleteText")}`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: `${this.$t("Global.cancel")}`,
        confirmButtonText: `${this.$t("Global.deleteBtn")}`,
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch("employees/remove", employeeId).then((_) => {
            this.refresh();
            this.$swal({
              icon: "success",
              text: this.$t("Global.deletedEmployee"),
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      });
    },

    open_role(id) {
      window.open(
        this.$router.resolve({ name: "employee-role", params: { id: id } })
          .href,
        "_blank"
      );
    },
    restore(employeeId) {
      this.$swal({
        title: `${this.$t("Global.deleteTitle")}`,
        text: "You Will Activate Employee!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: `${this.$t("Global.cancel")}`,
        confirmButtonText: "Yes, Activate!",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch("employees/restore", employeeId).then((_) => {
            this.refresh();
            this.$swal({
              icon: "success",
              title: "Activated!",
              text: "Employee has been Activated.",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      });
    },
  },
  mounted() {
    // this.fetchLookups();
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
