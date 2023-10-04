<template>
  <DataTable :total="total" :allow-search="true" :filter="filter" :loading="load" @reset="filter = { export: 0, removed: 0 }" @Refresh="refresh">
    <template v-if="lookups" #filter>
      <b-col cols="12" md="4">
        <v-select v-model="filter.country_id" :filter="fuseSearch" :dir="$store.state.appConfig.layout.isRTL ? 'rtl' : 'ltr'" :options="lookups.countries" label="name" class="w-100" :reduce="val => val.id" :placeholder="$t('Global.country')" />
      </b-col>
      <b-col cols="12" md="4">
        <v-select :dir="$store.state.appConfig.layout.isRTL ? 'rtl' : 'ltr'" v-model="filter.removed" :options="getStatusList(true)" class="w-100" :reduce="val => val.value" placeholder="Users Status">
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
      <b-table :sort-desc.sync="filter.sort_direction" :items="items" responsive striped :fields="fields" primary-key="id" show-empty :empty-text="$t('Global.empty_text')">
        <template #cell(name)="data">
          <b-media vertical-align="center" class="d-flex align-items-center">
            <template #aside>
              <b-avatar size="32" :text="avatarText(data.item.name)" :src="user_photo(data.item.id)" />
            </template>
            <b-link v-if="$i18n.locale == 'en'" v-b-tooltip.hover="data.item.name" :to="{ name: 'user-show', params: { id: data.item.id } }" class="font-weight-bold d-block text-nowrap text-truncate">
              {{ data.item ? data.item.name : '_' }}
            </b-link>
            <b-link v-if="$i18n.locale == 'ar'" v-b-tooltip.hover="data.item.name_local" :to="{ name: 'user-show', params: { id: data.item.id } }">
              {{ data.item ? shortMyText(data.item.name_local) : '_' }}
            </b-link>
          </b-media>
        </template>
        <template #cell(status)="data">
          <b-badge pill :variant="`light-${getStatus(data.item.removed).color}`" class="text-capitalize">
            {{ getStatus(data.item.removed).name }}
          </b-badge>
        </template>
        <template #cell(type)="data">
          <span class="text-capitalize">
            {{ data.item.type ? data.item.type.name : '-' }}
          </span>
        </template>
        <template #cell(actions)="data">
          <div class="align-items-center">
