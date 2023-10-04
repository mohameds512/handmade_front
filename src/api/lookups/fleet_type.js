// import Resource from '../../../api/resource';
// import request from '../../../utils/request';

import Resource from "../resource";
import request from '../../utils/request'
class Fleet_Type extends Resource {
    constructor() {
        super('fleet_type');
    }
    list() {
     
        return request({
            url: `/fleet_type`,
            method: 'post',
          })
    }


    


}

export {Fleet_Type as default};
