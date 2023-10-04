// import Resource from '../../../api/resource';
// import request from '../../../utils/request';

import Resource from "../resource";
import request from '../../utils/request'
class Delay_Codes extends Resource {
    constructor() {
        super('delay_codes');
    }
    list() {
     
        return request({
            url: `/delay_codes`,
            method: 'post',
          })
    }


    


}

export {Delay_Codes as default};
