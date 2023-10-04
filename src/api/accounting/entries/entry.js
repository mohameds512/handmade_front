import Resource from '../../../api/resource';
import request from '../../../utils/request';

class Entry extends Resource {
    constructor() {
        super('entries');
    }

    index() {
        return request({
            url: `/entries`,
            method: 'get',
        })
    }

    createEntry() {
        return request({
            url: `/entries/create`,
            method: 'get',
        })
    }
    
    saveEntry(payload) {
            return request({
                url: `/entries/store`,
                method: 'put',
                data: payload,
            })
    }

}

export {Entry as default};
