
import Resource from "../resource";
import request from '../../utils/request'
class ManufacturerTypes extends Resource {
    constructor() {
        super('manufacturer_types');
    }
    list() {
     
        return request({
            url: `manufacturer_types`,
            method: 'post',
          })
    }


    


}

export {ManufacturerTypes as default};
