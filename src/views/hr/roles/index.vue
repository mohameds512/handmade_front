<template>
  <div>
    <b-card no-body>
      <b-card-header class="pb-50">
        <h5>{{$t('Global.roles')}}</h5>
      </b-card-header>
      <b-card-body>
        <b-row class="d-flex justify-content-between">
          <div class="flex-fill mx-1">
            <form ref="ruleForm" @submit.stop.prevent="deleteRole">
              <b-form-group :state="roleState">
                <v-select :state="roleState" required :placeholder="$t('Global.select-role')" v-model="role" :dir="$store.state.appConfig.layout.isRTL ? 'rtl' : 'ltr'" label="name" :options="roles">
                  <template #option="{ name }">
                    <span> {{ name }}</span>
                  </template>
                <template #no-options>
  {{ $t('noMatching') }}
</template>
</v-select>
                <small v-if="message" style="color: red">{{ message }}</small>
              </b-form-group>
            </form>
          </div>
          <!-- <b-col md="6" xl="3" class="mb-1">
                      <b-form-group label-for="basicInput">
                        <b-form-input id="basicInput" placeholder="Enter role" />
                      </b-form-group>
                    </b-col> -->
          <div>
            <b-button @click="updateRole" variant="primary">
              <feather-icon icon="HomeIcon" class="mr-50" />
              <span class="align-middle">{{$t('Global.save')}}</span></b-button
            >
            <b-button class="mx-2" @click="deleteRole()" variant="danger">
              <feather-icon icon="DeleteIcon" class="mr-50" />
              {{$t('Global.delete')}}
            </b-button>
            <b-button v-b-modal.modal-prevent-closing id="toggle-btn" variant="success">
              <feather-icon icon="PlusIcon" class="mr-50" />
              {{$t('Global.add_role')}}
            </b-button>
          </div>
        </b-row>
      </b-card-body>
    </b-card>
    <b-overlay :show="load || addLoad" rounded="sm">
      <!-- <b-card
    no-body
  >
    <b-card-body>
      <b-card-title>Permissions</b-card-title>
      <b-card-sub-title>Permission according to roles</b-card-sub-title>
    </b-card-body>
    <b-table
      striped
      responsive
      :items="permissionsGroups"
      class="mb-0"
    >

      <template #cell(module)="data">
        {{ data.value }}
      </template>
      <template #cell()="data">
        <b-form-checkbox
          disabled
          :checked="data.value"
        />
      </template>

    </b-table>
  </b-card> -->
      <b-row>
        <b-col cols="12" class="mb-2" lg="4" md="6" v-for="(permissions, name) in permissionsGroups" :key="name">
          <b-card no-body class="mb-0">
            <b-card-header class="pb-0">
                <h5>{{ $t(`Global.${name}`) }}</h5>
            </b-card-header>
            <div class="m-2 d-flex flex-wrap">
              <b-form-checkbox class="mx-1" :disabled="disabled" v-for="(permission, id) in permissions" :value="id" v-model="Permissions" plain :label="id" :key="id"> {{ shortName(permission) }} </b-form-checkbox>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-overlay>
    <b-modal centered id="modal-prevent-closing" ref="my-modal" title="Submit Role Name" ok-title="Submit" cancel-variant="outline-secondary" @show="resetModal" @hidden="resetModal" @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group :state="nameState" label="Name" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="name-input" v-model="new_role" :state="nameState" required />
          <small v-if="message" style="color: red">{{ message }}</small>
        </b-form-group>
      </form>
    </b-modal>

    <b-popover ref="popover" variant="outline-warning" target="popover-reactive-1" triggers="focus" :show.sync="popoverShow" placement="auto" container="my-container">
      <template v-slot:title>
        <div class="d-flex justify-content-between align-items-center">
          <span>Warning</span>
          <!-- <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" class="close" variant="transparent" aria-label="Close">
                      <span class="d-inline-block text-white" aria-hidden="true">&times;</span>
                    </b-button> -->
        </div>
      </template>

      <div>
        <!-- <span>
                      {{$t('Global.warning')}}
                  </span> -->
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" size="sm" variant="danger" @click="popoverShow = false" class="mr-1"> Cancel </b-button>
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="deleteRole()" size="sm" variant="primary"> Ok </b-button>
      </div>
    </b-popover>
  </div>
</template>

