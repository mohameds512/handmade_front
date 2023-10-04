import Resource from '../../resource';
import request from "../../../utils/request";

class Settings extends Resource {
    constructor() {
        super('settings');
    }

    
    storeData(id,payload) {
        if (id) {
            return request({
                url: `/admin/vendor/storeData/${id}`,
                method: 'post',
                data: payload,
            })
        }else{
            return request({
                url: `/admin/vendor/storeData`,
                method: 'post',
                data: payload,
            })
        }
        
    }

    getSettings() {
        return request({
            url: `/admin/vendor/getData`,
            method: 'post',
        })
    }
    get(id) {
        return request({
            url: `/settings${id?'/'+id:''}`,
            method: 'get',
        })
    }
}

export {Settings as default};
