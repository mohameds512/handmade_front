// import Resource from '../../../api/resource';
// import request from '../../../utils/request';

import Resource from "../resource";
import request from '../../utils/request'
class Manufacturers extends Resource {
    constructor() {
        super('manufacturers');
    }
    list() {
     
        return request({
            url: `/manufacturers`,
            method: 'post',
          })
    }


    


}

export {Manufacturers as default};
