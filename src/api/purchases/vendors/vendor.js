import Resource from "@/api/resource";
import request from "@/utils/request";

class Vendor extends Resource {
    constructor() {
        super('vendors');
    }

    create() {
        return request({
          url: `/vendors/create`,
          method: "get",
        });
      }

    getStates(payload) {
        return request({
          url: `/vendors/get-states`,
          method: 'post',
          data: payload,
        });
      }

      saveVendor(id,payload) {
        if (id) {
            return request({
                url: `/vendors/${id}`,
                method: 'put',
                data: payload,
            })
        }else{
            return request({
                url: `/vendors`,
                method: 'put',
                data: payload,
            })
        }
    }

}

export {Vendor as default};
