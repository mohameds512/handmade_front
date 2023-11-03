<template>
  <div right class="d-flex align-items-center dropdown-user-link dropdown-user notifications_drop">
    
    
    <div class="notification_counter" v-if="unSeenCount  != 0">
      {{$store.state.bbx_forms.Notifications.count}} 
    </div>
    <div>
      
    </div>
    <b-dropdown  id="notifications-dropdown" menu-class="fixed-width" class="main-drop" text="Notifications Right align Dropdown with fixed width"  right  variant='none' no-caret  @shown="handleDropdownClick">
      <template #button-content>
        <feather-icon  icon="BellIcon" size="22" />
      </template>
      <div style="width: 250px; max-height: 350px; padding: 5px; overflow-x: auto;">
        <div style=" border-bottom: solid 1px gray;" v-for="notification in $store.state.bbx_forms.Notifications.notifications" :key="notification.id">
          <div class="d-flex justify-content-between">
            <p>
            {{ notification.title }}

          </p>
          <p>
            {{ notification.added_ago }}
          </p>
          </div>
          <p>
            {{ notification.body }}

          </p>
        </div>
      </div>
      
    </b-dropdown>
    <div>
      <b-link :to="{name :'chat'}">
        <feather-icon size="22" icon="MessageCircleIcon" class="m-0" />
      </b-link>
    </div>
    <div class="d-sm-flex d-none user-nav mx-1">
      
      <b-link :to="{ name: 'user-show' }" class="user-name font-weight-bolder mb-0">
        {{ authUser().name || 'Admin System' }}
      </b-link>

    </div>
    <b-avatar size="40" :src="user_photo(authUser().id)" variant="light-primary" badge class="badge-minimal" badge-variant="success">
      <feather-icon v-if="!authUser().first_name" icon="UserIcon" size="22" />
    </b-avatar>
    
    <div v-b-tooltip.hover title="Log Out" class="mx-1 pointer logout_icon" @click="logout">
      <feather-icon size="16" icon="LogOutIcon" class="m-0" />
    </div>
    
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
      unSeenCount : 0,
    };
  },
  
  methods: {
    
    logout() {
      
      this.$store.dispatch('users/logout',{'FCMuserToken' :this.$store.state.app.FCMuserToken}).then(_ => {
        this.$router.push({ name: 'auth-login' });
      });
    },
    Notifications(){
      this.$store.dispatch('bbx_forms/notifications')
              .then((res) => {
                this.allNotfications=res.notifications     
                this.unSeenCount=res.count     
              })
              .catch((error)=>{
                console.log(error)
              })
    },
    NotificationsMarkReaded(){
      this.$store.dispatch('bbx_forms/markNotAsReaded')
              .then((res) => {
                
                this.unSeenCount=res.count            
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
