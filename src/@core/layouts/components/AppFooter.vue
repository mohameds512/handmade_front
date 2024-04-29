<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      {{ $t("Copyright") }} © {{ new Date().getFullYear() }}
      <b-link class="ml-25" href="https://www.linkedin.com/in/mhmed-elsaeed-137766182/" target="_blank">Antika</b-link>
      <span class="d-none d-sm-inline-block"
        >, {{ $t("All rights Reserved") }}</span
      >
    </span>

    <!-- <span class="float-md-right d-none d-md-block">Hand-crafted &amp; Made with
      <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span> -->
  </p>
</template>

<script>
import { BLink } from "bootstrap-vue";
import { getMessaging,onMessage} from "firebase/messaging";
import store from "@/store";

export default {
  components: {
    BLink,
  },
  mounted(){
    this.firebaseNotification()
  },
  methods:{
    Notifications(){
      this.$store.dispatch('bbx_forms/notifications')
              .then((res) => {
              })
              .catch((error)=>{
                console.log(error)
              })
              console.log('ddddddwwwww');
    },
    getChat(id){
        this.$store.dispatch("chats/getChat",{
          query:{'conver_id':id}
        })
          .then((res)=>{
          }).catch((err)=>{
            console.log(err);
          })
      },
    firebaseNotification(){
        const messaging = getMessaging();
        onMessage(messaging, (payload) => {   
          
          // const notificationTitle = payload.notification.title;
          //   const notificationOptions = {
          //   body: payload.notification.body,
          //   icon: '/logo_one.png'
          //   };
            this.$toast.success(payload.notification.body);
            console.log('test2');
            console.log('payload.notification.title',payload);
            if(payload.data.pagename == 'message'){
              this.getChat(payload.data.pageid);
            }
            if(payload.data.pagename == 'Order'){
              console.log('test2');
              this.Notifications();
            }
        });
    }
  }
};
</script>
