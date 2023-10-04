
import Resource from "../resource";
import request from '../../utils/request'
class AircraftStatus extends Resource {
    constructor() {
        super('aircraft_status');
    }
    list() {
     
        return request({
            url: `aircraft_status`,
            method: 'post',
          })
    }


    


}

export {AircraftStatus as default};