<script>
import { BModal, BTable, VBModal, BPopover, BFormCheckbox, BFormGroup, BCardText, BCard, BRow, BCol, BFormInput, BButton, BMedia, BAvatar, BLink, BBadge, BDropdown, BDropdownItem, BPagination, BOverlay, BCardHeader, BCardBody } from 'bootstrap-vue';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import vSelect from 'vue-select';
import Ripple from 'vue-ripple-directive';
import { mapGetters } from 'vuex';
import Cookies from 'js-cookie';
import { PlusIcon, DeleteIcon } from 'vue-feather-icons';

export default {
  components: {
    BCard,
    BPopover,
    PlusIcon,
    vSelect,
    BModal,
    VBModal,
    DeleteIcon,
    BFormCheckbox,
    BCardText,
    BRow,
    BFormGroup,
    BCol,
    BOverlay,
    BCardHeader,
    BCardBody,
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
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      name: '',
      nameState: null,
      roleState: null,
      popoverShow: false,
      submittedNames: [],
      Permissions: [],
      Auth: JSON.parse(Cookies.get('user')),
      disabled: true,
      role_name: '',
      role: null,
      new_role: '',
      roleDialog: false,
      message: null,
      changed: true,
    };
  },
  // beforeRouteLeave(to, from, next) {
  //   if (!this.changed) {
  //     const answer = window.confirm('Do you really want to leave? you have unsaved changes!');

  //     if (answer) {
  //       next();
  //     } else {
  //       next(false);
  //     }
  //   } else {
  //     next();
  //   }
  // },
  watch: {
    role: function (role) {
      if (role) {
        this.$store.dispatch('roles/getRolePermissions', role.id).then(response => {
          this.Permissions = this.$store.getters['roles/rolePermissions'];
          this.disabled = false;
        });
      } else {
        this.Permissions = [];
      }
    },
  },
  computed: {
    ...mapGetters({
      permissionsGroups: 'roles/permissionsGroups',
      roles: 'roles/roles',
      total: 'roles/total',
      load: 'roles/rolesLoad',
      addLoad: 'roles/addLoad',
    }),
  },
  mounted() {
    this.refresh();
  },
  methods: {
      shortName(name){
        var nameArr = name.split(' ');
        return nameArr[0]
      },
    // changeStatus() {
    //   this.changed = false;
    // },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    checkruleFormValidity() {
      const valid = this.$refs.ruleForm.checkValidity();
      this.roleState = valid;
      return valid;
    },

    resetModal() {
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    deleteRole() {
      if (!this.checkruleFormValidity()) {
        return;
      }
      if (this.role) {
        this.$swal({
          title: `${this.$t('Global.deleteTitle')}`,
          icon: 'warning',
          showCancelButton: true,
cancelButtonText:`${this.$t('Global.cancel')}`,
          confirmButtonText: 'Yes, delete role!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
            this.popoverShow = false;
            this.$store.dispatch('roles/deleteRole', this.role.id).then(response => {
              this.$swal({
                icon: 'success',
                title: this.$t('Global.Deleted'),
                showConfirmButton: false,
                timer: 1500,
              })
              this.$store.dispatch('roles/getRoles').then(response => {
                this.role = '';
                this.disabled = true;
                this.role_name = '';
              });
              this.$store.dispatch('roles/getAuthUserRolesPermissions', this.Auth.id);
            });
          }
        });
      }
    },
    updateRole() {
      if (this.role) {
        this.$store
          .dispatch('roles/updateRole', {
            id: this.role.id,
            data: { name: this.role.name, permissions: this.Permissions },
          })
          .then(response => {
            this.$store.dispatch('roles/getRoles').then(response => {
              this.role = { id: this.role.id, type: 'role', name: this.role.name };
              this.changed = true;
            });
            this.$store.dispatch('roles/getAuthUserRolesPermissions', this.Auth.id);
            this.$swal({
              icon: 'success',
              title: this.$t('Global.Saved'),
              showConfirmButton: false,
              timer: 1500,
            })
          });
      }
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.addRole();
      this.$nextTick(() => {
        this.$refs['my-modal'].toggle('#toggle-btn');
      });
    },
    addRole() {
      if (this.new_role !== '') {

        this.$store.dispatch('roles/addRole',   {data: { name: this.new_role }}).then(response => {
          this.message = null;
          this.roleDialog = false;
          this.role = this.$store.getters['roles/newRole'];
          this.$swal({
            icon: 'success',
            title: this.$t('Global.Saved'),
            showConfirmButton: false,
            timer: 1500,
          })

          this.new_role = null;
        });
      }
    },
    refresh() {
      this.$store.dispatch('roles/getRoles');
    },
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
