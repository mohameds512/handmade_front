
import Resource from "../resource";
import request from '../../utils/request'
class EngineType extends Resource {
    constructor() {
        super('engine_type');
    }
    list() {
     
        return request({
            url: `/engine_type`,
            method: 'post',
          })
    }


    


}

export {EngineType as default};
