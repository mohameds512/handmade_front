
import Resource from "../resource";
import request from '../../utils/request'
class EnginePhysicalClass extends Resource {
    constructor() {
        super('engine_physical_class');
    }
    list() {
     
        return request({
            url: `engine_physical_class`,
            method: 'post',
          })
    }


    


}

export {EnginePhysicalClass as default};