<!--            <b-link v-b-tooltip.hover="$t('Global.access')" :to="{ name: 'user-access', params: { id: data.item.id } }" class="mx-0">-->
<!--              <feather-icon icon="KeyIcon" />-->
<!--            </b-link>-->
            <!-- <feather-icon icon="KeyIcon" class="text-primary" style="cursor: pointer"  :to="{ name: 'user-access' }"/> -->
            <div>
              <feather-icon v-b-tooltip.hover="$t('Global.edit')" icon="EditIcon" style="cursor: pointer" @click="open(data.item.id)" />
              <feather-icon v-b-tooltip.hover="$t('Global.delete')" icon="Trash2Icon" style="cursor: pointer" class="text-danger" v-if="data.item.removed == 0" @click="remove(data.item.id)" />
              <feather-icon v-b-tooltip.hover="$t('Global.restore')" icon="RepeatIcon" style="cursor: pointer" v-else @click="restore(data.item.id)" />
          
            </div>
            </div>
        </template>
      </b-table>
      <b-modal id="modalPopover" v-model="dialog" no-close-on-backdrop size="lg" :title="title">
        <validation-observer ref="simpleRules">
          <b-form :class="load ? 'disabled_all' : ''">
            <div class="row">
              <b-col md="12">
                <b-form-group :label="$t('faculties')" label-for="faculty">
                  <validation-provider #default="{ errors }" name="faculties_ids" rules="required">
                    <v-select v-model="ruleForm.faculties_ids" :filter="fuseSearch" :label="getSelectLabel()" :reduce="re => re.id" :class="errors.length > 0 ? 'custom_invalid' : ''" :options="allLookups ? allLookups.faculties : []" multiple />
                    <small v-if="errors.length" class="text-danger">{{ validation(null, 0).message }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </div>
          </b-form>
        </validation-observer>
        <template #modal-footer>
          <b-row :class="load ? 'disabled_all' : ''">
            <b-col md="12">
              <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1" @click="submit">
                {{ $t('Global.save') }}
              </b-button>
              <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary" @click="dialog = false">
                {{ $t('Global.cancel') }}
              </b-button>
            </b-col>
          </b-row>
        </template>
      </b-modal>
    </template>
    <template #action>
      <b-button  :to="{ name: 'ManufacturerTypesAdd' }" v-b-tooltip.hover="$t('Global.add')" variant="primary" class="btn-icon mr-1">
        <feather-icon icon="PlusIcon" />
      </b-button>
      <b-button v-b-tooltip.hover="$t('Global.export_excel')" class="btn-icon" variant="primary" @click="filter.export = 1">
        <feather-icon icon="FileTextIcon" />
      </b-button>
    </template>
  </DataTable>
</template>

<script>
import { BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BBadge, BDropdown, BDropdownItem, BPagination, BOverlay, BCardHeader, BCardBody, BModal, VBModal, BPopover, BFormGroup, BForm } from 'bootstrap-vue';
import { mapGetters, mapActions } from 'vuex';
import Ripple from 'vue-ripple-directive';
import vSelect from 'vue-select';
import { avatarText } from '@core/utils/filter';
import ToastificationContent from '@core/components/toastification/ToastificationContent';
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate';
import { required, email } from '@validations';
import DataTable from '@/views/components/table/DataTable';

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
    'b-modal': VBModal,
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
      user_id: null,
      user_name: null,
    };
  },
  computed: {
    ...mapGetters({
      items: 'manufacturer_types/items',
      total: 'manufacturer_types/total',
      load: 'manufacturer_types/load',
      lookups: 'manufacturer_types/lookups',
    }),
    title() {
      if (this.user_name) {
        return this.$t('Global.userAccessControl') + ' ( ' + this.user_name + ' )';
      } else {
        return this.$t('Global.userAccessControl');
      }
    },
    fields() {
      let fields = [
        {
          key: "name",
        label: "Class",
        sortable: true,
        },
        {
          key: 'actions',
          label: this.$t('Global.actions'),
          thClass: 'customAction',
          tdClass: 'customWidth',
        },
      ];

      return fields;
    },
  },
  mounted()
  {

console.log('dddd');
  },
  methods: {
    ...mapActions({
      getLookups: 'app/GET_LOOKUPS',
      setAccessControl: 'users/setAccessControl',
    }),
    fetchLookups() {
      this.getLookups(this.lookupModules).then(data => {
        this.allLookups = data.success;
      });
    },
    openDialog(item) {
      this.user_id = item.id;
      this.user_name = item.name;
      this.ruleForm.faculties_ids = item?.access?.faculties_ids;
      this.dialog = true;
    },
    open(id) {
      window.open(this.$router.resolve({ name: 'manufacturer_types-edit', params: { id } }).href, '_self');
    },
    refresh(query) {
    //   query = { ...query, type: this.type };
      this.$store.dispatch('manufacturer_types/items' , {query:query});
    },
    submit() {
      this.$refs.simpleRules
        .validate()
        .then(success => {
          if (success) {
            const payload = {
              query: { faculties_ids: this.ruleForm.faculties_ids },
              id: this.user_id,
            };
            this.setAccessControl(payload)
              .then(response => {
                this.$swal({
                  icon: 'success',
                  text: `${this.$t('Global.successMessage')}`,
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.refresh();
                this.dialog = false;
                this.user_id = null;
                this.user_name = null;
              })
              .catch(error => {
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
                this.user_id = null;
                this.user_name = null;
              });
          }
        })
        .catch(_ => {
          const query = {
            payload: { faculties_ids: this.ruleForm.faculties_ids },
            id: this.user_id,
          };
          this.setAccessControl({ query })
            .then(response => {
              this.$swal({
                icon: 'success',
                text: `${this.$t('Global.successMessage')}`,
                showConfirmButton: false,
                timer: 2000,
              });
              this.refresh();
              this.dialog = false;
              this.user_id = null;
            })
            .catch(error => {
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
              this.user_id = null;
            });
        });
    },
    remove(manufacturer_typeId) {
      this.$swal({
        title: `${this.$t('Global.deleteTitle')}`,
        text: `${this.$t('Global.deleteText')}`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: `${this.$t('Global.cancel')}`,
        confirmButtonText: `${this.$t('Global.deleteBtn')}`,
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$store.dispatch('manufacturer_types/remove', manufacturer_typeId).then(_ => {
            this.refresh();
            this.$swal({
              icon: 'success',
              text: "Manufacturer type is deleted succesfully",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      });
    },

    open_role(id) {
      window.open(this.$router.resolve({ name: 'user-role', params: { id: id } }).href, '_blank');
    },
    restore(userId) {
      this.$swal({
        title: `${this.$t('Global.deleteTitle')}`,
        text: 'You Will Activate User!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: `${this.$t('Global.cancel')}`,
        confirmButtonText: 'Yes, Activate!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$store.dispatch('users/restore', userId).then(_ => {
            this.refresh();
            this.$swal({
              icon: 'success',
              title: 'Activated!',
              text: 'User has been Activated.',
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
@import '@core/scss/vue/libs/vue-select.scss';
</style>
