<template>
    <div class="bg-white p-5">
      <h1>bills </h1>
    <div class="text-right">
        <b-button
          :to="{ name: 'bills-create' }"
          v-b-tooltip.hover="$t('Global.create')"
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
  
    </div>
        
    </div>
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
                this.$forceUpdate();
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
  