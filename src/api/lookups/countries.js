// import Resource from '../../../api/resource';
// import request from '../../../utils/request';

import Resource from "../resource";
import request from '../../utils/request'
class Countries extends Resource {
    constructor() {
        super('countries');
    }
    list() {
     
        return request({
            url: `/countries`,
            method: 'post',
          })
    }


    


}

export {Countries as default};
