import Resource from "@/api/resource";
import request from "@/utils/request";

class Chat extends Resource {
    constructor() {
        super('chats');
    } 

    listRooms() { 
        return request({
            url: `/admin/conversation/adminListConversation`,
            method: 'post',
        })
    }
    GetChat(payload) { 
        return request({
            url: `/admin/chat/ListChats`,
            method: 'post',
            data:payload,
        })
    }
    sendMessage(payload) { 
        return request({
            url: `/admin/chat/sendMessage`,
            method: 'post',
            data:payload,
        })
    }

}

export {Chat as default};
