<template>
  <div right class="d-flex align-items-center dropdown-user-link dropdown-user notifications_drop">
    <!-- <template #button-content> -->

    <!-- <feather-icon  icon="BellIcon" size="22" /> -->
    <!-- {{ allNotfications }} -->
    <div class="notification_counter" v-if="notifCounter() != 0">
      {{notifCounter()}}
    </div>
    <!-- {{ Notifications() }} -->
    <b-dropdown  id="notifications-dropdown" menu-class="fixed-width" class="main-drop" text="Notifications Right align Dropdown with fixed width"  right  variant='none' no-caret  @shown="handleDropdownClick">
      <template #button-content>
        <feather-icon  icon="BellIcon" size="22" />
      </template>
      <b-dropdown-item  class="custom-item" v-for="notification in allNotfications" :key="notification.id">
        {{ notification.data.message }}
      </b-dropdown-item>
      
    </b-dropdown>
    <div class="d-sm-flex d-none user-nav mx-1">
      
      <b-link :to="{ name: 'user-show' }" class="user-name font-weight-bolder mb-0">
        {{ authUser().first_name || 'Admin System' }}
      </b-link>
<!--      <b-link :to="{ name: 'user-show', params: { id: authUser().id } }" class="user-name font-weight-bolder mb-0">-->
<!--        {{ authUser().first_name || 'Admin System' }}-->
<!--      </b-link>-->
      <!-- <span class="user-status">admin</span> -->
    </div>
    <b-avatar size="40" :src="user_photo(authUser().id)" variant="light-primary" badge class="badge-minimal" badge-variant="success">
      <feather-icon v-if="!authUser().first_name" icon="UserIcon" size="22" />
    </b-avatar>
    
    <div v-b-tooltip.hover title="Log Out" class="mx-1 pointer logout_icon" @click="logout">
      <feather-icon size="16" icon="LogOutIcon" class="m-0" />
    </div>
    <!-- <span>Logout</span> -->
    <!-- </template> -->

    <!-- <b-dropdown-item :to="{ name: 'user-show', params: { id: authUser().id } }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="UserIcon" class="mr-50" />
      <span>Profile</span>
    </b-dropdown-item> -->
    <!-- <b-dropdown-item :to="{ name: 'apps-email' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="MailIcon" class="mr-50" />
      <span>Inbox</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'apps-todo' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="CheckSquareIcon" class="mr-50" />
      <span>Task</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'apps-chat' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="MessageSquareIcon" class="mr-50" />
      <span>Chat</span>
    </b-dropdown-item>

    <b-dropdown-divider />

    <b-dropdown-item :to="{ name: 'pages-account-setting' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="SettingsIcon" class="mr-50" />
      <span>Settings</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'pages-pricing' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="CreditCardIcon" class="mr-50" />
      <span>Pricing</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'pages-faq' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="HelpCircleIcon" class="mr-50" />
      <span>FAQ</span>
    </b-dropdown-item> -->
    <!-- <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
      <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
      <span>Logout</span>
    </b-dropdown-item> -->
  </div>
</template>

<script>
import { BNavItemDropdown, BLink, BDropdownItem, BDropdownDivider, BAvatar,BDropdown , BDropdownitem } from 'bootstrap-vue';

export default {
  components: {
    BDropdownitem,
    BDropdown,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BLink,
  },
  data() {
    return {
      userData: this.authUser(),
      allNotfications:[],
    };
  },
  
  methods: {
    logout() {
      this.$store.dispatch('users/logout').then(_ => {
        this.$router.push({ name: 'auth-login' });
      });
    },
    Notifications(){
      // this.$store.getters['bbx_forms/get_notifications']
      this.$store.dispatch('bbx_forms/notifications')
              .then((res) => {
                // console.log(res);
                this.allNotfications=res.data                
              })
              .catch((error)=>{
                console.log(error)
              })
    },
    NotificationsMarkReaded(){
      // this.$store.getters['bbx_forms/get_notifications']
      this.$store.dispatch('bbx_forms/markNotAsReaded')
              .then((res) => {
                // console.log(res);
                this.allNotfications=res.data                
              })
              .catch((error)=>{
                console.log(error)
              })
    },
    notifCounter(){
      let counter =  this.allNotfications.filter((el)=>el.read_at == null).length;
      return counter;
    },
    handleDropdownClick(){
      this.NotificationsMarkReaded()
    }
  },
  beforeMount() {
      this.Notifications()
    },
};
</script>

<style lang="scss" scoped>
  [dir=rtl] .logout_icon{
    transform: rotate(180deg)
  }
  .fixed-width .dropdown-menu {
    width: 150px !important;
  }
  
  .notifications_drop{
    
    .main-drop {
      .dropdown-menu {
        max-height: 150px !important;
      }
      
      // .custom-item {
      //   max-width: 250px;
      //   height: auto;
        
      // }
    }
  }
  
  

  .notification_counter{
    width: 20px;
    height: 20px;
    padding: 4px 0px;
    border-radius: 15px;
    text-align: center;
    font-size: 10px;
    line-height: 1.42857;
    color: #ffffff;
    background-color: #1c8400;
    margin-right: -35px;
    margin-bottom: -10px;
    z-index: 1;
  }
</style>
