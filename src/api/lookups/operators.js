// import Resource from '../../../api/resource';
// import request from '../../../utils/request';

import Resource from "../resource";
import request from '../../utils/request'
class Operators extends Resource {
    constructor() {
        super('operators');
    }
    list() {
     
        return request({
            url: `/operators`,
            method: 'post',
          })
    }


    


}

export {Operators as default};
