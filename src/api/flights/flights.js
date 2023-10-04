// import Resource from '../../../api/resource';
// import request from '../../../utils/request';

import Resource from "../resource";
import request from '../../utils/request'
class Flights extends Resource {
    constructor() {
        super('flights');
    }
    list() {
     
        return request({
            url: `flights`,
            method: 'post',
          })
    }


    


}

export {Flights as default};