// import Resource from '../../../api/resource';
// import request from '../../../utils/request';

import Resource from "../resource";
import request from "../../utils/request";
class BBX extends Resource {
    constructor() {
    super('bbx');
}

sendInvitation(payload) {
    
    return request({
        url: `/invite`,
        method: "post",
        data: payload
    });
}

check_invitation_token(payload) {
    return request({
        url: `/reg`,
        method: "post",
        data: payload
    });
}

invRegister(payload) {
    return request({
        url: `/register`,
        method: "post",
        data: payload
    });
}
notifications(payload) {
    return request({
        url: `admin/notification/adminGetNotif`,
        method: "post",
        data: payload
    });
}
markNotAsReaded(payload) {
    return request({
        url: `/notifications/read`,
        method: "post",
        data: payload
    });
}


}

export { BBX as default };
