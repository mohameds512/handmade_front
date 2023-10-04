<template>
 <div>
   
    <b-card>
     
       <!-- <h5>{{log.first_name}} {{log.last_name}}   <span> "{{log.action}}"</span></h5> -->
        <ShowComponent :data="log.data" :loading="load" :only="['action','url','user','id']">
            <template #user="{ data }">
              <th scope="row" :width="'20%'">
                {{ $t(`Global.arabic_name`) }}
              </th>

              <td class="d-flex flex-wrap">
                <div v-if="data">
                  <span>
                    {{ data.user.name_local || '-' }}
                  </span>
                </div>
              </td>
            </template>
            <template #id="{ data }">
              <th scope="row" :width="'20%'">
                {{ $t(`Global.english_name`) }}
              </th>

              <td class="d-flex flex-wrap">
                <div v-if="data">
                  <span>
                    {{ data.user.name || '-'}}
                  </span>
                </div>
              </td>
            </template>
          </ShowComponent>
      
    </b-card> 
    <!-- <b-row>
    <b-col md="6">
     <b-card>
      <b-card-text>
        <h3>Old Data</h3>
          <b-table striped hover :items="logOldValue"></b-table>
      </b-card-text>
    </b-card> 
    </b-col>
    <b-col md="6">
     <b-card>
      <b-card-text>
        <h3>New Data</h3>
          <b-table striped hover :items="logNewValue"></b-table>
      </b-card-text>
    </b-card> 
     </b-col>
    </b-row> -->
    <b-row>
     
       
    <b-col md="6">
      <b-card>
        <h4>New Data</h4>
      <vue-good-table
       
        :columns="columns2"
        :rows="logNewValue"/>
      </b-card>
    </b-col>
    
    <b-col md="6">
      <b-card>
        <h4>Old Data</h4>
      <vue-good-table
      :columns="columns2"
      :rows="logOldValue"/>
      </b-card>
    </b-col>
    </b-row>  
  </div>
</template>
<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue';
import { BCard, BRow, BCol, BFormInput, BButton, BCardText, BTable, BMedia, BAvatar, BLink, BBadge, BDropdown, BDropdownItem, BPagination, BOverlay, BCardHeader, BCardBody } from 'bootstrap-vue';
// import vSelect from 'vue-select'
// import store from '@/store'
// import { ref, onUnmounted } from '@vue/composition-api'
// import { avatarText } from '@core/utils/filter'
// import UsersListFilters from './UsersListFilters.vue'
// import useUsersList from './useUsersList'
// import userStoreModule from '../userStoreModule'
// import UserListAddNew from './UserListAddNew.vue'
import DataTable from '@/views/components/table/DataTable';
import Show from '@/views/components/table/show';
import { mapGetters, mapState } from 'vuex';
import { VueGoodTable } from 'vue-good-table';
import ShowComponent from '@/views/components/info/show';

export default {
  components: {
    BCardActions,
    Show,
    VueGoodTable,
    BCardText,
    ShowComponent,
    DataTable,
    BCard,
    BRow,
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
  data() {
    return {
      columns: [
        {
          label: '',
          field: 'key',
        },
        {
          label: '',
          field: 'value',
        },
      ],

      columns2: [
        {
          label: 'key',
          field: 'key',
        },
        {
          label: 'value',
          field: 'value',
          
        },
       
      
      ],
       rows: [
        { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
      ],
    };
  },
  computed: {
    ...mapState({
      logState: state => state.log.log,
    }),
    ...mapGetters({
      log: 'log/log',
      logNewValue: 'log/logNewValue',
      logOldValue: 'log/logOldValue',
      load: 'log/load',
    }),
  },
  methods: {
    refresh(query) {
      this.$store.dispatch('log/getLog', this.$route.params.id);
    },
  },
  mounted() {
    this.refresh();
  },
  // components: {
  //   UsersListFilters,
  //   UserListAddNew,
  //
  //   BCard,
  //   BRow,
  //   BCol,
  //   BFormInput,
  //   BButton,
  //   BTable,
  //   BMedia,
  //   BAvatar,
  //   BLink,
  //   BBadge,
  //   BDropdown,
  //   BDropdownItem,
  //   BPagination,
  //
  //   vSelect,
  // },
  // setup() {
  //   const USER_APP_STORE_MODULE_NAME = 'app-user'
  //
  //   // Register module
  //   if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)
  //
  //   // UnRegister on leave
  //   onUnmounted(() => {
  //     if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
  //   })
  //
  //   const isAddNewUserSidebarActive = ref(false)
  //
  //   const roleOptions = [
  //     { label: 'Admin', value: 'admin' },
  //     { label: 'Author', value: 'author' },
  //     { label: 'Editor', value: 'editor' },
  //     { label: 'Maintainer', value: 'maintainer' },
  //     { label: 'Subscriber', value: 'subscriber' },
  //   ]
  //
  //   const planOptions = [
  //     { label: 'Basic', value: 'basic' },
  //     { label: 'Company', value: 'company' },
  //     { label: 'Enterprise', value: 'enterprise' },
  //     { label: 'Team', value: 'team' },
  //   ]
  //
  //   const statusOptions = [
  //     { label: 'Pending', value: 'pending' },
  //     { label: 'Active', value: 'active' },
  //     { label: 'Inactive', value: 'inactive' },
  //   ]
  //
  //   const {
  //     fetchUsers,
  //     tableColumns,
  //     perPage,
  //     currentPage,
  //     totalUsers,
  //     dataMeta,
  //     perPageOptions,
  //     searchQuery,
  //     sortBy,
  //     isSortDirDesc,
  //     refUserListTable,
  //     refetchData,
  //
  //     // UI
  //     resolveUserRoleVariant,
  //     resolveUserRoleIcon,
  //     resolveUserStatusVariant,
  //
  //     // Extra Filters
  //     roleFilter,
  //     planFilter,
  //     statusFilter,
  //   } = useUsersList()
  //
  //   return {
  //
  //     // Sidebar
  //     isAddNewUserSidebarActive,
  //
  //     fetchUsers,
  //     tableColumns,
  //     perPage,
  //     currentPage,
  //     totalUsers,
  //     dataMeta,
  //     perPageOptions,
  //     searchQuery,
  //     sortBy,
  //     isSortDirDesc,
  //     refUserListTable,
  //     refetchData,
  //
  //     // Filter
  //     avatarText,
  //
  //     // UI
  //     resolveUserRoleVariant,
  //     resolveUserRoleIcon,
  //     resolveUserStatusVariant,
  //
  //     roleOptions,
  //     planOptions,
  //     statusOptions,
  //
  //     // Extra Filters
  //     roleFilter,
  //     planFilter,
  //     statusFilter,
  //   }
  // },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
