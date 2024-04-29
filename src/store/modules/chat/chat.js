
import Chat from "@/api/chats/chat";

const chats = new Chat();
const chatsModule = {
    namespaced: true,
    state: {
        rooms: null,
        roomsLoaded : true,
        chat:null,
        chatLoaded:true,
    },
    getters: {
        rooms(state) {
            return state.rooms;
        },
        roomsLoaded(){
            return  state.roomsLoaded;
        },
        chat(state){
            return state.chat;
        },
        chatLoaded(){
            return  state.chatLoaded;
        }
    },
    mutations: {
        
        SET_ROOMS: (state, rooms) => {
            state.rooms = rooms;
        },
        SET_ROOMS_LOADED(state,roomsLoaded){
            state.roomsLoaded = roomsLoaded;
        },
        SET_CHAT(state,chat){
            state.chat = chat;
        },
        SET_CHAT_LOADED(state,chatLoaded){
            state.chatLoaded = chatLoaded;
        }
    },
    actions:{
        listRooms({commit}, id) {
            return new Promise((resolve, reject) => {
                commit('SET_ROOMS_LOADED', false);
                chats.listRooms(id)
                    .then(response => {
                        
                        commit('SET_ROOMS', response.conversations);
                        commit('SET_ROOMS_LOADED', true);
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        getChat({commit}, payload) {
            return new Promise((resolve, reject) => {
                commit('SET_CHAT_LOADED', false);
                chats.GetChat(payload.query)
                    .then(response => {
                        commit('SET_CHAT', response.chatList);
                        commit('SET_CHAT_LOADED', true);
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        sendMessage({commit}, payload) {
            return new Promise((resolve, reject) => {
                
                chats.sendMessage(payload.query)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
    }
}
export default chatsModule