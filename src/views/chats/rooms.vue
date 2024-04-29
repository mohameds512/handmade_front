<template>
    <div class="bg-white m-1 p-2">
      <div class="all_chat d-flex justify-content-center">
        <div class="room border p-1">
          <div class="d-flex">
            <b-form-input v-model="search" placeholder="Search" class="mr-2"></b-form-input>
            <b-button variant="primary" >+</b-button>
          </div>
          
          <div class="list-rooms pt-2" >
            <div v-for="(room,index) in $store.state.chats.rooms" :key="index">
              <div class="room-content p-2 " @click="getChat(room)" >
                {{ room.roomName }}
              </div>
            </div>
          </div>
        </div>

        <div class="chat border m-1">

          <div class="border p-1 d-flex">
            <b-avatar size="40" :src="user_photo(authUser().id)" variant="light-primary" >
              <feather-icon v-if="!authUser().first_name" icon="UserIcon" size="22" />
            </b-avatar>
            <h4 class="pt-1 pl-1"> {{ currentRoom }}</h4> 
          </div>

          <div class="chat-content p-1" id="chatContent">
            <div dir="ltr">
              
              <div v-if="$store.state.chats.chatLoaded">
                <div v-for="(chat,index) in $store.state.chats.chat" :key="index" :dir="getMessageDirection(chat.sender_id)">
                  <div class="msgContainer" >
                    <div :class="getMessageStyle(chat.sender_id)" >
                      {{ chat.message }} 
                    </div>
                  </div>
                </div>
              </div>
              <div  v-else class="text-center">
                <b-spinner variant="success" label="Spinning"></b-spinner>
              </div>
            
            </div>
            
            
          </div>
          <div class="input_data ">
            <div class="d-flex pr-2 pl-2">
              <b-form-input v-model="textMessage" spellcheck="false" placeholder="Search" class="mr-2"></b-form-input>
              <feather-icon size="22" @click="sendMessage()" icon="SendIcon" class="clsbtn" />
            </div>
          </div>
        </div>
      </div>
        <!-- $store.state.chats.rooms -->
        
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
        BAvatar,
    } from 'bootstrap-vue'
    import { register } from 'vue-advanced-chat'


export default {
    name:'chat',
    components:{
        BAvatar,
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
        currentUserId: this.authUser().id,
        textMessage:null,
        search:null,
        conver_id:null,
        receiver_id:null,
        currentRoom:null,
      }
    },
    mounted(){
      this.listRooms();
    },
    methods:{
      scrollToBottom() {
        var chatContent = document.getElementById('chatContent');
        chatContent.scrollTop = chatContent.scrollHeight;
        
      },
      listRooms(){
        this.$store.dispatch("chats/listRooms")
          .then((res)=>{
          }).catch((err)=>{
            console.log(err);
          })
      },
      getChat(room){
        this.currentRoom = room.roomName 
        this.conver_id = room.roomId;
        this.$store.dispatch("chats/getChat",{
          query:{'conver_id':room.roomId}
        })
          .then((res)=>{
            this.getReceiver_id();
            this.scrollToBottom();

          }).catch((err)=>{
            console.log(err);
          })
          
      },
      getReceiver_id(){
        let first = this.$store.state.chats.chat[0];
        if (this.authUser().id == first.sender_id) {
          this.receiver_id = first.receiver_id
        }else{
          this.receiver_id = first.sender_id
        }
        console.log('this.receiver_id',this.receiver_id);
      },
      sendMessage(){
        this.$store.state.chats.chat.push({'message':this.textMessage,'sender_id':this.authUser().id});
        let newMessage = this.textMessage;
        this.textMessage = null;
        this.$store.dispatch("chats/sendMessage",{
          query:{
            'conver_id':this.conver_id,
            'message':newMessage,
            'sender_id':this.authUser().id,
            'receiver_id':this.receiver_id,
          }
        })
          .then((res)=>{
          }).catch((err)=>{
            console.log(err);
          })
      },
      getMessageDirection(senderId) {
        
        return this.authUser().id === senderId ? 'rtl' : 'ltr';
      },
      getMessageStyle(senderId) {
        console.log();
        return this.authUser().id === senderId ? 'message_receiver' : 'message_sender';
      }
    }
}
</script>
<style scoped>

  .all_chat{
    height: 550px;
  }
  .room{
    width: 30%;
  }
  .list-rooms{
    height: 500px;
    overflow-x: auto; 
  }
  .room-content{
    margin-top: 10px;
    background-color: rgb(222, 224, 244);
    border-radius: 5px;
    cursor: pointer;
  }
  .msgContainer{
    max-width: 350px;
  }
  .chat-content{
    height: 400px;
    overflow-x: auto; 
  }
  .message_sender{
    margin-top: 5px;
    padding: 5px;
    font-size: 16px;
    color: #000;
    border-radius: 3px;
    max-width: fit-content;
    background-color: rgb(191, 195, 240);
    
  }
  .message_receiver{
    margin-top: 5px;
    padding: 5px;
    font-size: 16px;
    color: #000;
    border-radius: 3px;
    max-width: fit-content;
    background-color: rgb(212, 213, 221);
    
  }
  .clsbtn{
    cursor: pointer;
  }
  .chat{
    width: 70%;
  }
</style>