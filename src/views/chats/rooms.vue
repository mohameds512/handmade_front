<template>
    <div class="bg-white m-1 p-2">
        <vue-advanced-chat
            :current-user-id="currentUserId"
            :rooms="JSON.stringify(rooms)"
            :messages="JSON.stringify(messages)"
            :room-actions="JSON.stringify(roomActions)"
            :rooms-loaded="true"
            :loading-rooms="false"
            :messages-loaded="true"
        />
    </div>
</template>
<script>
import {
        BCardTitle,
        BCardImg,
        BProgress,
        BFormInput,
        BFormTag,
        BFormTags,
        BFormGroup,
        BForm,
        BRow,
        BCol,
        BTab,
        BTabs,
        BOverlay,
        BButton,
        BCardText,
        BCard,
        BModal,
        BFormDatepicker,
        BFormFile,
        BTable,
        BPagination,
        BSpinner,
        BIconNutFill,
        BCardBody,
    } from 'bootstrap-vue'
    import { register } from 'vue-advanced-chat'
    register()
export default {
    name:'chat',
    components:{
        BCardTitle,
        BCardImg,
        BProgress,
        BFormInput,
        BFormTag,
        BFormTags,
        BFormGroup,
        BForm,
        BRow,
        BCol,
        BTab,
        BTabs,
        BOverlay,
        BButton,
        BCardText,
        BCard,
        BModal,
        BFormDatepicker,
        BFormFile,
        BTable,
        BPagination,
        BSpinner,
        BIconNutFill,
        BCardBody,
    },
    data() {
      return {
        currentUserId: '1',
        rooms: [ {'roomName':"dddd",'roomId':'1','unreadCount':2},{'roomName':"swed",'roomId':'2','unreadCount':1   }],
        messages: [{'_id':1,'senderId':100,'indexId':2,'content':'scds dksjadf lkadfjdkla sds','username':'saeed'}],
        roomActions: [
          { name: 'inviteUser', title: 'Invite User' },
          { name: 'removeUser', title: 'Remove User' },
          { name: 'deleteRoom', title: 'Delete Room' }
        ]
      }
    }
}
</script>
